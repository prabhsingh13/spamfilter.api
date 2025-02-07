# SpamFilter.api

# 🚀 Instagram Spam Filter API

This project provides an **API to check Instagram profile details**, including:
- **Public/Private status**
- **Spam Follower Protection status**
- **Flag for Review status**

Deployed on **Vercel** for smooth integration and future updates. 🔥

## 🌟 Features
✅ Check if an Instagram profile is **public** or **private**
✅ Verify if **Spam Follower Protection** is enabled
✅ Fast & reliable API response
✅ **Easy to integrate** with any website

---

## 🚀 Live Demo
[🔗 Click here to test](https://spamfilter-api.vercel.app)

---

## 🛠️ Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/spamfilter-api.git
cd spamfilter-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Add Environment Variables
Create a `.env` file in the root directory and add:
```env
INSTAGRAM_API_KEY=your_api_key_here
```

### 4️⃣ Run Locally
```bash
npm run dev
```

---

## 📌 API Usage
### **Endpoint:** `/api/checkProfile?username={username}`

#### ✅ **Example Request:**
```bash
GET https://spamfilter-api.vercel.app/api/checkProfile?username=instagram
```

#### 📜 **Example Response:**
```json
{
  "success": true,
  "data": {
    "is_private": false,
    "spam_follower_setting_enabled": false
  }
}
```

---

## 📂 Project Structure
```
📦 spamfilter-api
 ┣ 📂 api
 ┃ ┗ 📜 checkProfile.js   # API route to check profile details
 ┣ 📜 .env.example        # Environment variables example
 ┣ 📜 package.json        # Dependencies & scripts
 ┣ 📜 vercel.json         # Vercel deployment config
 ┗ 📜 README.md           # Project documentation
```

---

## 🚀 Deploy on Vercel
1. **Push your code to GitHub**
2. **Go to Vercel Dashboard**
3. **Connect the GitHub Repository**
4. **Set environment variables** (same as `.env` file)
5. **Deploy & Get Live URL** 🎉

---

## 📧 Contact
For queries or support, feel free to reach out:
📩 Email: prabhjeetsingh1013@gmail.com  
📷 Instagram: [@prabshingh.13](https://instagram.com/prabhsingh.13)

---

⭐ **If you find this project useful, don't forget to give it a star on GitHub!** ⭐
>>>>>>> 4350741 (First Commit)
