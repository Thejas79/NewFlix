# 🎯 SIMPLE FIX - Start NewFlix Full Stack

## The "Failed to Fetch" Problem = Backend Not Running!

Your frontend is running, but the backend isn't. Here's how to fix it:

---

## ✅ EASIEST SOLUTION - Manual Start (2 Steps)

### Step 1: Start Backend (New Terminal)

Open a **NEW terminal** and run:

```bash
cd "c:\DRIVE D\TAPprojects\newflix\backend"
mvn spring-boot:run
```

Wait for this message:
```
Started NewFlixBackendApplication in X.XXX seconds
```

✅ **Leave this terminal open!**

---

### Step 2: Restart Frontend

Your frontend is already running, but restart it to use the NEW proxy:

1. **Stop** your current `npm run dev` (Press Ctrl+C)
2. **Start** it again:

```bash
cd "c:\DRIVE D\TAPprojects\newflix"
npm run dev
```

---

### Step 3: Test

Open: **http://localhost:5173**

Try signing up:
- Username: testuser
- Email: test@example.com  
- Password: password123

✅ **Should work now!**

---

## 📋 Before You Start - Quick Checklist

### 1. Is MySQL running?
- Open MySQL Workbench
- Or check services

### 2. Does the database exist?

Open MySQL and run:
```sql
CREATE DATABASE IF NOT EXISTS newflix_db;
```

### 3. Database password correct?

If your MySQL password is NOT `root`, edit:
```
backend/src/main/resources/application.properties
```

Change line:
```properties
spring.datasource.password=YOUR_PASSWORD
```

---

## 🚀 Alternative: Use The Script

**OR** use the automated script (opens both terminals):

```bash
.\start-dev.bat
```

This automatically:
1. Starts backend in a new window
2. Waits 10 seconds
3. Starts frontend

---

## 🎯 What's Changed (You Don't Need to Do Anything)

I've already fixed your code:

✅ **Proxy Setup** - Vite now forwards `/api` calls to backend  
✅ **No CORS Issues** - Everything works through localhost:5173  
✅ **Relative URLs** - Frontend uses `/api/auth` instead of full URLs  

---

## 🐛 If It Still Doesn't Work

### Check 1: Is backend running?

Open: http://localhost:8080/api/auth/test

Should see: `Backend is running!`

If NOT, backend isn't started properly.

### Check 2: Frontend proxy working?

Look at browser console (F12), should see requests going to:
```
http://localhost:5173/api/auth/signup  ← Proxy handles this
```

### Check 3: Database connection?

Check backend terminal for errors about MySQL connection.

---

## 💡 Summary

**Problem:** Frontend tries to connect to backend, but backend isn't running

**Solution:** Start backend FIRST, then frontend

**Two Terminals Needed:**
1. Terminal 1: Backend (port 8080)
2. Terminal 2: Frontend (port 5173)

Frontend will proxy API requests to backend automatically!

---

## 🎬 Quick Test Commands

```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend (in a new terminal)
npm run dev
```

✅ Done! Open http://localhost:5173 and sign up!
