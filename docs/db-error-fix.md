# 🚨 FINAL STEP: Database Connection Failed

The backend tried to start but **CRASHED** because it couldn't connect to MySQL of `newflix_db` does not exist.

## 🛠️ HOW TO FIX IT (Do one of these):

### Method 1: Check MySQL Password
By default, the app tries:
- User: `root`
- Password: `root`

**Is your MySQL password different?**
1. Open: `backend/src/main/resources/application.properties`
2. Update: `spring.datasource.password=YOUR_ACTUAL_PASSWORD`
3. If no password, leave it empty: `spring.datasource.password=`

### Method 2: Create Database Manually
Sometimes the auto-create fails. Run this in MySQL Workbench:
```sql
CREATE DATABASE newflix_db;
```

### Method 3: Start MySQL Service
Search for "Services" in Windows → Find "MySQL" → Right click → **Start**

---

## 🚀 AFTER FIXING:

Run the backend script again:
```bash
backend\run-backend.bat
```

Once you see `Started NewFlixBackendApplication`, your app works!
