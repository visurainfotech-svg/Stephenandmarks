import os
import smtplib
from email.message import EmailMessage
from email.utils import formataddr

from flask import Flask, jsonify, request, send_from_directory


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TO_EMAIL = "stemarks.sm@gmail.com"


def load_env_file():
    env_path = os.path.join(BASE_DIR, ".env")
    if not os.path.exists(env_path):
        return

    with open(env_path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_env_file()

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/api/contact", methods=["POST", "OPTIONS"])
def contact():
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(silent=True) or request.form

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    service = (data.get("service") or "Not specified").strip()
    message = (data.get("message") or "").strip()

    if not name or not email:
        return jsonify({"message": "Name and email are required."}), 400

    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    smtp_from_name = os.environ.get("SMTP_FROM_NAME", "Stephen Marks Website")

    if not smtp_user or not smtp_password:
        return jsonify({"message": "Email sending is not configured."}), 500

    email_body = f"""
New enquiry from Stephen & Marks website

Name: {name}
Email: {email}
Service needed: {service}

Message:
{message or "No message added."}
""".strip()

    mail = EmailMessage()
    mail["Subject"] = "New enquiry from Stephen & Marks website"
    mail["From"] = formataddr((smtp_from_name, smtp_user))
    mail["To"] = TO_EMAIL
    mail["Reply-To"] = email
    mail.set_content(email_body)

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(mail)
    except Exception:
        return jsonify({"message": "Message could not be sent."}), 500

    return jsonify({"message": "Enquiry sent successfully."})


if __name__ == "__main__":
    import os

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )
