<div align="center">

# 🎓 Education Management System

### A multi-role academic platform with course management, blogs, and enrollment — built with the MEAN stack.

[![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📌 Overview

The **Education Management System** is a full-stack MEAN application supporting three roles — Admin, Instructor, and Student. It handles course enrollment, blog publishing, user reviews, contact messaging, and profile management — all powered by a RESTful Express API with JWT-based authentication and a clean Angular 21 frontend.

---

## ✨ Features

### 👨‍🎓 Student (Client)
- Register, log in, and manage profile
- Browse and enroll in courses
- View enrolled courses and track progress
- Submit reviews and read the blog
- Contact support via the contact form

### 👨‍🏫 Instructor
- Manage and publish their own courses
- View enrolled students per course

### 🛠️ Admin
- Full user management (students, teachers, admins)
- Course, blog, and review moderation
- View and respond to contact messages
- Admin dashboard with system overview

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21, TypeScript, Bootstrap 5 |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (bcryptjs), Auth Interceptor |
| Validation | Zod |
| Security | Helmet, CORS |
| Dev Tools | Nodemon, Morgan |

---

## 📁 Folder Structure

```
education-management-system/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js                  # MongoDB connection
│       │   └── env.js                 # Environment config
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── courseController.js
│       │   ├── blogController.js
│       │   ├── reviewController.js
│       │   ├── contactController.js
│       │   └── userAdminController.js
│       ├── middleware/
│       │   ├── auth.js                # JWT middleware
│       │   ├── asyncHandler.js
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Course.js
│       │   ├── Enrollment.js
│       │   ├── Blog.js
│       │   ├── Review.js
│       │   └── ContactMessage.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── courseRoutes.js
│       │   ├── blogRoutes.js
│       │   ├── reviewRoutes.js
│       │   ├── contactRoutes.js
│       │   └── adminUserRoutes.js
│       ├── scripts/
│       │   └── seedAdmin.js           # Seeds default admin
│       ├── utils/
│       │   ├── jwt.js
│       │   └── httpError.js
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/app/
│       ├── features/
│       │   ├── admin/                 # Admin components
│       │   ├── instructor/            # Instructor components
│       │   └── client/                # Student-facing components
│       ├── shared/components/         # Navbar, Logo
│       └── core/
│           ├── services/              # auth, course, blog, student, review, contact
│           ├── guards/                # auth.guard, role.guard
│           └── interceptors/          # auth.interceptor
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017`
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`

### 1. Clone the Repository

```bash
git clone https://github.com/Mayank-Kaneriya1442/education-management-system.git
cd education-management-system
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env       # Configure your environment variables
npm install
npm run seed:admin         # Seeds default admin account
npm run dev                # Starts on http://localhost:5000
```

**Environment Variables (`.env`)**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ems_db
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start                  # Starts on http://localhost:4200
```

Open your browser at **http://localhost:4200**

---

## 🔑 Default Admin Credentials

> ⚠️ Change these credentials immediately after first login in production.

| Field | Value |
|-------|-------|
| Email | `admin@ems.com` |
| Password | `Admin@123` |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/courses` | List all courses |
| POST | `/api/courses` | Create course (Instructor/Admin) |
| GET | `/api/blogs` | List all blogs |
| POST | `/api/blogs` | Create blog (Admin) |
| GET | `/api/reviews` | List reviews |
| POST | `/api/reviews` | Submit review (Student) |
| POST | `/api/contact` | Send contact message |
| GET | `/api/admin/users` | Manage all users (Admin) |

---

## 👨‍💻 Author

**Mayank Kaneriya**
- 🌐 [LinkedIn](https://www.linkedin.com/in/mayank-kaneriya-011729363/)
- 📧 mayankkaneriya15@gmail.com
- 💻 [GitHub](https://github.com/Mayank-Kaneriya1442)

---

<div align="center">

⭐ If you found this project helpful, please give it a star!

</div>
