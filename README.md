# Ideamagix Lecture Scheduling System


## 👤 Credentials
- Admin:
  - Email: shweta@example.com
  - Password: admin@123


## 🛠️ Features
- Admin Login 
- Course Creation
- Lecture Assignment to Instructors
- Conflict-free Scheduling
- Instructor Dashboard

## 🔗 Routes

### API (Backend)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/login | Login for Admin/Instructor |
| POST   | /api/auth/register | Register new user |
| GET    | /api/courses | Get all courses |
| POST   | /api/courses | Add new course |
| GET    | /api/instructors | List all instructors |
| POST   | /api/lectures | Assign lecture |
| GET    | /api/lectures/:id | Get lectures for instructor by ID |

### Frontend (React)
| Route | Description |
|-------|-------------|
| `/` | Login Page |
| `/admin` | Admin Dashboard |
| `/instructor/:id` | Instructor Panel |
| `/courses` | All Courses List |

## 📁 Folder Structure
- `/client` – React frontend
- `lecture-scheduling/server` – Node.js backend

### 1️⃣ Backend Setup (Server)

```bash
cd lecture-scheduling
cd server
npm install
node index.js

npm install bcryptjs

### 1️⃣ Frontend Setup (client)

```bash
cd client
npm install
npm start

npm install axios react-router-dom