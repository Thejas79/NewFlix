@echo off
echo ================================================
echo  NewFlix Development Mode
echo ================================================
echo.
echo Starting BOTH servers for development:
echo - Frontend (Vite): http://localhost:5173
echo - Backend (Spring Boot): http://localhost:8080
echo.
echo The frontend will proxy API calls to the backend.
echo.
echo Press Ctrl+C in EACH terminal to stop the servers.
echo ================================================
echo.

REM Check if backend is already running
netstat -an | find ":8080" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo Backend is already running on port 8080
    echo.
) else (
    echo Starting Backend Server...
    start "NewFlix Backend" cmd /k "cd backend && mvn spring-boot:run"
    echo Waiting for backend to start...
    timeout /t 10 /nobreak >nul
)

echo.
echo Frontend will start in this window...
echo.
timeout /t 2 /nobreak >nul

npm run dev
