# ⚠️ IMPORTANT: Backend Is NOT Running!

## The Error You're Seeing:

```
Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

**This means:** The Spring Boot backend server is **NOT running**!

---

## ✅ SOLUTION (Do This Now):

### Step 1: Create the Database

Open **MySQL Workbench** or **MySQL Command Line** and run:

```sql
CREATE DATABASE IF NOT EXISTS newflix_db;
```

### Step 2: Fix Password (If Needed)

If your MySQL password is NOT `root`, edit this file:
```
backend/src/main/resources/application.properties
```

Change line 7:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Start Backend Server

Open a **NEW terminal** (don't close your npm one!):

```bash
cd "c:\DRIVE D\TAPprojects\newflix\backend"
mvn clean install -DskipTests
mvn spring-boot:run
```

**Wait for this message:**
```
Started NewFlixBackendApplication in X.XXX seconds (JVM running for X.XXX)
```

✅ **Leave this terminal OPEN!**

### Step 4: Refresh Your Browser

Now go back to http://localhost:5173 and try signing up again!

---

## 🎯 What's Happening?

Your **frontend** (React) is running on port 5173 ✅  
Your **backend** (Spring Boot) needs to run on port 8080 ❌ (not running yet)

When you click "Create Account", the frontend tries to send data to the backend, but since the backend isn't running, you get the JSON error!

---

## 🐛 If Maven Doesn't Work:

### Option 1: Check Java Version
```bash
java -version
```
Should be **17 or higher**. If not, install from: https://adoptium.net/

### Option 2: Check Maven Installation
```bash
mvn -version
```
If not found, install from: https://maven.apache.org/download.cgi

### Option 3: Use IntelliJ IDEA or Eclipse
1. Open IntelliJ IDEA or Eclipse
2. Import `backend` folder as Maven project
3. Right-click `NewFlixBackendApplication.java`
4. Click "Run"

---

## 📝 Quick Checklist:

- [ ] MySQL is running
- [ ] Database `newflix_db` exists
- [ ] MySQL password is correct in application.properties
- [ ] Java 17+ is installed
- [ ] Maven is installed
- [ ] Backend server is started (port 8080)
- [ ] Frontend is running (port 5173)

---

## ✅ How To Know Backend Is Running:

### Test 1: Check Terminal
Look for this message:
```
Started NewFlixBackendApplication in X.XXX seconds
```

### Test 2: Open Browser
Visit: http://localhost:8080/api/auth/test

Should see: `Backend is running!`

### Test 3: Check Port
```bash
netstat -an | findstr :8080
```
Should show port 8080 is listening

---

## 🎬 After Backend Starts:

1. Keep backend terminal **OPEN**
2. Go to your browser: http://localhost:5173
3. Try signing up again
4. It should work! ✅

---

## 💡 Remember:

You need **TWO terminals**:

1. **Terminal 1** - Frontend (npm run dev) - Port 5173
2. **Terminal 2** - Backend (mvn spring-boot:run) - Port 8080

Both must be running at the same time!

---

Need more help? Check the error message in the backend terminal for clues!
