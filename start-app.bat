@echo off
echo 🎯 PyQuiz Application Startup
echo ========================================

echo.
echo 📋 Starting services...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.

REM Start backend in background
start "PyQuiz Backend" cmd /c "cd backend && python app.py"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in background
start "PyQuiz Frontend" cmd /c "npm run dev"

echo.
echo 🚀 PyQuiz is starting up!
echo.
echo Press any key to stop all services...
pause >nul

REM Kill background processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo 🛑 PyQuiz stopped
pause 