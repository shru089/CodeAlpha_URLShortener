# 🔗 CodeAlpha URL Shortener

A modern URL Shortener built for the **CodeAlpha Backend Development Internship**.  
Backend with **Node.js, Express, MongoDB Atlas (Mongoose)** and a sleek **dark UI frontend** generated using Google Stitch.

---

## 🌟 Features

- Shorten any long URL into a compact short link
- Auto-generated unique short codes using `nanoid`
- MongoDB Atlas to store URL mappings and click counts
- Redirect from short URL → original URL
- Beautiful single-page frontend:
  - Paste long URL, click **Shorten URL**
  - Displays short link with click-to-copy
  - Session-based history of generated links

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, Mongoose
- **Frontend:** HTML, Tailwind CSS (via CDN), vanilla JS
- **Tools:** dotenv, nanoid, Thunder Client / Postman

---

## 📁 Project Structure

```bash
CodeAlpha_URLShortener/
│── models/
│   └── Url.js
│── public/
│   └── index.html
│── server.js
│── package.json
│── .gitignore
│── README.md

- models/Url.js – Mongoose schema for URLs

- public/index.html – Frontend UI

- server.js – Express server + API routes

- .gitignore includes .env and node_modules.

🚀 Running the Project Locally

Clone the repository:

git clone https://github.com/YOUR_USERNAME/CodeAlpha_URLShortener.git
cd CodeAlpha_URLShortener


Install dependencies:

npm install


Create .env with your MONGO_URI and other variables.

Start the server:

npm start


Open the app in your browser:

http://localhost:5000/


You should see the URL Shortener UI. Paste a long URL, click Shorten URL, and test the generated short link.


- This project satisfies Task 1: Simple URL Shortener requirements:

- Backend server with Express

- API to create short URLs

- Database mapping short → long URLs

- Redirect route

- Optional frontend implemented