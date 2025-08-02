# PyQuiz - Interactive Programming Quiz Application

A modern, interactive quiz application built with React, TypeScript, and Flask. Test your programming knowledge across multiple categories with real-time scoring and beautiful gaming-inspired UI.

## 🚀 Features

- **Multiple Categories**: Python, Web Development, Algorithms, Database Systems
- **Real-time Scoring**: Earn points based on speed and accuracy
- **Beautiful UI**: Gaming-inspired design with glassmorphism effects
- **Progress Tracking**: Track your performance and climb leaderboards
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Flask** Python web framework
- **SQLAlchemy** for database management
- **SQLite** database
- **Flask-CORS** for cross-origin requests

## 📋 Prerequisites

Before running the application, make sure you have:

- **Node.js** (version 16 or higher)
- **Python** (version 3.8 or higher)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### Option 1: Using the Startup Script (Recommended)

1. **Clone or download the project**
2. **Open a terminal in the project directory**
3. **Run the startup script:**
   ```bash
   start-app.bat
   ```

This will automatically:
- Install all dependencies (if not already installed)
- Start the Flask backend on `http://localhost:5000`
- Start the React frontend on `http://localhost:5173`

### Option 2: Manual Setup

#### 1. Install Dependencies

**Frontend dependencies:**
```bash
npm install
```

**Backend dependencies:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

#### 2. Start the Backend

```bash
cd backend
python app.py
```

The backend will be available at `http://localhost:5000`

#### 3. Start the Frontend

In a new terminal:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎮 How to Play

1. **Start the application** using one of the methods above
2. **Open your browser** and go to `http://localhost:5173`
3. **Click "Start Quiz"** on the home page
4. **Choose a category** (Python, Web Development, Algorithms, or Database Systems)
5. **Answer questions** within the time limit to earn points
6. **View your results** and try to beat your high score!

## 📁 Project Structure

```
PyQuiz/
├── backend/                 # Flask backend
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   └── instance/         # Database files
├── src/                   # React frontend
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   └── assets/          # Static assets
├── public/              # Public assets
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend API Endpoints

- `GET /api/categories` - Get all quiz categories
- `GET /api/questions/{category_id}` - Get questions for a category
- `POST /api/game/session` - Create a new game session
- `PUT /api/game/session/{session_id}` - Update game session results
- `GET /api/game/leaderboard` - Get top scores

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Make sure no other applications are using ports 5000 or 5173
   - Kill existing processes if needed

2. **Dependencies not found**
   - Run `npm install` for frontend dependencies
   - Run `pip install -r backend/requirements.txt` for backend dependencies

3. **Database issues**
   - The database will be automatically created on first run
   - Sample data will be populated automatically

4. **CORS errors**
   - Make sure the backend is running on `localhost:5000`
   - Check that the frontend is making requests to the correct URL

### Getting Help

If you encounter any issues:

1. Check that all dependencies are installed
2. Ensure both backend and frontend are running
3. Check the browser console for any JavaScript errors
4. Check the terminal output for any Python errors

## 🎨 Customization

### Adding New Categories

1. Edit `backend/app.py` and add new categories to the `categories_data` list
2. Add corresponding questions to the `questions_data` list
3. Restart the backend server

### Styling

The application uses Tailwind CSS with custom gaming-inspired styles. You can modify:
- `src/index.css` for global styles
- Component files for specific styling
- `tailwind.config.ts` for Tailwind configuration

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Coding! 🎯**
