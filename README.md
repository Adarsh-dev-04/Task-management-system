# Task Management System

A full-stack Task Management Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project was developed as part of the MERN Stack Internship Assessment and provides secure task management with authentication, CRUD operations, search, filtering, and pagination.

## 🚀 Live Demo

- Frontend: https://task-management-system-drab-three.vercel.app/
- Backend API: https://task-management-system-d73k.onrender.com

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- Toggle Task Status (Pending/Completed)

### Additional Features
- Search Tasks
- Filter Tasks by Status
- Pagination
- Responsive User Interface
- Form Validation
- Error Handling

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

## 📂 Project Structure

```bash
task-management-system/
├── frontend/
├── backend/
└── README.md
```

## ⚙️ Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=development
```

4. Start the server:

```bash
npm run dev
```

## ⚙️ Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```http
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/toggle
```

## 📌 Key Highlights

- Secure JWT Authentication
- User-Specific Task Management
- RESTful API Architecture
- Search, Filter, and Pagination Support
- Clean and Responsive UI
- Structured and Maintainable Codebase

## 🎯 Assignment Requirements Covered

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Task CRUD Operations
- ✅ Task Status Management
- ✅ MongoDB Integration
- ✅ Responsive React Frontend
- ✅ Form Validation
- ✅ Error Handling
- ✅ Search & Filter (Bonus)
- ✅ Pagination (Bonus)
- ✅ Deployment (Bonus)

## 🔗 Deployment

- Frontend (Vercel): https://task-management-system-drab-three.vercel.app/
- Backend (Render): https://task-management-system-d73k.onrender.com

## 👨‍💻 Author

**Adarsh Agrahari**
