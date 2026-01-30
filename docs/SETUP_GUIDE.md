# 🎬 NewFlix - Complete Setup Guide

## Overview
NewFlix now has a **Java Spring Boot backend** with **MySQL database** for secure user authentication. This guide will help you set up everything from scratch.

---

## 📋 Prerequisites

### 1. **Java Development Kit (JDK) 17+**
- Download: https://www.oracle.com/java/technologies/downloads/
- Or use OpenJDK: https://adoptium.net/
- Verify installation: `java -version`

### 2. **Maven 3.6+**
- Download: https://maven.apache.org/download.cgi
- Add to PATH environment variable
- Verify installation: `mvn -version`

### 3. **MySQL Server 8.0+**
- Download: https://dev.mysql.com/downloads/mysql/
- During installation, set root password (default in our config is `root`)
- Verify installation: Open MySQL Workbench or run `mysql -u root -p`

### 4. **Node.js & npm**
- Already installed ✓ (your React app is running)

---

## 🗄️ Database Setup

### Step 1: Start MySQL Server
Make sure MySQL is running on your system.

### Step 2: Create Database
Open MySQL Command Line or MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS newflix_db;
```

### Step 3: Verify Database
```sql
SHOW DATABASES;
```
You should see `newflix_db` in the list.

### Step 4: Configure Database Credentials
If your MySQL username or password is different from defaults, edit:
```
backend/src/main/resources/application.properties
```

Change these lines:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

---

## 🚀 Running the Application

### Option 1: Using the Batch Script (Easiest)

1. Open terminal in the backend folder:
   ```bash
   cd backend
   ```

2. Run the batch script:
   ```bash
   run-backend.bat
   ```

### Option 2: Using Maven Directly

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Clean and install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Option 3: Using IntelliJ IDEA / Eclipse

1. Open IntelliJ IDEA or Eclipse
2. Import the `backend` folder as a Maven project
3. Wait for dependencies to download
4. Find and run `NewFlixBackendApplication.java`

---

## ✅ Verify Backend is Running

### Test 1: Check Console Output
You should see something like:
```
Started NewFlixBackendApplication in X.XXX seconds
```

### Test 2: Test Endpoint
Open browser and visit:
```
http://localhost:8080/api/auth/test
```

You should see: `Backend is running!`

### Test 3: Check Database Tables
In MySQL, run:
```sql
USE newflix_db;
SHOW TABLES;
```

You should see the `users` table created automatically by Spring Boot!

---

## 🌐 Running Frontend + Backend Together

### Terminal 1 - Backend (Port 8080)
```bash
cd backend
mvn spring-boot:run
```

### Terminal 2 - Frontend (Port 5173)
```bash
cd ..
npm run dev
```

---

## 🧪 Testing the Authentication System

### 1. **Sign Up**
- Open http://localhost:5173
- Click "Get Started" or "Sign In"
- Switch to "Sign up now"
- Enter:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`
- Click "Create Account"
- You should be redirected to the browse page!

### 2. **Verify in Database**
```sql
USE newflix_db;
SELECT * FROM users;
```

You'll see your user with encrypted password!

### 3. **Sign In**
- Log out and return to landing page
- Click "Sign In"
- Enter:
  - Username: `testuser`
  - Password: `password123`
- Click "Sign In"
- Success! You're authenticated!

### 4. **Test Invalid Login**
- Try wrong password
- You should see: "Invalid username or password!"

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api/auth
```

### 1. Sign Up
**POST** `/api/auth/signup`

Request Body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Success Response (201):
```json
{
  "success": true,
  "message": "Account created successfully!",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2026-01-30T03:35:55"
  }
}
```

Error Response (400):
```json
{
  "success": false,
  "message": "Username already exists!"
}
```

### 2. Sign In
**POST** `/api/auth/signin`

Request Body:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

Success Response (200):
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2026-01-30T03:35:55"
  }
}
```

Error Response (401):
```json
{
  "success": false,
  "message": "Invalid username or password!"
}
```

---

## 🔒 Security Features

✅ **Password Encryption**: All passwords are encrypted using BCrypt  
✅ **Database Validation**: Users must exist in database to sign in  
✅ **Unique Constraints**: Username and email must be unique  
✅ **Input Validation**: Server-side validation for all fields  
✅ **CORS Protection**: Only allowed origins can access API  

---

## 🐛 Troubleshooting

### Problem: "Port 8080 already in use"
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```
Also update `authAPI.js` in frontend:
```javascript
const API_BASE_URL = 'http://localhost:8081/api/auth';
```

### Problem: "Cannot connect to database"
**Solutions**:
1. Make sure MySQL is running
2. Verify database name: `newflix_db` exists
3. Check username/password in `application.properties`
4. Test connection: `mysql -u root -p`

### Problem: "Maven not found"
**Solution**: 
1. Install Maven: https://maven.apache.org/download.cgi
2. Add Maven `bin` folder to System PATH
3. Restart terminal
4. Verify: `mvn -version`

### Problem: "Java version mismatch"
**Solution**:
1. Install Java 17 or higher
2. Set JAVA_HOME environment variable
3. Verify: `java -version`

### Problem: "Frontend cannot connect to backend"
**Solutions**:
1. Make sure backend is running on port 8080
2. Check browser console for CORS errors
3. Verify API URL in `src/services/authAPI.js`
4. Test backend: http://localhost:8080/api/auth/test

### Problem: "Table 'users' doesn't exist"
**Solution**:
- Spring Boot auto-creates tables
- Make sure `spring.jpa.hibernate.ddl-auto=update` in `application.properties`
- Restart backend server
- Check logs for errors

---

## 📁 Project Structure

```
newflix/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/newflix/backend/
│   │       │   ├── NewFlixBackendApplication.java
│   │       │   ├── config/
│   │       │   │   └── SecurityConfig.java
│   │       │   ├── controller/
│   │       │   │   └── AuthController.java
│   │       │   ├── dto/
│   │       │   │   ├── SignUpRequest.java
│   │       │   │   ├── SignInRequest.java
│   │       │   │   ├── AuthResponse.java
│   │       │   │   └── UserData.java
│   │       │   ├── model/
│   │       │   │   └── User.java
│   │       │   ├── repository/
│   │       │   │   └── UserRepository.java
│   │       │   └── service/
│   │       │       └── AuthService.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   ├── run-backend.bat
│   └── README.md
├── src/                              # React Frontend
│   ├── pages/
│   │   ├── LandingPage.jsx          # Login/Signup UI
│   │   └── HomePage.jsx
│   └── services/
│       ├── authAPI.js                # Backend API Integration
│       └── tmdb.js
├── package.json
└── SETUP_GUIDE.md                    # This file!
```

---

## 🎯 Next Steps

1. ✅ Set up MySQL database
2. ✅ Run backend server
3. ✅ Test authentication
4. 🔄 Customize user profile features
5. 🔄 Add user preferences to database
6. 🔄 Implement session management
7. 🔄 Add "Remember Me" functionality

---

## 📞 Need Help?

- **Backend not starting**: Check Java and Maven installation
- **Database errors**: Verify MySQL is running and credentials are correct
- **Frontend connection issues**: Make sure backend is on port 8080
- **CORS errors**: Check SecurityConfig.java and allowed origins

---

## 🎉 Success!

If you can sign up, sign in, and see your data in the database, you're all set! Your NewFlix application now has:

✅ Secure user authentication  
✅ Database persistence  
✅ Password encryption  
✅ Frontend-backend integration  
✅ Beautiful UI with real-time feedback  

**Happy coding! 🚀**
