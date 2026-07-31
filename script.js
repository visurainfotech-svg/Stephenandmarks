// ===============================
// Navigation Scroll Effect
// ===============================
const nav = document.getElementById("siteNav");

window.addEventListener("scroll", () => {
  if (!nav) return;

  const currentScroll = window.scrollY;

  nav.classList.toggle("scrolled", currentScroll > 40);
});

// ===============================
// Mobile Menu
// ===============================
const burger = document.getElementById("burgerBtn");
const links = document.getElementById("mainLinks");

if (burger && links) {
  burger.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// ===============================
// Active Navigation Highlight (Scroll Indicator)
// ===============================
const navLinks = document.querySelectorAll(".main-links a");
const sectionHeads = document.querySelectorAll(".section-head");
const scrollSpySections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav() {
  const navHeight = nav ? nav.offsetHeight : 0;
  const scrollPoint = window.scrollY + navHeight + window.innerHeight * 0.28;
  let currentSection = scrollSpySections[0];

  const sortedSections = [...scrollSpySections].sort((a, b) => a.offsetTop - b.offsetTop);

  sortedSections.forEach((section) => {
    if (section.offsetTop <= scrollPoint) {
      currentSection = section;
    }
  });

  const currentId = currentSection ? currentSection.id : "";

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });

  sectionHeads.forEach((head) => head.classList.remove("active"));

  if (currentSection) {
    const activeSectionHead = currentSection.querySelector(".section-head");
    if (activeSectionHead) {
      activeSectionHead.classList.add("active");
    }
  }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

// ===============================
// Scroll Reveal Animation
// ===============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===============================
// Gallery Filter
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const motionShowcase = document.querySelector(".motion-showcase");
const serviceCards = document.querySelectorAll("[data-service-filter]");

function applyGalleryFilter(filter) {
  galleryItems.forEach((item) => {
    const category = item.dataset.cat;

    if (filter === "all" || category === filter) {
      item.classList.remove("hidden-item");
    } else {
      item.classList.add("hidden-item");
    }
  });

  if (motionShowcase) {
    const showMotion = filter === "all" || filter === "motion";
    motionShowcase.classList.toggle("hidden-item", !showMotion);
  }
}

function setActiveFilter(filter) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  applyGalleryFilter(filter);
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter);
    });
  });

  const activeFilter = document.querySelector(".filter-btn.active") || filterButtons[0];
  applyGalleryFilter(activeFilter.dataset.filter);
}

serviceCards.forEach((card) => {
  function openMatchingSamples() {
    const filter = card.dataset.serviceFilter;
    const workSection = document.getElementById("work");

    if (!filter || !workSection) return;

    setActiveFilter(filter);
    smoothScrollTo(workSection, 900);
  }

  card.addEventListener("click", openMatchingSamples);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMatchingSamples();
    }
  });
});

// ===============================
// Before / After Staging Slider
// ===============================
const beforeAfterSliders = document.querySelectorAll("[data-before-after]");

beforeAfterSliders.forEach((slider) => {
  const handle = slider.querySelector(".compare-handle");
  let isDragging = false;

  function setPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(92, Math.max(8, percent));

    slider.style.setProperty("--position", `${clamped}%`);
  }

  function startDrag(e) {
    isDragging = true;
    slider.classList.add("is-dragging");
    setPosition(e.clientX);
  }

  function stopDrag() {
    isDragging = false;
    slider.classList.remove("is-dragging");
  }

  slider.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    startDrag(e);
    slider.setPointerCapture(e.pointerId);
  });

  slider.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  slider.addEventListener("pointerup", stopDrag);
  slider.addEventListener("pointercancel", stopDrag);

  if (handle) {
    handle.addEventListener("click", (e) => e.stopPropagation());
    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(slider.style.getPropertyValue("--position")) || 50;
      const step = e.shiftKey ? 10 : 4;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        slider.style.setProperty("--position", `${Math.max(8, current - step)}%`);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        slider.style.setProperty("--position", `${Math.min(92, current + step)}%`);
      }
    });
  }
});

// ===============================
// Lightbox
// ===============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach((item) => {
  if (item.classList.contains("comparison-item")) return;

  const video = item.querySelector("video");
  const img = item.querySelector("img");

  if (!img && !video) return;

  item.addEventListener("click", () => {
    if (!lightbox) return;

    const title = item.querySelector(".g-title");

    lightboxCaption.textContent = title ? title.textContent : "";

    if (video && lightboxVideo) {
      const source = video.querySelector("source");
      lightbox.classList.add("video-open");
      lightboxVideo.src = source ? source.src : video.currentSrc;
      lightboxVideo.currentTime = 0;
      lightboxVideo.muted = false;
      lightboxVideo.play().catch(() => {});
    } else if (img) {
      lightbox.classList.remove("video-open");
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
      }
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
  }
  lightbox.classList.remove("open");
  lightbox.classList.remove("video-open");
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// ===============================
// Gallery Video Auto-play & Mute Control
// ===============================
const videoElements = document.querySelectorAll(".gallery-video");
const videoMuteButtons = document.querySelectorAll(".video-mute-btn");

videoElements.forEach((video) => {
  // Ensure autoplay and muted are set
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
});

videoMuteButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering video click
    const video = btn.closest(".gallery-item").querySelector(".gallery-video");
    if (video) {
      if (video.muted) {
        // Mute all other videos first
        videoElements.forEach((v) => {
          if (v !== video) {
            v.muted = true;
            updateMuteButtonState(v);
          }
        });
        // Then unmute this one
        video.muted = false;
      } else {
        // Just mute this one
        video.muted = true;
      }
      updateMuteButtonState(video);
    }
  });
});

function updateMuteButtonState(video) {
  const btn = video.closest(".gallery-item").querySelector(".video-mute-btn");
  if (btn) {
    if (video.muted) {
      btn.classList.remove("unmuted");
      btn.setAttribute("aria-label", "Unmute");
    } else {
      btn.classList.add("unmuted");
      btn.setAttribute("aria-label", "Mute");
    }
  }
}

// ===============================
// Image-to-Video Showcase (motion preview)
// ===============================
const motionThumbs = document.querySelectorAll(".motion-thumbs .thumb");
const motionOutputVideo = document.getElementById("motionOutputVideo");

function setMotionPreview(alt, videoSrc) {
  if (!videoSrc || !motionOutputVideo) return;

  const videoSource = motionOutputVideo.querySelector("source");

  motionOutputVideo.pause();
  motionOutputVideo.setAttribute("aria-label", `${alt || "Image to video"} output`);

  if (videoSource) {
    videoSource.src = videoSrc;
  } else {
    motionOutputVideo.src = videoSrc;
  }

  motionOutputVideo.load();
  motionOutputVideo.play().catch(() => {});
}

motionThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    motionThumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
    setMotionPreview(thumb.alt, thumb.dataset.outputVideo);
  });
});

const activeMotionThumb = document.querySelector(".motion-thumbs .thumb.active") || motionThumbs[0];

if (activeMotionThumb) {
  setMotionPreview(activeMotionThumb.alt, activeMotionThumb.dataset.outputVideo);
}

// ===============================
// Contact Form
// ===============================
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-btn");
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formNote) {
      formNote.classList.add("show");
      formNote.textContent = "Sending your enquiry...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Form submission failed");
      }

      if (formNote) {
        formNote.textContent = "Thanks. Your enquiry has been sent, and we'll reply soon.";
      }

      contactForm.reset();
    } catch (error) {
      if (formNote) {
        formNote.textContent = `${error.message} Please email stemarks.sm@gmail.com directly.`;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
    }
  });
}
// ===============================
// Smooth Scrolling (Lenis) - Disabled for troubleshooting
// ===============================
/*
const lenis = typeof Lenis !== "undefined"
  ? new Lenis({
      duration: 1.8,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      lerp: 0.08,
    })
  : null;

if (lenis) {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
*/

// Custom smooth scroll function (Apple-style)
function smoothScrollTo(target, duration = 900) {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let start = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    // Smooth scroll with Apple-style easing
    smoothScrollTo(target, 900);
  });
});
