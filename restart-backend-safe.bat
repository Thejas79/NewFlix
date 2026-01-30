@echo off
echo Stopping existing java processes...
taskkill /f /im java.exe >nul 2>&1

echo Starting backend with Maven...
cd backend
mvn spring-boot:run
