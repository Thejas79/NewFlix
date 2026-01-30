@echo off
echo ========================================
echo   NewFlix Backend Diagnostic Tool
echo ========================================
echo.

echo [1/3] Checking Java...
java -version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is NOT installed or not in PATH!
    pause
    exit /b
)
echo OK.
echo.

echo [2/3] Checking Port 8080...
netstat -an | find ":8080" | find "LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo WARNING: Port 8080 is ALREADY IN USE!
    echo This might be an old version of the backend running.
    echo Please close any other terminals running the backend.
) else (
    echo OK (Port 8080 is free).
)
echo.

echo [3/3] Checking MySQL Configuration...
echo Your current configuration in application.properties:
echo ---------------------------------------------------
type backend\src\main\resources\application.properties | findstr "spring.datasource.url spring.datasource.username spring.datasource.password"
echo ---------------------------------------------------
echo.
echo CRITICAL CHECK:
echo 1. Does the password above match your MySQL root password?
echo 2. Have you run 'CREATE DATABASE newflix_db;' in MySQL?
echo.
echo If you are unsure, try changing the password in:
echo backend/src/main/resources/application.properties
echo.
pause
