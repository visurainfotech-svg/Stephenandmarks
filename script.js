// WhatsApp number - Update with your actual WhatsApp number
  const whatsappNumber = "18889903421";
  const phoneNumber = "18889903421";
  const emailAddress = "hello@stephenmarks.com";
  
  // Open WhatsApp chat
  function openWhatsApp() {
    window.open(`https://wa.me/${+919632155956}?text=Hello%20Stephen%20%26%20Marks%2C%20I%27m%20interested%20in%20your%20real%20estate%20editing%20services.%20Can%20you%20please%20share%20more%20details%3F`, '_blank');
  }
  
  // Open Email client
  function openEmail() {
    window.location.href = `mailto:${emailAddress}?subject=Inquiry%20About%20Real%20Estate%20Editing%20Services&body=Hello%20Stephen%20%26%20Marks%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.%0A%0AThank%20you.`;
  }
  
  // Make phone call
  function makeCall() {
    window.location.href = `tel:+${phoneNumber}`;
  }
  
  // Get modal element
  const modal = document.getElementById('actionModal');
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
  }
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Show service modal for informational content
  function showServiceModal(action) {
    const contentMap = {
      home: { title: '🏠 Stephen & Marks', message: 'Welcome to your premium real estate editing partner. We deliver stunning visuals that help properties sell faster. Get in touch for a free trial edit!' },
      'real-estate-editing': { title: '🏘️ Real Estate Editing', message: 'Professional enhancements including color correction, HDR blending, exposure balancing, and detail optimization. Starting from $0.50/image. Free test edit available!' },
      'virtual-staging': { title: '🛋️ Virtual Staging', message: 'Transform empty rooms into beautifully furnished spaces. Choose from modern, classic, or luxury styles. 24-hour turnaround available. Starting at $12/room.' },
      'floor-plans': { title: '📐 Floor Plans', message: 'Accurate 2D and immersive 3D floor plans with precise measurements, smart furniture layouts, and interactive walkthroughs — ideal for listings and brochures.' },
      portfolio: { title: '🖼️ Portfolio', message: 'View our best work including before/after edits, virtual staging examples, and floor plan samples. Contact us to request our full portfolio.' },
      pricing: { title: '💰 Pricing', message: 'Competitive rates (Starting From): Image Enhancement $0.50, Virtual Staging ($10/room), 2D Floor Plans ($18) 2D Site Plans ($18), Video Editing (Reel - $20) (min Video - $25). Volume discounts available for 50+ images!' },
      contact: { title: '📞 Contact Us', message: 'Email: hello@stephenmarks.com | Mobile / WhatsApp: +91 96321 55956 | Office Hours: 24/7 Support.' },
      quote: { title: '📸 Get a Quote', message: 'Share your requirements via email at hello@stephenmarks.com, WhatsApp, or call +91 96321 55956. Free test edit available for first-time clients!' },
      'service-enhancement': { title: '✨ Image Enhancement', message: 'Professional color correction, exposure balancing, noise reduction, and detail sharpening. Perfect for real estate listings. Get a free sample edit!' },
      'service-hdr': { title: '🌅 HDR Blending', message: 'Flawless exposure fusion that eliminates harsh shadows and blown highlights. Creates natural, balanced interior and exterior shots. Starting at $1.25/image.' },
      'service-twilight': { title: '🌙 Twilight Editing', message: 'Transform day shots into dramatic dusk scenes with warm glowing lights and stunning skies. Increases property appeal dramatically. From $2.50/image.' },
      'service-video': { title: '🎬 Video Editing', message: 'Professional real estate video editing including transitions, color grading, music sync, and walkthrough enhancements. Starting at $45/video.' },
      'service-image-to-video': { title: '🎥 Image to Video', message: 'Transform your property photos into engaging video slideshows with motion effects, music, and captions. Perfect for Instagram, YouTube, and listings.' },
      'service-2d-floor': { title: '📏 2D Floor Plans', message: 'Accurate, clean vector 2D floor plans with measurements, room labels, and professional styling. Perfect for MLS listings and brochures. Starting at $15.' },
      'service-3d-floor': { title: '🏢 3D Floor Plans', message: 'Immersive 3D floor plans with realistic furniture, textures, lighting, and interactive walkthrough capabilities. Starting at $35.' },
      'service-staging': { title: '🪑 Virtual Staging', message: 'Modern, lifelike furniture and decor placement. Choose from multiple design styles. Complete empty room transformations starting at $12/room.' },
      'service-renovation': { title: '🔨 Virtual Renovation', message: 'Visualize property upgrades including new flooring, kitchen/bathroom renovations, wall removals, and exterior makeovers. Starting at $25/room.' },
      'service-sky': { title: '☁️ Sky Replacement', message: 'Replace dull, overcast skies with stunning golden hour, blue hour, sunset, or dramatic cloudscapes. Instant property transformation. Starting at $1.50/image.' }
    };
    
    const content = contentMap[action] || { 
      title: '✨ Premium Service', 
      message: 'Our expert team is ready to assist with this service. Contact us via WhatsApp, email at hello@stephenmarks.com, or call +1 (888) 990-3421.' 
    };
    
    // Update modal content
    document.getElementById('modalTitle').textContent = content.title;
    document.getElementById('modalMessage').textContent = content.message;
    
    // Show modal
    modal.classList.add('active');
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}