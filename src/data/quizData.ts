export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  category: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  questions: Question[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: "python",
    name: "Python Programming",
    description: "Test your Python knowledge from basics to advanced concepts",
    difficulty: "Mixed",
    questions: [
      // Basic Python Questions
      {
        id: "py1",
        question: "What is the output of print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: 0,
        explanation: "The type() function returns the class type of an object. An empty list [] is of type 'list'.",
        difficulty: "Easy",
        points: 100,
        category: "python"
      },
      {
        id: "py2",
        question: "Which of the following is used to create a virtual environment in Python?",
        options: ["venv", "pip", "conda", "All of the above"],
        correctAnswer: 3,
        explanation: "venv, pip (with virtualenv), and conda can all be used to create virtual environments in Python.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py3",
        question: "What does the 'yield' keyword do in Python?",
        options: ["Returns a value", "Creates a generator", "Breaks a loop", "Defines a function"],
        correctAnswer: 1,
        explanation: "The 'yield' keyword is used to create generator functions that produce values lazily.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py4",
        question: "What is the correct way to create a comment in Python?",
        options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"],
        correctAnswer: 2,
        explanation: "In Python, comments start with the # symbol.",
        difficulty: "Easy",
        points: 100,
        category: "python"
      },
      {
        id: "py5",
        question: "Which of the following is NOT a valid variable name in Python?",
        options: ["_myvar", "my_var", "2myvar", "myVar"],
        correctAnswer: 2,
        explanation: "Variable names in Python cannot start with a number.",
        difficulty: "Easy",
        points: 100,
        category: "python"
      },
      {
        id: "py6",
        question: "What is the output of: print(3 * 'Python')?",
        options: ["PythonPythonPython", "9", "Python3", "Error"],
        correctAnswer: 0,
        explanation: "String multiplication in Python repeats the string the specified number of times.",
        difficulty: "Easy",
        points: 100,
        category: "python"
      },
      {
        id: "py7",
        question: "Which method is used to add an element to the end of a list?",
        options: ["add()", "append()", "insert()", "push()"],
        correctAnswer: 1,
        explanation: "The append() method adds an element to the end of a list.",
        difficulty: "Easy",
        points: 100,
        category: "python"
      },
      {
        id: "py8",
        question: "What is the difference between '==' and 'is' in Python?",
        options: ["No difference", "'==' compares values, 'is' compares identity", "'is' compares values, '==' compares identity", "Both compare identity"],
        correctAnswer: 1,
        explanation: "'==' compares values for equality, while 'is' compares object identity (whether they are the same object in memory).",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py9",
        question: "What is a lambda function in Python?",
        options: ["A named function", "An anonymous function", "A class method", "A built-in function"],
        correctAnswer: 1,
        explanation: "Lambda functions are anonymous functions that can be defined inline using the lambda keyword.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py10",
        question: "What is the output of: print(bool([]))?",
        options: ["True", "False", "[]", "Error"],
        correctAnswer: 1,
        explanation: "An empty list evaluates to False in a boolean context.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py11",
        question: "Which of the following is used to handle exceptions in Python?",
        options: ["try-catch", "try-except", "catch-throw", "handle-error"],
        correctAnswer: 1,
        explanation: "Python uses try-except blocks to handle exceptions.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py12",
        question: "What is the purpose of the __init__ method in Python classes?",
        options: ["To initialize class variables", "To create the class", "To initialize object instances", "To destroy objects"],
        correctAnswer: 2,
        explanation: "The __init__ method is the constructor that initializes object instances when they are created.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py13",
        question: "What does the 'self' parameter represent in Python class methods?",
        options: ["The class itself", "The instance of the class", "A static variable", "The parent class"],
        correctAnswer: 1,
        explanation: "'self' refers to the instance of the class and is used to access instance variables and methods.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py14",
        question: "What is list comprehension in Python?",
        options: ["A way to document lists", "A way to create lists using a concise syntax", "A method to compress lists", "A way to convert lists to strings"],
        correctAnswer: 1,
        explanation: "List comprehension provides a concise way to create lists based on existing lists or other iterables.",
        difficulty: "Medium",
        points: 200,
        category: "python"
      },
      {
        id: "py15",
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        options: ["A security feature", "A mechanism that prevents multiple threads from executing Python code simultaneously", "A file locking system", "A memory management tool"],
        correctAnswer: 1,
        explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py16",
        question: "What is a decorator in Python?",
        options: ["A design pattern", "A function that modifies another function", "A class inheritance feature", "A commenting system"],
        correctAnswer: 1,
        explanation: "Decorators are functions that modify or enhance other functions without changing their code.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py17",
        question: "What is the difference between a shallow copy and a deep copy?",
        options: ["No difference", "Shallow copy copies references, deep copy copies objects", "Deep copy is faster", "Shallow copy is more memory efficient"],
        correctAnswer: 1,
        explanation: "Shallow copy creates a new object but inserts references to objects in the original. Deep copy creates a new object and recursively copies all nested objects.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py18",
        question: "What is the purpose of the *args and **kwargs in Python functions?",
        options: ["To create mandatory parameters", "To handle variable number of arguments", "To create default values", "To handle errors"],
        correctAnswer: 1,
        explanation: "*args allows a function to accept any number of positional arguments, **kwargs allows any number of keyword arguments.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py19",
        question: "What is monkey patching in Python?",
        options: ["A debugging technique", "Dynamically modifying classes or modules at runtime", "A testing framework", "A code optimization method"],
        correctAnswer: 1,
        explanation: "Monkey patching is the practice of dynamically modifying classes or modules at runtime.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      },
      {
        id: "py20",
        question: "What is the difference between @staticmethod and @classmethod decorators?",
        options: ["No difference", "@staticmethod doesn't receive any implicit arguments, @classmethod receives the class as first argument", "@classmethod is faster", "@staticmethod is deprecated"],
        correctAnswer: 1,
        explanation: "@staticmethod doesn't receive any implicit first argument, while @classmethod receives the class (cls) as the first argument.",
        difficulty: "Hard",
        points: 300,
        category: "python"
      }
    ]
  },
  {
    id: "python-intermediate",
    name: "Python Intermediate",
    description: "Intermediate Python concepts including OOP, modules, and data structures",
    difficulty: "Intermediate",
    questions: [
      {
        id: "pyi1",
        question: "What is the output of: list(range(5))?",
        options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "Error"],
        correctAnswer: 1,
        explanation: "range(5) generates numbers from 0 to 4 (5 is excluded).",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi2",
        question: "What is the difference between a tuple and a list in Python?",
        options: ["No difference", "Tuples are immutable, lists are mutable", "Lists are faster", "Tuples can only store strings"],
        correctAnswer: 1,
        explanation: "Tuples are immutable (cannot be changed after creation) while lists are mutable.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi3",
        question: "What does the enumerate() function do?",
        options: ["Counts elements", "Returns index-value pairs", "Sorts a list", "Filters elements"],
        correctAnswer: 1,
        explanation: "enumerate() returns an iterator that produces tuples containing the index and value of each element.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi4",
        question: "What is the purpose of the zip() function?",
        options: ["Compresses files", "Combines multiple iterables", "Sorts data", "Filters data"],
        correctAnswer: 1,
        explanation: "zip() combines multiple iterables element-wise into tuples.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi5",
        question: "What is a dictionary comprehension?",
        options: ["A way to document dictionaries", "A concise way to create dictionaries", "A method to compress dictionaries", "A way to sort dictionaries"],
        correctAnswer: 1,
        explanation: "Dictionary comprehension provides a concise way to create dictionaries using a single line of code.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi6",
        question: "What is the difference between 'append()' and 'extend()' methods?",
        options: ["No difference", "append() adds one element, extend() adds multiple elements", "extend() is faster", "append() only works with strings"],
        correctAnswer: 1,
        explanation: "append() adds a single element to the end of a list, while extend() adds all elements from an iterable.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi7",
        question: "What is method overriding in Python?",
        options: ["Creating multiple methods with same name", "Redefining a method in a subclass", "Deleting a method", "Calling a method multiple times"],
        correctAnswer: 1,
        explanation: "Method overriding is redefining a method in a subclass that was already defined in the parent class.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi8",
        question: "What is the 'super()' function used for?",
        options: ["Creating superclasses", "Accessing parent class methods", "Making methods faster", "Creating global variables"],
        correctAnswer: 1,
        explanation: "super() is used to access methods and properties from the parent class.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi9",
        question: "What is a set in Python?",
        options: ["An ordered collection", "An unordered collection of unique elements", "A type of list", "A dictionary without values"],
        correctAnswer: 1,
        explanation: "A set is an unordered collection of unique elements.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi10",
        question: "What does the 'with' statement do in Python?",
        options: ["Creates loops", "Handles exceptions", "Manages context (resource management)", "Creates functions"],
        correctAnswer: 2,
        explanation: "The 'with' statement is used for context management, ensuring proper resource cleanup.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi11",
        question: "What is the difference between 'is' and '==' operators?",
        options: ["No difference", "'is' checks identity, '==' checks equality", "'==' is faster", "'is' only works with numbers"],
        correctAnswer: 1,
        explanation: "'is' checks if two variables refer to the same object, while '==' checks if values are equal.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi12",
        question: "What is a module in Python?",
        options: ["A type of function", "A file containing Python code", "A data structure", "A loop construct"],
        correctAnswer: 1,
        explanation: "A module is a file containing Python definitions and statements that can be imported and used.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi13",
        question: "What is the purpose of __name__ == '__main__'?",
        options: ["To create main functions", "To check if script is run directly", "To import modules", "To handle errors"],
        correctAnswer: 1,
        explanation: "This condition checks if the Python file is being run directly (not imported as a module).",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi14",
        question: "What is inheritance in Python?",
        options: ["Sharing variables", "A class acquiring properties from another class", "Copying code", "Creating multiple classes"],
        correctAnswer: 1,
        explanation: "Inheritance allows a class to acquire properties and methods from another class.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi15",
        question: "What is polymorphism in Python?",
        options: ["Having multiple forms", "Using same interface for different data types", "Creating multiple classes", "Inheriting from multiple classes"],
        correctAnswer: 1,
        explanation: "Polymorphism allows using the same interface for different underlying data types.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi16",
        question: "What is encapsulation in Python?",
        options: ["Hiding data", "Bundling data and methods together", "Creating capsules", "Compressing data"],
        correctAnswer: 1,
        explanation: "Encapsulation is bundling data and methods that work on that data within a single unit (class).",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi17",
        question: "What are magic methods in Python?",
        options: ["Methods that do magic", "Special methods with double underscores", "Very fast methods", "Methods that create objects"],
        correctAnswer: 1,
        explanation: "Magic methods (dunder methods) are special methods with double underscores that define object behavior.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi18",
        question: "What is the purpose of the __str__ method?",
        options: ["To create strings", "To define string representation of objects", "To concatenate strings", "To format strings"],
        correctAnswer: 1,
        explanation: "__str__ method defines how an object should be represented as a string for end users.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi19",
        question: "What is the difference between __str__ and __repr__?",
        options: ["No difference", "__str__ for users, __repr__ for developers", "__repr__ is faster", "__str__ only works with strings"],
        correctAnswer: 1,
        explanation: "__str__ is for end-user readable format, __repr__ is for developers and debugging.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      },
      {
        id: "pyi20",
        question: "What is a property in Python?",
        options: ["A variable", "A method that acts like an attribute", "A type of class", "A module"],
        correctAnswer: 1,
        explanation: "A property is a method that can be accessed like an attribute, providing controlled access to class attributes.",
        difficulty: "Medium",
        points: 200,
        category: "python-intermediate"
      }
    ]
  },
  {
    id: "python-hard",
    name: "Python Expert Level",
    description: "Advanced Python concepts for expert developers",
    difficulty: "Expert",
    questions: [
      {
        id: "pyh1",
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        options: ["A security feature", "A mechanism that prevents multiple threads from executing Python code simultaneously", "A file locking system", "A memory management tool"],
        correctAnswer: 1,
        explanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh2",
        question: "What is a decorator in Python?",
        options: ["A design pattern", "A function that modifies another function", "A class inheritance feature", "A commenting system"],
        correctAnswer: 1,
        explanation: "Decorators are functions that modify or enhance other functions without changing their code.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh3",
        question: "What is the difference between shallow copy and deep copy?",
        options: ["No difference", "Shallow copy copies references, deep copy copies objects", "Deep copy is faster", "Shallow copy is more memory efficient"],
        correctAnswer: 1,
        explanation: "Shallow copy creates a new object but inserts references to objects in the original. Deep copy creates a new object and recursively copies all nested objects.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh4",
        question: "What is monkey patching in Python?",
        options: ["A debugging technique", "Dynamically modifying classes or modules at runtime", "A testing framework", "A code optimization method"],
        correctAnswer: 1,
        explanation: "Monkey patching is the practice of dynamically modifying classes or modules at runtime.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh5",
        question: "What is the difference between @staticmethod and @classmethod?",
        options: ["No difference", "@staticmethod doesn't receive implicit arguments, @classmethod receives the class", "@classmethod is faster", "@staticmethod is deprecated"],
        correctAnswer: 1,
        explanation: "@staticmethod doesn't receive any implicit first argument, while @classmethod receives the class (cls) as the first argument.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh6",
        question: "What is a metaclass in Python?",
        options: ["A class that inherits from multiple classes", "A class whose instances are classes", "A class with meta information", "A class inside another class"],
        correctAnswer: 1,
        explanation: "A metaclass is a class whose instances are classes themselves. It defines how classes are created.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh7",
        question: "What is the purpose of __slots__ in Python?",
        options: ["To create time slots", "To restrict instance attributes and save memory", "To create method slots", "To schedule tasks"],
        correctAnswer: 1,
        explanation: "__slots__ restricts the instance attributes and can save memory by preventing the creation of __dict__.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh8",
        question: "What is a descriptor in Python?",
        options: ["A documentation string", "An object that defines attribute access", "A type of decorator", "A class method"],
        correctAnswer: 1,
        explanation: "A descriptor is an object that defines how attribute access is handled through __get__, __set__, and __delete__ methods.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh9",
        question: "What is the difference between __new__ and __init__?",
        options: ["No difference", "__new__ creates the instance, __init__ initializes it", "__init__ is faster", "__new__ only works with classes"],
        correctAnswer: 1,
        explanation: "__new__ is responsible for creating and returning a new instance, while __init__ initializes the instance.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh10",
        question: "What is a closure in Python?",
        options: ["A way to close files", "A function that captures variables from its enclosing scope", "A class method", "A loop construct"],
        correctAnswer: 1,
        explanation: "A closure is a function that captures and retains access to variables from its enclosing scope.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh11",
        question: "What is the purpose of the 'nonlocal' keyword?",
        options: ["To create global variables", "To access variables in the nearest enclosing scope", "To create local variables", "To import modules"],
        correctAnswer: 1,
        explanation: "'nonlocal' allows you to assign to variables in the nearest enclosing scope that is not global.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh12",
        question: "What is a generator expression?",
        options: ["A way to generate expressions", "A memory-efficient way to create iterators", "A mathematical expression", "A string formatting method"],
        correctAnswer: 1,
        explanation: "Generator expressions create iterators in a memory-efficient way, similar to list comprehensions but lazy.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh13",
        question: "What is the difference between 'yield' and 'return'?",
        options: ["No difference", "'yield' pauses function, 'return' ends it", "'return' is faster", "'yield' only works in classes"],
        correctAnswer: 1,
        explanation: "'yield' pauses the function and saves its state, while 'return' ends the function execution.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh14",
        question: "What is the purpose of the 'async' and 'await' keywords?",
        options: ["To create threads", "To define asynchronous functions and wait for coroutines", "To handle exceptions", "To create generators"],
        correctAnswer: 1,
        explanation: "'async' defines asynchronous functions (coroutines) and 'await' pauses execution until a coroutine completes.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh15",
        question: "What is a coroutine in Python?",
        options: ["A type of routine", "A function that can be paused and resumed", "A class method", "A loop construct"],
        correctAnswer: 1,
        explanation: "A coroutine is a function that can be paused and resumed, allowing for cooperative multitasking.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh16",
        question: "What is the purpose of the __call__ method?",
        options: ["To call functions", "To make objects callable like functions", "To create phone calls", "To handle exceptions"],
        correctAnswer: 1,
        explanation: "The __call__ method allows an object to be called like a function using parentheses.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh17",
        question: "What is method resolution order (MRO)?",
        options: ["The order methods are defined", "The order in which methods are looked up in inheritance", "The speed of method execution", "The order methods are called"],
        correctAnswer: 1,
        explanation: "MRO determines the order in which base classes are searched when looking up methods in inheritance hierarchies.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh18",
        question: "What is the purpose of the __enter__ and __exit__ methods?",
        options: ["To enter and exit functions", "To implement context managers", "To handle imports", "To create classes"],
        correctAnswer: 1,
        explanation: "__enter__ and __exit__ methods implement the context manager protocol for use with 'with' statements.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh19",
        question: "What is the difference between 'is' and '==' for small integers?",
        options: ["No difference", "Small integers are cached, so 'is' might work unexpectedly", "'==' doesn't work with integers", "'is' is faster"],
        correctAnswer: 1,
        explanation: "Python caches small integers (-5 to 256), so 'is' comparison might return True unexpectedly for these values.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh20",
        question: "What is a weak reference in Python?",
        options: ["A broken reference", "A reference that doesn't prevent garbage collection", "A slow reference", "A temporary reference"],
        correctAnswer: 1,
        explanation: "A weak reference allows you to refer to an object without preventing it from being garbage collected.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh21",
        question: "What is the purpose of the __getattr__ method?",
        options: ["To get all attributes", "To handle access to undefined attributes", "To create attributes", "To delete attributes"],
        correctAnswer: 1,
        explanation: "__getattr__ is called when an attribute lookup fails through normal means.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh22",
        question: "What is the difference between __getattr__ and __getattribute__?",
        options: ["No difference", "__getattribute__ is called for all attribute access, __getattr__ only for missing ones", "__getattr__ is faster", "__getattribute__ is deprecated"],
        correctAnswer: 1,
        explanation: "__getattribute__ is called for every attribute access, while __getattr__ is only called when the attribute is not found.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh23",
        question: "What is multiple inheritance in Python?",
        options: ["Inheriting multiple times", "A class inheriting from multiple base classes", "Creating multiple classes", "Inheriting from nested classes"],
        correctAnswer: 1,
        explanation: "Multiple inheritance allows a class to inherit from more than one base class.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh24",
        question: "What is the diamond problem in inheritance?",
        options: ["A geometric problem", "Ambiguity when a class inherits from multiple classes with a common base", "A performance issue", "A memory problem"],
        correctAnswer: 1,
        explanation: "The diamond problem occurs when a class inherits from multiple classes that share a common base class, causing ambiguity.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh25",
        question: "What is a mixin in Python?",
        options: ["A mixed data type", "A class designed to be mixed in with other classes", "A function that mixes data", "A type of inheritance"],
        correctAnswer: 1,
        explanation: "A mixin is a class that provides a certain functionality to be inherited by a subclass, but is not meant to stand alone.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh26",
        question: "What is the purpose of the __bool__ method?",
        options: ["To create boolean values", "To define truthiness of an object", "To convert to boolean", "To handle boolean operations"],
        correctAnswer: 1,
        explanation: "The __bool__ method defines how an object should be evaluated in a boolean context.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh27",
        question: "What is the difference between bound and unbound methods?",
        options: ["No difference", "Bound methods have an instance, unbound methods don't", "Unbound methods are faster", "Bound methods are deprecated"],
        correctAnswer: 1,
        explanation: "Bound methods are associated with an instance, while unbound methods (in Python 2) were not associated with any instance.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh28",
        question: "What is the purpose of the __hash__ method?",
        options: ["To create hash tables", "To make objects hashable for use as dictionary keys", "To encrypt data", "To generate random numbers"],
        correctAnswer: 1,
        explanation: "The __hash__ method makes objects hashable so they can be used as dictionary keys or in sets.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh29",
        question: "What is the relationship between __eq__ and __hash__?",
        options: ["No relationship", "Objects that compare equal must have the same hash value", "__eq__ is faster", "__hash__ includes __eq__"],
        correctAnswer: 1,
        explanation: "If two objects compare equal via __eq__, they must have the same hash value for proper dictionary/set behavior.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh30",
        question: "What is a namespace in Python?",
        options: ["A name for spaces", "A mapping from names to objects", "A type of class", "A module system"],
        correctAnswer: 1,
        explanation: "A namespace is a mapping from names to objects, providing a way to organize and access variables.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh31",
        question: "What is the LEGB rule in Python?",
        options: ["A coding standard", "The order of namespace lookup: Local, Enclosing, Global, Built-in", "A performance rule", "A naming convention"],
        correctAnswer: 1,
        explanation: "LEGB describes the order Python searches for variables: Local, Enclosing function, Global, Built-in.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh32",
        question: "What is the purpose of the 'global' keyword?",
        options: ["To create global functions", "To declare that a variable refers to the global scope", "To import global modules", "To create global classes"],
        correctAnswer: 1,
        explanation: "The 'global' keyword declares that a variable assignment should affect the global scope variable.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh33",
        question: "What is a first-class object in Python?",
        options: ["An expensive object", "An object that supports all operations generally available to other entities", "The first object created", "A high-priority object"],
        correctAnswer: 1,
        explanation: "First-class objects support all operations generally available to other entities like being passed as arguments, returned from functions, and assigned to variables.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh34",
        question: "What is the purpose of the __iter__ method?",
        options: ["To iterate numbers", "To make an object iterable", "To create loops", "To handle repetition"],
        correctAnswer: 1,
        explanation: "The __iter__ method makes an object iterable by returning an iterator object.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh35",
        question: "What is the difference between __iter__ and __next__?",
        options: ["No difference", "__iter__ returns an iterator, __next__ returns the next item", "__next__ is faster", "__iter__ is deprecated"],
        correctAnswer: 1,
        explanation: "__iter__ returns an iterator object, while __next__ returns the next item from the iterator.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh36",
        question: "What is the StopIteration exception?",
        options: ["An error that stops programs", "An exception raised when an iterator is exhausted", "A performance exception", "A syntax error"],
        correctAnswer: 1,
        explanation: "StopIteration is raised by iterators to signal that there are no more items to return.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh37",
        question: "What is the purpose of the functools module?",
        options: ["To create functions", "To provide utilities for working with functions and callable objects", "To optimize functions", "To document functions"],
        correctAnswer: 1,
        explanation: "The functools module provides utilities for working with higher-order functions and operations on callable objects.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh38",
        question: "What is partial function application?",
        options: ["An incomplete function", "Creating a new function by fixing some arguments of an existing function", "A broken function", "A function that returns parts"],
        correctAnswer: 1,
        explanation: "Partial function application creates a new function by fixing some arguments of an existing function.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh39",
        question: "What is the purpose of the @wraps decorator?",
        options: ["To wrap gifts", "To preserve metadata when creating decorators", "To wrap exceptions", "To create wrapper classes"],
        correctAnswer: 1,
        explanation: "@wraps preserves the original function's metadata (like __name__ and __doc__) when creating decorators.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh40",
        question: "What is the difference between 'and' and '&' operators?",
        options: ["No difference", "'and' is logical, '&' is bitwise", "'&' is faster", "'and' only works with booleans"],
        correctAnswer: 1,
        explanation: "'and' performs logical AND operation with short-circuiting, while '&' performs bitwise AND operation.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh41",
        question: "What is operator overloading in Python?",
        options: ["Using too many operators", "Defining custom behavior for operators in user-defined classes", "A performance issue", "An error condition"],
        correctAnswer: 1,
        explanation: "Operator overloading allows defining custom behavior for operators (like +, -, *) in user-defined classes.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh42",
        question: "What is the purpose of the __len__ method?",
        options: ["To create lengths", "To define the length of an object", "To measure strings", "To count items"],
        correctAnswer: 1,
        explanation: "The __len__ method defines what len() returns for an object.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh43",
        question: "What is the difference between __getitem__ and __setitem__?",
        options: ["No difference", "__getitem__ retrieves items, __setitem__ sets items", "__setitem__ is faster", "__getitem__ is deprecated"],
        correctAnswer: 1,
        explanation: "__getitem__ defines behavior for retrieving items using [], while __setitem__ defines behavior for setting items.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh44",
        question: "What is duck typing in Python?",
        options: ["A type of duck", "If it walks like a duck and quacks like a duck, it's a duck", "A performance optimization", "A debugging technique"],
        correctAnswer: 1,
        explanation: "Duck typing means that the type or class of an object is less important than the methods it defines.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh45",
        question: "What is the purpose of type hints in Python?",
        options: ["To enforce types", "To provide static type checking and documentation", "To improve performance", "To handle errors"],
        correctAnswer: 1,
        explanation: "Type hints provide static type information for better code documentation and tooling support.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh46",
        question: "What is the typing module used for?",
        options: ["For typing text", "For providing type hints and generic types", "For keyboard input", "For string manipulation"],
        correctAnswer: 1,
        explanation: "The typing module provides support for type hints including generic types, unions, and more complex type annotations.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh47",
        question: "What is a generic type in Python typing?",
        options: ["A general type", "A type that can be parameterized with other types", "A basic type", "A common type"],
        correctAnswer: 1,
        explanation: "Generic types are types that can be parameterized with other types, like List[int] or Dict[str, int].",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh48",
        question: "What is the purpose of Union types?",
        options: ["To unite types", "To specify that a value can be one of several types", "To merge types", "To create type unions"],
        correctAnswer: 1,
        explanation: "Union types specify that a value can be one of several types, like Union[int, str].",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh49",
        question: "What is the difference between Optional[T] and Union[T, None]?",
        options: ["Completely different", "Optional[T] is shorthand for Union[T, None]", "Optional is faster", "Union is deprecated"],
        correctAnswer: 1,
        explanation: "Optional[T] is exactly equivalent to Union[T, None], just a more convenient way to write it.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      },
      {
        id: "pyh50",
        question: "What is the purpose of Protocol in Python typing?",
        options: ["For network protocols", "For structural subtyping (duck typing)", "For communication", "For security protocols"],
        correctAnswer: 1,
        explanation: "Protocol defines structural subtyping, allowing you to specify that a type must have certain methods/attributes.",
        difficulty: "Hard",
        points: 300,
        category: "python-hard"
      }
    ]
  }
];