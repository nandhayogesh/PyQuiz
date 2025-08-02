export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  questions: Question[];
}

export const quizData: Record<string, Question[]> = {
  python: [
    {
      id: "py1",
      question: "Which of the following is the correct way to create a list in Python?",
      options: ["list = [1, 2, 3]", "list = (1, 2, 3)", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correctAnswer: 0,
      explanation: "Square brackets [] are used to create lists in Python. Parentheses create tuples, curly braces create sets or dictionaries.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "py2",
      question: "What will be the output of: print(type(5 / 2))?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
      correctAnswer: 1,
      explanation: "In Python 3, the / operator always returns a float, even when dividing integers. Use // for integer division.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "py3",
      question: "Which method is used to add an element to the end of a list?",
      options: ["add()", "append()", "insert()", "extend()"],
      correctAnswer: 1,
      explanation: "The append() method adds a single element to the end of a list. extend() adds multiple elements, insert() adds at a specific position.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "py4",
      question: "What is the correct syntax for a lambda function that returns x squared?",
      options: ["lambda x: x^2", "lambda x: x**2", "lambda x: x*x", "Both B and C"],
      correctAnswer: 3,
      explanation: "Both x**2 and x*x will square a number in Python. The ^ operator is XOR, not exponentiation.",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "py5",
      question: "What does the 'with' statement do in Python?",
      options: [
        "Creates a new variable scope",
        "Provides context management for resource handling",
        "Imports modules conditionally",
        "Creates a loop structure"
      ],
      correctAnswer: 1,
      explanation: "The 'with' statement provides context management, ensuring proper resource cleanup (like closing files) even if an exception occurs.",
      difficulty: "Medium",
      points: 150,
    },
  ],
  algorithms: [
    {
      id: "alg1",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step.",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "alg2",
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort has consistent O(n log n) time complexity in all cases. Quick Sort averages O(n log n) but can degrade to O(n²).",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "alg3",
      question: "What data structure is typically used for implementing recursion?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation: "The call stack is used to manage recursive function calls, storing local variables and return addresses.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "alg4",
      question: "In a max heap, what is the relationship between parent and child nodes?",
      options: [
        "Parent ≤ Children",
        "Parent ≥ Children", 
        "Parent = Children",
        "No specific relationship"
      ],
      correctAnswer: 1,
      explanation: "In a max heap, every parent node has a value greater than or equal to its children, ensuring the maximum value is at the root.",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "alg5",
      question: "What is the space complexity of merge sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Merge sort requires O(n) extra space for the temporary arrays used during the merging process.",
      difficulty: "Hard",
      points: 200,
    },
  ],
  web: [
    {
      id: "web1",
      question: "Which HTML element is used for the largest heading?",
      options: ["<h6>", "<h1>", "<header>", "<title>"],
      correctAnswer: 1,
      explanation: "The <h1> element represents the largest/most important heading in HTML, with <h6> being the smallest.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "web2",
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets", 
        "Creative Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: 1,
      explanation: "CSS stands for Cascading Style Sheets, referring to how styles cascade down through inheritance and specificity.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "web3",
      question: "Which JavaScript method is used to select an element by its ID?",
      options: [
        "getElement()",
        "selectElement()",
        "getElementById()",
        "findElement()"
      ],
      correctAnswer: 2,
      explanation: "document.getElementById() is the standard method to select a single element by its unique ID attribute.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "web4",
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "No difference",
        "== checks type, === doesn't",
        "=== checks type and value, == only checks value",
        "=== is for strings only"
      ],
      correctAnswer: 2,
      explanation: "=== performs strict equality checking both type and value, while == performs type coercion before comparing values.",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "web5",
      question: "Which CSS property is used to create space between elements?",
      options: ["padding", "margin", "border", "spacing"],
      correctAnswer: 1,
      explanation: "Margin creates space outside an element's border, while padding creates space inside the border.",
      difficulty: "Easy",
      points: 100,
    },
  ],
  databases: [
    {
      id: "db1",
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language", 
        "System Query Language"
      ],
      correctAnswer: 0,
      explanation: "SQL stands for Structured Query Language, used for managing and querying relational databases.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "db2",
      question: "Which SQL command is used to retrieve data from a database?",
      options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
      correctAnswer: 1,
      explanation: "SELECT is the SQL command used to query and retrieve data from database tables.",
      difficulty: "Easy",
      points: 100,
    },
    {
      id: "db3",
      question: "What is a primary key in a database?",
      options: [
        "The first column in a table",
        "A unique identifier for each row",
        "The most important data in a table",
        "A password for the database"
      ],
      correctAnswer: 1,
      explanation: "A primary key uniquely identifies each row in a table and cannot contain NULL values or duplicates.",
      difficulty: "Medium",
      points: 150,
    },
    {
      id: "db4",
      question: "What does ACID stand for in database transactions?",
      options: [
        "Atomic, Consistent, Isolated, Durable",
        "Accurate, Complete, Integrated, Detailed",
        "Automated, Controlled, Independent, Direct",
        "Active, Continuous, Immediate, Dynamic"
      ],
      correctAnswer: 0,
      explanation: "ACID properties ensure database transactions are processed reliably: Atomic, Consistent, Isolated, and Durable.",
      difficulty: "Hard",
      points: 200,
    },
    {
      id: "db5",
      question: "Which type of JOIN returns only matching records from both tables?",
      options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN"],
      correctAnswer: 2,
      explanation: "INNER JOIN returns only rows that have matching values in both tables being joined.",
      difficulty: "Medium",
      points: 150,
    },
  ],
};

export const getRandomQuestions = (categoryId: string, count: number = 10): Question[] => {
  const questions = quizData[categoryId] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
};