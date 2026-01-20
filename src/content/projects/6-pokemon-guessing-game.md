---
title: "Pokémon Guessing Game"
description: "AI-powered web game using decision tree algorithms and statistical analysis to guess Pokémon through optimized question selection."
publishDate: "2022-06-15"
tags: ["Python", "Machine Learning", "SQLite", "Flask", "Data Science", "Algorithm Design"]
link: "https://gitlab.com/"
linkText: "View on GitLab"
featured: false
visibility: public
githubStars: 8
downloads: 450
---

## Overview

**Pokémon Guessing Game** is an intelligent web-based application that uses decision tree algorithms and statistical analysis to identify which Pokémon a user is thinking of through strategic questioning. Inspired by Akinator, this project demonstrates practical applications of information theory, database optimization, and algorithmic decision-making.

Built as an academic project at Université Clermont Auvergne, the system analyzes a database of 251 Pokémon (Generations 1-2) using entropy-based question selection to minimize the average number of questions needed for identification.

## Technical Architecture

### Core Algorithm: Information Gain Maximization

The decision engine implements a **greedy algorithm** that selects questions based on maximum information gain:

```python
def select_best_question(remaining_pokemon, attributes):
    """
    Selects attribute that best splits the dataset
    Target: proportion closest to 0.5 for balanced elimination
    """
    best_score = float('inf')
    best_attribute = None
    
    for attribute in attributes:
        proportion = calculate_proportion(remaining_pokemon, attribute)
        # Distance from perfect 50/50 split
        score = abs(0.5 - proportion)
        
        if score < best_score:
            best_score = score
            best_attribute = attribute
    
    return best_attribute
```

**Algorithm Complexity**:
- **Time Complexity**: O(n × m) where n = remaining Pokémon, m = attributes
- **Space Complexity**: O(n) for filtered dataset storage
- **Average Questions**: 6-10 questions (log₂(251) ≈ 8 theoretical minimum)

### Database Schema & Design

**SQLite Database** with normalized structure:

| Column            | Type        | Constraint  | Description            |
| ----------------- | ----------- | ----------- | ---------------------- |
| `id`              | INTEGER     | PRIMARY KEY | Pokédex number (1-251) |
| `name`            | TEXT        | NOT NULL    | Pokémon identifier     |
| `is_legendary`    | BOOLEAN     | NOT NULL    | Legendary status       |
| `has_evolution`   | BOOLEAN     | NOT NULL    | Evolution capability   |
| `primary_color`   | VARCHAR(20) | NOT NULL    | Dominant color         |
| `type_primary`    | VARCHAR(20) | NOT NULL    | Main type (18 types)   |
| `type_secondary`  | VARCHAR(20) | NULLABLE    | Secondary type         |
| `size_category`   | VARCHAR(10) | NOT NULL    | Small/Medium/Large     |
| `weight_category` | VARCHAR(10) | NOT NULL    | Light/Common/Heavy     |
| `bipedal`         | BOOLEAN     | NOT NULL    | Two-legged stance      |
| `can_fly`         | BOOLEAN     | NOT NULL    | Flying capability      |
| `has_tail`        | BOOLEAN     | NOT NULL    | Tail presence          |

**Data Preprocessing**:
```python
# Continuous variable categorization
def categorize_size(height_meters):
    if height_meters < 1.0:
        return 'Small'
    elif height_meters <= 2.0:
        return 'Medium'
    else:
        return 'Large'

def categorize_weight(weight_kg):
    if weight_kg < 30:
        return 'Light'
    elif weight_kg <= 90:
        return 'Common'
    else:
        return 'Heavy'
```

## Implementation Details

### Technology Stack

**Backend**:
- **Python 3.9+** - Core application logic
- **pandas 1.3+** - Data manipulation and analysis
- **numpy 1.21+** - Statistical calculations
- **SQLite3** - Embedded database engine
- **Flask 2.0+** - Web framework for API and routing

**Frontend**:
- **HTML5** - Semantic markup structure
- **CSS3** - Responsive styling with Flexbox
- **JavaScript (ES6)** - Asynchronous API communication
- **Fetch API** - AJAX requests for dynamic updates

**Development Tools**:
- **Git** - Version control
- **pytest** - Unit testing framework
- **Black** - Code formatting
- **pylint** - Code quality analysis

### Statistical Analysis Engine

**Three-Tier Data Processing**:

1. **Binary Variables** (Legendary, Evolution, Bipedal, Flies, Tail):
```python
def analyze_binary(dataframe, column):
    """Direct proportion calculation"""
    return dataframe[column].sum() / len(dataframe)
```

2. **Categorical Variables** (Color, Types):
```python
def analyze_categorical(dataframe, column):
    """Frequency distribution analysis"""
    value_counts = dataframe[column].value_counts()
    return value_counts / len(dataframe)
```

3. **Continuous Variables** (Size, Weight):
```python
def analyze_continuous(dataframe, column, bins):
    """Histogram-based categorization"""
    categorized = pd.cut(dataframe[column], bins=bins, labels=['Low', 'Mid', 'High'])
    return categorized.value_counts() / len(dataframe)
```

### Web Application Architecture

**Flask-based RESTful API**:

```python
from flask import Flask, request, jsonify, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'your-secret-key'

@app.route('/api/start', methods=['POST'])
def start_game():
    """Initialize new game session"""
    session['remaining_pokemon'] = get_all_pokemon()
    session['question_count'] = 0
    return jsonify({'status': 'started'})

@app.route('/api/question', methods=['GET'])
def get_question():
    """Return next optimal question"""
    remaining = session.get('remaining_pokemon')
    attribute = select_best_question(remaining)
    question = generate_question(attribute)
    return jsonify({'question': question, 'attribute': attribute})

@app.route('/api/answer', methods=['POST'])
def process_answer():
    """Filter database based on answer"""
    answer = request.json.get('answer')
    attribute = request.json.get('attribute')
    
    remaining = filter_pokemon(session['remaining_pokemon'], attribute, answer)
    session['remaining_pokemon'] = remaining
    session['question_count'] += 1
    
    if len(remaining) == 1:
        return jsonify({'result': remaining[0], 'questions': session['question_count']})
    else:
        return jsonify({'continue': True, 'remaining': len(remaining)})
```

**Session Management**:
- Server-side session storage using Flask-Session
- Secure cookie-based session IDs
- Automatic cleanup after game completion

## Key Features

### 🎯 **Optimal Question Selection**
Uses information gain calculation to select questions that maximize dataset partitioning, ensuring minimal questions needed.

### 📊 **Statistical Data Analysis**
Employs pandas and numpy for efficient data manipulation and statistical computations on Pokémon attributes.

### 🔄 **Dynamic Database Filtering**
Real-time SQL query generation based on user responses, progressively narrowing the search space.

### 🌐 **RESTful API Design**
Clean separation between frontend and backend with JSON-based communication for scalability.

### ⚡ **Performance Optimization**
- Database indexing on frequently queried columns
- Memoization of statistical calculations
- Lazy loading of Pokémon data

## Algorithm Performance

**Benchmark Results** (251 Pokémon dataset):

| Metric              | Value        |
| ------------------- | ------------ |
| Average Questions   | 7.3          |
| Worst Case          | 12 questions |
| Best Case           | 4 questions  |
| Database Query Time | <10ms        |
| Question Generation | <5ms         |
| Total Response Time | <50ms        |

**Optimization Techniques**:
- Pre-computed statistical distributions
- Indexed database queries
- Cached question templates
- Efficient data structures (sets for filtering)

## Project Structure

```
pokemon-guessing-game/
├── app/
│   ├── __init__.py
│   ├── routes.py              # Flask routes
│   ├── algorithm.py           # Decision tree logic
│   ├── database.py            # SQLite operations
│   └── statistics.py          # Statistical analysis
├── data/
│   └── pokemon.db             # SQLite database
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── game.js            # Frontend logic
├── templates/
│   ├── index.html
│   └── game.html
├── tests/
│   ├── test_algorithm.py
│   └── test_database.py
├── requirements.txt
├── config.py
└── run.py                     # Application entry point
```

## What I Learned

### **Algorithm Design & Analysis**
- Implementing greedy algorithms for optimization problems
- Analyzing time/space complexity
- Understanding information theory and entropy

### **Data Science Techniques**
- Statistical analysis with pandas/numpy
- Data preprocessing and categorization
- Feature engineering for decision trees

### **Web Development**
- Building RESTful APIs with Flask
- Session management and state handling
- Asynchronous frontend-backend communication

### **Software Engineering**
- Test-driven development with pytest
- Code organization and modularity
- Database design and normalization

## Challenges & Solutions

### Challenge 1: Continuous Variable Handling
**Problem**: Height (0.3m - 14.5m) and weight (0.1kg - 999kg) are continuous with wide ranges.

**Solution**: Applied domain knowledge to create meaningful categories:
- Size: Based on human comparison (< 1m, 1-2m, > 2m)
- Weight: Based on carrying capacity (< 30kg, 30-90kg, > 90kg)

### Challenge 2: Optimal Question Selection
**Problem**: Random attribute selection led to 15+ questions on average.

**Solution**: Implemented information gain algorithm targeting 50/50 splits, reducing average to 7.3 questions.

### Challenge 3: Web Integration
**Problem**: Initial CGI approach had performance issues and limited scalability.

**Solution**: Migrated to Flask framework with proper session management and RESTful API design.

## Technologies Demonstrated

This project showcases proficiency in:

- **Algorithm Design** - Decision trees, greedy algorithms, optimization
- **Data Science** - Statistical analysis, data preprocessing, pandas/numpy
- **Web Development** - Flask, RESTful APIs, session management
- **Database Management** - SQLite, query optimization, schema design
- **Software Engineering** - Testing, code organization, documentation

## License

Academic Project - MIT License

---

**Academic Context**: Université Clermont Auvergne | **Year**: 2021-2022 | **Course**: Database & Algorithm Design
