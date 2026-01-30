@echo off
echo ================================================
echo  NewFlix Full-Stack Application Startup
echo ================================================
echo.
echo This script will:
echo 1. Build the React frontend
echo 2. Copy it to Spring Boot static folder
echo 3. Start the Spring Boot server on port 8080
echo.
echo After startup, open: http://localhost:8080
echo.
pause

echo.
echo [Step 1/3] Building React frontend...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)

echo.
echo [Step 2/3] Copying frontend to backend...
echo.
xcopy /E /I /Y dist backend\src\main\resources\static

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to copy frontend files!
    pause
    exit /b 1
)

echo.
echo [Step 3/3] Starting Spring Boot server...
echo.
cd backend
mvn spring-boot:run

pause
