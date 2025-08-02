@echo off
echo 🎯 PyQuiz Startup Script
echo ========================================

echo.
echo 🔍 Checking dependencies...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo 💡 Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo 💡 Please install Node.js 16+ and try again
    pause
    exit /b 1
)

REM Check if npm dependencies are installed
if not exist "node_modules" (
    echo ❌ Node.js dependencies not found
    echo 💡 Installing npm dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install npm dependencies
        pause
        exit /b 1
    )
)

REM Check if Python dependencies are installed
cd backend
python -c "import flask, flask_cors, flask_sqlalchemy" >nul 2>&1
if errorlevel 1 (
    echo ❌ Python dependencies not found
    echo 💡 Installing Python dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Failed to install Python dependencies
        pause
        exit /b 1
    )
)
cd ..

echo ✅ All dependencies found
echo.
echo 📋 Starting PyQuiz services...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop all services
echo ========================================

REM Start backend in background
start "PyQuiz Backend" cmd /c "cd backend && python app.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
start "PyQuiz Frontend" cmd /c "npm run dev"

echo.
echo 🚀 PyQuiz is starting up!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop all services...
pause >nul

REM Kill background processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo 🛑 PyQuiz stopped
pause 