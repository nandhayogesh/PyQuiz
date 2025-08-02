from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pyquiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)

# Database Models
class Category(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Question(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    category_id = db.Column(db.String(50), db.ForeignKey('category.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text, nullable=False)  # JSON string
    correct_answer = db.Column(db.Integer, nullable=False)
    explanation = db.Column(db.Text)
    difficulty = db.Column(db.String(20), nullable=False)  # Easy, Medium, Hard
    points = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class GameSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.String(50), db.ForeignKey('category.id'), nullable=False)
    score = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    total_questions = db.Column(db.Integer, default=0)
    accuracy = db.Column(db.Float, default=0.0)
    duration = db.Column(db.Integer, default=0)  # in seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all quiz categories"""
    categories = Category.query.all()
    return jsonify([{
        'id': cat.id,
        'name': cat.name,
        'description': cat.description,
        'question_count': Question.query.filter_by(category_id=cat.id).count()
    } for cat in categories])

@app.route('/api/questions/<category_id>', methods=['GET'])
def get_questions(category_id):
    """Get random questions for a category"""
    count = request.args.get('count', 10, type=int)
    questions = Question.query.filter_by(category_id=category_id).all()
    
    if not questions:
        return jsonify({'error': 'Category not found'}), 404
    
    # Randomly select questions
    selected_questions = random.sample(questions, min(count, len(questions)))
    
    return jsonify([{
        'id': q.id,
        'question': q.question,
        'options': eval(q.options),  # Convert JSON string back to list
        'correctAnswer': q.correct_answer,
        'explanation': q.explanation,
        'difficulty': q.difficulty,
        'points': q.points
    } for q in selected_questions])

@app.route('/api/game/session', methods=['POST'])
def create_game_session():
    """Create a new game session"""
    data = request.get_json()
    session = GameSession(
        category_id=data['category_id'],
        total_questions=data['total_questions']
    )
    db.session.add(session)
    db.session.commit()
    return jsonify({'session_id': session.id})

@app.route('/api/game/session/<int:session_id>', methods=['PUT'])
def update_game_session(session_id):
    """Update game session with final results"""
    session = GameSession.query.get_or_404(session_id)
    data = request.get_json()
    
    session.score = data['score']
    session.correct_answers = data['correct_answers']
    session.accuracy = data['accuracy']
    session.duration = data['duration']
    
    db.session.commit()
    return jsonify({'message': 'Session updated successfully'})

@app.route('/api/game/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get top scores"""
    category_id = request.args.get('category_id')
    limit = request.args.get('limit', 10, type=int)
    
    query = GameSession.query
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    top_scores = query.order_by(GameSession.score.desc()).limit(limit).all()
    
    return jsonify([{
        'score': session.score,
        'accuracy': session.accuracy,
        'correct_answers': session.correct_answers,
        'total_questions': session.total_questions,
        'duration': session.duration,
        'created_at': session.created_at.isoformat()
    } for session in top_scores])

# Initialize database with sample data
def init_db():
    """Initialize database with sample quiz data"""
    with app.app_context():
        db.create_all()
        
        # Check if data already exists
        if Category.query.first():
            return
        
        # Create categories
        categories_data = [
            {'id': 'python', 'name': 'Python Programming', 'description': 'Test your Python knowledge'},
            {'id': 'algorithms', 'name': 'Algorithms & Data Structures', 'description': 'Master algorithms and data structures'},
            {'id': 'web', 'name': 'Web Development', 'description': 'HTML, CSS, JavaScript and more'},
            {'id': 'databases', 'name': 'Database Systems', 'description': 'SQL and database concepts'}
        ]
        
        for cat_data in categories_data:
            category = Category(**cat_data)
            db.session.add(category)
        
        # Create questions
        questions_data = [
            # Python questions
            {
                'id': 'py1', 'category_id': 'python', 'question': 'Which of the following is the correct way to create a list in Python?',
                'options': '["list = [1, 2, 3]", "list = (1, 2, 3)", "list = {1, 2, 3}", "list = <1, 2, 3>"]',
                'correct_answer': 0, 'explanation': 'Square brackets [] are used to create lists in Python. Parentheses create tuples, curly braces create sets or dictionaries.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'py2', 'category_id': 'python', 'question': 'What will be the output of: print(type(5 / 2))?',
                'options': '["<class \'int\'>", "<class \'float\'>", "<class \'str\'>", "<class \'bool\'>"]',
                'correct_answer': 1, 'explanation': 'In Python 3, the / operator always returns a float, even when dividing integers. Use // for integer division.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'py3', 'category_id': 'python', 'question': 'Which method is used to add an element to the end of a list?',
                'options': '["add()", "append()", "insert()", "extend()"]',
                'correct_answer': 1, 'explanation': 'The append() method adds a single element to the end of a list. extend() adds multiple elements, insert() adds at a specific position.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'py4', 'category_id': 'python', 'question': 'What is the correct syntax for a lambda function that returns x squared?',
                'options': '["lambda x: x^2", "lambda x: x**2", "lambda x: x*x", "Both B and C"]',
                'correct_answer': 3, 'explanation': 'Both x**2 and x*x will square a number in Python. The ^ operator is XOR, not exponentiation.',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'py5', 'category_id': 'python', 'question': 'What does the \'with\' statement do in Python?',
                'options': '["Creates a new variable scope", "Provides context management for resource handling", "Imports modules conditionally", "Creates a loop structure"]',
                'correct_answer': 1, 'explanation': 'The \'with\' statement provides context management, ensuring proper resource cleanup (like closing files) even if an exception occurs.',
                'difficulty': 'Medium', 'points': 150
            },
            
            # Algorithms questions
            {
                'id': 'alg1', 'category_id': 'algorithms', 'question': 'What is the time complexity of binary search?',
                'options': '["O(n)", "O(log n)", "O(n log n)", "O(n²)"]',
                'correct_answer': 1, 'explanation': 'Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step.',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'alg2', 'category_id': 'algorithms', 'question': 'Which sorting algorithm has the best average-case time complexity?',
                'options': '["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"]',
                'correct_answer': 2, 'explanation': 'Merge Sort has consistent O(n log n) time complexity in all cases. Quick Sort averages O(n log n) but can degrade to O(n²).',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'alg3', 'category_id': 'algorithms', 'question': 'What data structure is typically used for implementing recursion?',
                'options': '["Queue", "Stack", "Array", "Linked List"]',
                'correct_answer': 1, 'explanation': 'The call stack is used to manage recursive function calls, storing local variables and return addresses.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'alg4', 'category_id': 'algorithms', 'question': 'In a max heap, what is the relationship between parent and child nodes?',
                'options': '["Parent ≤ Children", "Parent ≥ Children", "Parent = Children", "No specific relationship"]',
                'correct_answer': 1, 'explanation': 'In a max heap, every parent node has a value greater than or equal to its children, ensuring the maximum value is at the root.',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'alg5', 'category_id': 'algorithms', 'question': 'What is the space complexity of merge sort?',
                'options': '["O(1)", "O(log n)", "O(n)", "O(n log n)"]',
                'correct_answer': 2, 'explanation': 'Merge sort requires O(n) extra space for the temporary arrays used during the merging process.',
                'difficulty': 'Hard', 'points': 200
            },
            
            # Web questions
            {
                'id': 'web1', 'category_id': 'web', 'question': 'Which HTML element is used for the largest heading?',
                'options': '["<h6>", "<h1>", "<header>", "<title>"]',
                'correct_answer': 1, 'explanation': 'The <h1> element represents the largest/most important heading in HTML, with <h6> being the smallest.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'web2', 'category_id': 'web', 'question': 'What does CSS stand for?',
                'options': '["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"]',
                'correct_answer': 1, 'explanation': 'CSS stands for Cascading Style Sheets, referring to how styles cascade down through inheritance and specificity.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'web3', 'category_id': 'web', 'question': 'Which JavaScript method is used to select an element by its ID?',
                'options': '["getElement()", "selectElement()", "getElementById()", "findElement()"]',
                'correct_answer': 2, 'explanation': 'document.getElementById() is the standard method to select a single element by its unique ID attribute.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'web4', 'category_id': 'web', 'question': 'What is the difference between \'==\' and \'===\' in JavaScript?',
                'options': '["No difference", "== checks type, === doesn\'t", "=== checks type and value, == only checks value", "=== is for strings only"]',
                'correct_answer': 2, 'explanation': '=== performs strict equality checking both type and value, while == performs type coercion before comparing values.',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'web5', 'category_id': 'web', 'question': 'Which CSS property is used to create space between elements?',
                'options': '["padding", "margin", "border", "spacing"]',
                'correct_answer': 1, 'explanation': 'Margin creates space outside an element\'s border, while padding creates space inside the border.',
                'difficulty': 'Easy', 'points': 100
            },
            
            # Database questions
            {
                'id': 'db1', 'category_id': 'databases', 'question': 'What does SQL stand for?',
                'options': '["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"]',
                'correct_answer': 0, 'explanation': 'SQL stands for Structured Query Language, used for managing and querying relational databases.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'db2', 'category_id': 'databases', 'question': 'Which SQL command is used to retrieve data from a database?',
                'options': '["GET", "SELECT", "FETCH", "RETRIEVE"]',
                'correct_answer': 1, 'explanation': 'SELECT is the SQL command used to query and retrieve data from database tables.',
                'difficulty': 'Easy', 'points': 100
            },
            {
                'id': 'db3', 'category_id': 'databases', 'question': 'What is a primary key in a database?',
                'options': '["The first column in a table", "A unique identifier for each row", "The most important data in a table", "A password for the database"]',
                'correct_answer': 1, 'explanation': 'A primary key uniquely identifies each row in a table and cannot contain NULL values or duplicates.',
                'difficulty': 'Medium', 'points': 150
            },
            {
                'id': 'db4', 'category_id': 'databases', 'question': 'What does ACID stand for in database transactions?',
                'options': '["Atomic, Consistent, Isolated, Durable", "Accurate, Complete, Integrated, Detailed", "Automated, Controlled, Independent, Direct", "Active, Continuous, Immediate, Dynamic"]',
                'correct_answer': 0, 'explanation': 'ACID properties ensure database transactions are processed reliably: Atomic, Consistent, Isolated, and Durable.',
                'difficulty': 'Hard', 'points': 200
            },
            {
                'id': 'db5', 'category_id': 'databases', 'question': 'Which type of JOIN returns only matching records from both tables?',
                'options': '["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN"]',
                'correct_answer': 2, 'explanation': 'INNER JOIN returns only rows that have matching values in both tables being joined.',
                'difficulty': 'Medium', 'points': 150
            }
        ]
        
        for q_data in questions_data:
            question = Question(**q_data)
            db.session.add(question)
        
        db.session.commit()
        print("Database initialized with sample data!")

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='127.0.0.1', port=5000) 