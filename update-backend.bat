@echo off
echo ========================================
echo   Updating & Starting NewFlix Backend
echo ========================================
echo.

echo [1/2] Stopping current server...
taskkill /f /im java.exe >nul 2>&1

echo [2/2] Starting with Maven (Auto-Rebuild)...
cd backend
mvn spring-boot:run
