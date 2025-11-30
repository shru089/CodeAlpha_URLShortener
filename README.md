# 🚀 CodeAlpha URL Shortener  
A modern, full-stack URL Shortener built as part of the **CodeAlpha Backend Development Internship**.  
Built with **Node.js**, **Express**, **MongoDB Atlas**, and a beautiful **Stitch-designed frontend**.

Live Demo (optional after deployment):  
👉 *Coming Soon…*

---

## 🌟 Features

### ✅ Core Backend Features
- Generate short URLs from long links  
- Redirect to original URLs instantly  
- MongoDB Atlas for cloud storage  
- Auto-generated unique short codes  
- Full REST API support  

### 🎨 Frontend Features
- Glassmorphism UI designed with Google Stitch  
- Clean dark theme with neon accents  
- Real-time short URL generation  
- Copy-to-clipboard functionality  
- History of shortened URLs (session-based)  

### ⚙ Tech Stack
- **Node.js + Express** (Backend)
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM)
- **TailwindCSS** (Frontend styling)
- **Stitch (Google)** for UI generation
- **Thunder Client/Postman** for testing

---

## 📁 Folder Structure

CodeAlpha_URLShortener/
│── models/
│ └── Url.js
│── public/
│ └── index.html
│── server.js
│── package.json
│── .env
│── README.md


---

## 🧩 API Endpoints

### 👉 **POST /shorten**
Create a short URL.

**Request Body (JSON):**
```json
{
  "longUrl": "https://example.com/very/long/url"
}


Response:

{
  "shortUrl": "http://localhost:5000/abc123",
  "longUrl": "https://example.com/very/long/url"
}

👉 GET /:shortCode

Redirect to the original long URL.

Example:

GET /abc123


Redirects to:

https://example.com/very/long/url

🛠 Installation & Setup (Local)
1. Clone the repo
git clone https://github.com/YOUR-USERNAME/CodeAlpha_URLShortener.git
cd CodeAlpha_URLShortener

2. Install dependencies
npm install

3. Create .env file
MONGO_URI=your-mongodb-atlas-uri
BASE_URL=http://localhost:5000
PORT=5000

4. Start the server
npm start


Server runs at:

http://localhost:5000


Frontend is served automatically from /public.