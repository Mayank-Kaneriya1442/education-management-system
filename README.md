<div align="center">

# 🎓 Education Management System

### A comprehensive academic management platform built with the MEAN stack.

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

---

## 📌 Overview

The **Education Management System** is a MEAN stack web application designed to simplify academic administration. It provides role-based dashboards for admins, teachers, and students — covering student records, course management, attendance, and more through a clean Angular UI backed by a RESTful Express API.

---

## ✨ Features

- 🔐 **Role-based Authentication** — Admin, Teacher, and Student roles
- 👩‍🎓 **Student Management** — Enroll, update, and track student records
- 📚 **Course Management** — Create and manage courses and assignments
- 📋 **Attendance Tracking** — Mark and view attendance records
- 📊 **Result Management** — Enter grades and view academic performance
- 🖥️ **Responsive Angular UI** — Clean, Bootstrap-powered interface

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular (TypeScript), Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| Architecture | REST API |

---

## 📁 Folder Structure

```
education-management-system/
├── backend/                   # Node.js + Express + Mongoose REST API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   └── server.js
├── frontend/                  # Angular (TypeScript) + Bootstrap UI
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   └── environments/
│   └── angular.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
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
cp .env.example .env       # Add your environment variables
npm install
npm run seed:admin         # Seeds the default admin account
npm run dev                # Starts on http://localhost:5000
```

**Environment Variables (`.env`)**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/education_management_system
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

> ⚠️ Change these credentials immediately after your first login in production.

| Field | Value |
|-------|-------|
| Email | `admin@ems.com` |
| Password | `Admin@123` |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/students` | List all students |
| POST | `/api/students` | Add a new student |
| GET | `/api/courses` | List all courses |
| POST | `/api/courses` | Create a course |
| GET | `/api/attendance` | Get attendance records |

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
