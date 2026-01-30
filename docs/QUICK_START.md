# 🚀 NewFlix - Full Stack Quick Start

## ✨ FIXED: Unified Full-Stack Setup

### The Problem (Before):
- ❌ "Failed to fetch" - Backend wasn't running
- ❌ Had to run frontend and backend separately
- ❌ CORS issues

### The Solution (Now):
- ✅ **Proxy Configuration** - Frontend auto-forwards API requests to backend
- ✅ **Two Easy Options** - Development mode OR unified production mode
- ✅ **No CORS issues** - Proxy handles everything

---

## 🎯 Quick Start - Choose Your Mode

### Option 1: Development Mode (EASIEST for development)

**ONE COMMAND** to start both servers with hot-reload:

```bash
start-dev.bat
```

This will:
1. Start Spring Boot backend on port 8080
2. Start Vite frontend on port 5173  
3. **Proxy setup** - Frontend automatically forwards `/api` requests to backend
4. Open: **http://localhost:5173**

✅ **With proxy, you only use port 5173!**

---

### Option 2: Production Mode (Single server)

**Build and run as ONE application:**

```bash
start-fullstack.bat
```

This will:
1. Build React app
2. Copy to Spring Boot static folder
3. Start Spring Boot server
4. Open: **http://localhost:8080**

✅ **Everything runs on port 8080!**

---

## 📋 Prerequisites (Install Once)

### 1. Java 17+
```bash
java -version
```
Download: https://adoptium.net/

### 2. Maven
```bash
mvn -version
```
Download: https://maven.apache.org/download.cgi

### 3. MySQL Database
```sql
CREATE DATABASE newflix_db;
```

If your MySQL password isn't `root`, edit:
`backend/src/main/resources/application.properties`

---

## 🚀 Recommended: Use Development Mode

1. **Create the database:**
```sql
CREATE DATABASE newflix_db;
```

2. **Start dev mode:**
```bash
start-dev.bat
```

3. **Open browser:**
```
http://localhost:5173
```

4. **Test authentication:**
- Click "Get Started"
- Sign up with username/email/password
- Your data is saved to MySQL!

---

## 🔍 How The Proxy Works

**Before (❌ Broken):**
```
Frontend (5173) → http://localhost:8080/api/auth → ❌ CORS Error
```

**Now (✅ Working):**
```
Frontend (5173) → /api/auth → Vite Proxy → Backend (8080) → ✅ Success!
```

The proxy configuration in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}
```

---

## 📁 Project Structure

```
newflix/
├── start-dev.bat          ⭐ START HERE (Development)
├── start-fullstack.bat    ⭐ Or here (Production)
├── vite.config.js         ✅ Proxy configured
├── package.json           ✅ Build scripts added
├── src/
│   ├── services/
│   │   └── authAPI.js     ✅ Using relative URLs
│   └── pages/
│       └── LandingPage.jsx ✅ Connected to backend
└── backend/
    ├── src/main/...       ✅ Spring Boot backend
    └── pom.xml
```

---

## ✅ Verify Everything Works

### 1. Check Backend
```bash
# In a new terminal:
cd backend
mvn spring-boot:run
```

Wait for: `Started NewFlixBackendApplication`

Test: http://localhost:8080/api/auth/test  
Should see: `Backend is running!`

### 2. Check Frontend with Proxy
```bash
# Keep backend running, in another terminal:
npm run dev
```

Open: http://localhost:5173

Try signing up - should work! ✅

### 3. Check Database
```sql
USE newflix_db;
SELECT * FROM users;
```

You'll see your user! ✅

---

## 🐛 Troubleshooting

### "Failed to fetch"
**Cause:** Backend not running  
**Fix:** Run `start-dev.bat` or manually start backend first

### "Port 8080 already in use"
**Fix 1:** Stop other program using port 8080  
**Fix 2:** Change port in `application.properties`:
```properties
server.port=8081
```
Also update proxy in `vite.config.js`:
```javascript
target: 'http://localhost:8081',
```

### "Cannot connect to database"
1. Make sure MySQL is running
2. Verify database exists: `SHOW DATABASES;`
3. Check credentials in `application.properties`

### Frontend runs but API calls fail
Make sure backend is running on port 8080!

---

## 🎯 What Changed

### Files Modified:
1. ✅ `vite.config.js` - Added proxy configuration
2. ✅ `authAPI.js` - Changed to relative URLs
3. ✅ `application.properties` - Added static file serving
4. ✅ `package.json` - Added build scripts

### Files Created:
1. ✅ `WebConfig.java` - SPA routing support
2. ✅ `start-dev.bat` - Development mode script
3. ✅ `start-fullstack.bat` - Production mode script

---

## 🎉 You're All Set!

### For Development:
```bash
start-dev.bat
```
Frontend: http://localhost:5173 (with proxy to backend)

### For Production:
```bash
start-fullstack.bat
```
Everything: http://localhost:8080

**No more "failed to fetch" errors!** 🚀

---

## 📞 Still Having Issues?

1. Make sure Java, Maven, and MySQL are installed
2. Create the `newflix_db` database
3. Start with `start-dev.bat`
4. Check both terminals for errors

Your authentication now works with:
✅ Database persistence  
✅ Encrypted passwords  
✅ No CORS issues  
✅ Easy startup  

Happy coding! 🎬
