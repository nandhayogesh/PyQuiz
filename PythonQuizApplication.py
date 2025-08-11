#!/usr/bin/env python3
"""
PyQuiz Startup Script
Launches both the Flask backend and React frontend
"""

import subprocess
import sys
import os
import time
import signal
import threading
from pathlib import Path

def run_backend():
    """Run the Flask backend"""
    backend_dir = Path(__file__).parent / "backend"
    os.chdir(backend_dir)
    
    print("🚀 Starting Flask backend...")
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend stopped")
    except Exception as e:
        print(f"❌ Backend error: {e}")

def run_frontend():
    """Run the React frontend"""
    frontend_dir = Path(__file__).parent
    os.chdir(frontend_dir)
    
    print("🎨 Starting React frontend...")
    try:
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend stopped")
    except Exception as e:
        print(f"❌ Frontend error: {e}")

def check_dependencies():
    """Check if required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    # Check Python dependencies
    try:
        import flask
        import flask_cors
        import flask_sqlalchemy
        print("✅ Python dependencies found")
    except ImportError as e:
        print(f"❌ Missing Python dependency: {e}")
        print("💡 Run: pip install -r backend/requirements.txt")
        return False
    
    # Check Node.js dependencies
    if not Path("node_modules").exists():
        print("❌ Node.js dependencies not found")
        print("💡 Run: npm install")
        return False
    
    print("✅ All dependencies found")
    return True

def main():
    """Main startup function"""
    print("🎯 PyQuiz Startup Script")
    print("=" * 40)
    
    if not check_dependencies():
        print("\n❌ Please install missing dependencies and try again")
        return
    
    print("\n📋 Starting PyQuiz services...")
    print("Backend will be available at: http://localhost:5000")
    print("Frontend will be available at: http://localhost:5173")
    print("\nPress Ctrl+C to stop all services")
    print("=" * 40)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Give backend time to start
    time.sleep(2)
    
    # Start frontend in main thread
    try:
        run_frontend()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down PyQuiz...")

if __name__ == "__main__":
    main() 
