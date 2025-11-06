
<!-- HEADER -->
<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn Logo" width="55"/>

# 💼 LinkedIn Clone — MERN Stack (Full-Stack Social Platform)

A **LinkedIn-inspired professional networking platform** built using the **MERN Stack** — featuring secure authentication, profile management, media uploads, post creation, and more.  
This project mimics the core functionality and clean UI of LinkedIn while leveraging modern web technologies and a scalable architecture.

---

### 🌐 Live Demo

🔹 **Frontend (Vercel):**  
👉 [https://linked-in-sepia-iota.vercel.app/login](https://linked-in-sepia-iota.vercel.app/login)

🔹 **Backend (Render):**  
👉 [https://linkedin-ctfe.onrender.com](https://linkedin-ctfe.onrender.com)

---

![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue?logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white)

</div>

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js** (with React Router DOM)  
- **Axios** for API communication  
- **Context API** for authentication state  
- **Custom CSS** (responsive LinkedIn-style design)  
- **Framer Motion** (for subtle animations)  
- **React Icons** for icons and UI polish  

### 🧩 Backend
- **Node.js & Express.js**  
- **MongoDB Atlas (Cloud Database)**  
- **Mongoose ODM**  
- **JWT Authentication**  
- **Multer + Cloudinary** for image and video uploads  
- **CORS** for secure cross-origin access  
- **dotenv** for environment management  

---

## ✨ Features Overview

### 👤 Authentication
- Secure registration and login using JWT  
- Persistent sessions via `localStorage`  

### 🧑‍💻 User Profiles
- Upload profile and banner images via Cloudinary  
- Edit personal details: name, headline, and about section  
- Display user-specific posts  

### 📰 Feed System
- Create posts with text, images, or videos  
- Like and comment functionalities  
- Auto-refresh feed after new post creation  

### 🔔 Navigation
- Clean, LinkedIn-style navbar with dropdown menu  
- Links to Feed, Jobs, Network, Notifications, Settings, and Help  

### 📱 Responsive UI
- Mobile-first responsive layout  
- Centered post modals and editable forms  
- Maintains authentic LinkedIn-style layout  

---

## 🗂️ Folder Structure

```bash
linkedin-clone/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── README.md
````

---

## 🧩 Environment Variables

### 🔹 Backend `.env`

```bash
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 🔹 Frontend `.env`

```bash
REACT_APP_API_BASE_URL=https://linkedin-ctfe.onrender.com
```

---

## 🛠️ Installation and Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ajaykumarch15/LinkedIn.git
cd LinkedIn
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3️⃣ Start development servers

#### Run backend

```bash
npm start
```

#### Run frontend

```bash
npm start
```

Frontend: [http://localhost:3000](http://localhost:3000)
Backend: [http://localhost:5000](http://localhost:5000)

---

## 🚀 Deployment Guide

### ☁️ Backend Deployment (Render)

1. Go to [Render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Choose the `/backend` directory
5. Configure:

   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
6. Add environment variables from `.env`
7. Deploy 🚀

Backend URL → `https://linkedin-ctfe.onrender.com`

---

### 🌐 Frontend Deployment (Vercel)

1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repo → choose `/frontend` folder
3. Configure:

   * **Build Command:** `npm run build`
   * **Output Directory:** `build`
4. Deploy 🚀

Frontend URL → `https://linked-in-sepia-iota.vercel.app/login`

---

## 🔒 Backend API Endpoints

| Method   | Endpoint             | Description             |
| -------- | -------------------- | ----------------------- |
| `POST`   | `/api/auth/register` | Register new user       |
| `POST`   | `/api/auth/login`    | Login and get JWT token |
| `GET`    | `/api/users/me`      | Fetch user profile      |
| `PUT`    | `/api/users/me`      | Update profile          |
| `POST`   | `/api/users/upload`  | Upload profile/banner   |
| `GET`    | `/api/posts`         | Get all posts           |
| `POST`   | `/api/posts`         | Create post             |
| `POST`   | `/api/posts/upload`  | Upload post image/video |
| `PUT`    | `/api/posts/:id`     | Update post             |
| `DELETE` | `/api/posts/:id`     | Delete post             |

---

## 💾 Database Design

### Collections:

#### 🧑 `users`

* name
* email
* password
* headline
* about
* profileImage
* bannerImage

#### 📰 `posts`

* content
* media
* likes
* comments
* author reference

#### 💬 `comments`

* text
* userId
* postId
* timestamps

---

## 🧠 Future Enhancements

* 🧭 “People You May Know” recommendations
* 💬 Real-time chat (Socket.io)
* 📸 Drag-and-drop post uploads
* 🔔 Notification system
* 🌙 Dark mode

---

## 💡 UI Highlights

* Authentic LinkedIn-inspired UI
* Responsive design for all screens
* Editable profile with live previews
* Post layout identical to real LinkedIn

---

## 👨‍💻 Developer Information

**👨‍💻 Developer:** CHODIPILLI AJAY KUMAR
💼 MERN Stack Developer | Passionate about scalable full-stack solutions

📧 **Email:** [ajaykumarchodipilli15@gmail.com](mailto:ajaykumarchodipilli15@gmail.com)
🐙 **GitHub:** [Ajaykumarch15](https://github.com/Ajaykumarch15/LinkedIn)
🔗 **LinkedIn:** [linkedin.com/in/ajaykumarchodipilli](https://linkedin.com/in/ajaykumarchodipilli)

---

## 🧾 License

This project is licensed under the **MIT License**.
Feel free to fork, modify, and use it in your own projects with attribution.

---

## ⭐ Acknowledgements

* Inspired by [LinkedIn](https://www.linkedin.com)
* Icons by [React Icons](https://react-icons.github.io/react-icons/)
* Cloud storage via [Cloudinary](https://cloudinary.com)
* Deployment by [Render](https://render.com) & [Vercel](https://vercel.com)

---

## 🏁 Conclusion

This project demonstrates a **production-grade full-stack application**
built with **React + Node.js + MongoDB + Cloudinary**, designed for scalability, performance, and a clean UI.
Deployed successfully on **Vercel (frontend)** and **Render (backend)**.

---

<p align="center">
✨ <b>If you liked this project — please star ⭐ the repo and connect on LinkedIn!</b>  
<br/>Made with ❤️ by <b>CHODIPILLI AJAY KUMAR</b>
</p>
