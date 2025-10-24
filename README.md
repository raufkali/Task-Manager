# 📝 Task-Manager  
*A full-stack task management web application*

---

## 🚀 Overview  
**Task-Manager** is my first full-stack web application, built to provide secure, user-centric task management.  
Users can register, log in, and once authenticated, create, view, edit, and delete their tasks.  
The home page serves as the dashboard to manage everything in one place.

---

## 🔧 Features  
- ✅ User registration and login (authentication with JWT or sessions)  
- ✅ Each user can access only their own tasks  
- ✅ Full CRUD operations for tasks (Create, Read, Update, Delete)  
- ✅ Clean UI with Bootstrap styling  
- ✅ Responsive and intuitive frontend built with React / Next.js  
- ✅ Backend powered by Node.js, Express.js, and MongoDB  
- ✅ Secure API endpoints and proper error handling middleware  

---

## 🗂️ Project Structure  
/client # Front-end (React / Next.js + Bootstrap)
/config # Configuration files (env, db, etc)
/controllers # Logic for users & tasks
/middleware # Authentication and error handlers
/models # Mongoose models
/routes # API endpoints (users, tasks)
/server.js # Entry point for backend
.env # Environment variables


---

## ⚙️ Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/raufkali/Task-Manager.git
cd Task-Manager
```
2️⃣ Install Dependencies
```bash
npm install        # backend dependencies
cd client && npm install   # frontend dependencies
```
3️⃣ Set Environment Variables
```bash
Create a .env file in the root folder:
MONGO_URI=mongodb://localhost:27017/taskManager
JWT_SECRET=your_jwt_secret
PORT=5000
```
4️⃣ Run the Application
```bash
Start backend:
npm run dev
Start frontend:
cd client && npm start

```
Now open your browser at http://localhost:3000
 and enjoy!
 🧰 Tech Stack

Frontend: React.js / Next.js + Bootstrap
Backend: Node.js + Express.js
Database: MongoDB (Mongoose)
Auth: JWT Authentication
Styling: Bootstrap CSS
Version Control: Git & GitHub

🧩 Why I Built It
To learn how to build and integrate authentication in full-stack apps.
To practice CRUD operations in a real-world use case.
To strengthen my MERN-stack development skills.
To build a complete project for my portfolio.

👤 Author
Rauf Ahmad — Computer Science Student & MERN Stack Developer
GitHub: @raufkali
