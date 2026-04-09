# Education Management System (Angular + Express + MongoDB)

## Folder Structure

```
education-management-system/
  backend/   # Node.js + Express + Mongoose REST API
  frontend/  # Angular (TypeScript) + Bootstrap UI
```

## How to Run (Local)

### 1) Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.

### 2) Backend

```bash
cd backend
copy .env.example .env
npm install
npm run seed:admin
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3) Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

## Default Admin

- Email: `admin@ems.com`
- Password: `Admin@123`

