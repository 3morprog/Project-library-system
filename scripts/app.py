from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Database configuration
DATABASE = 'library.db'

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with books table"""
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            year_published INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert some sample data if table is empty
    count = conn.execute('SELECT COUNT(*) FROM books').fetchone()[0]
    if count == 0:
        sample_books = [
            ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
            ('To Kill a Mockingbird', 'Harper Lee', 1960),
            ('1984', 'George Orwell', 1949),
            ('Pride and Prejudice', 'Jane Austen', 1813),
            ('The Catcher in the Rye', 'J.D. Salinger', 1951)
        ]
        
        for title, author, year in sample_books:
            conn.execute(
                'INSERT INTO books (title, author, year_published) VALUES (?, ?, ?)',
                (title, author, year)
            )
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    """Home page - list all books"""
    conn = get_db_connection()
    books = conn.execute(
        'SELECT * FROM books ORDER BY title ASC'
    ).fetchall()
    conn.close()
    return render_template('index.html', books=books)

@app.route('/add', methods=['GET', 'POST'])
def add_book():
    """Add a new book"""
    if request.method == 'POST':
        title = request.form['title'].strip()
        author = request.form['author'].strip()
        year_published = request.form['year_published']
        
        # Validation
        if not title or not author or not year_published:
            flash('All fields are required!', 'error')
            return render_template('add_book.html')
        
        try:
            year_published = int(year_published)
            if year_published < 0 or year_published > datetime.now().year:
                flash('Please enter a valid year!', 'error')
                return render_template('add_book.html')
        except ValueError:
            flash('Year must be a number!', 'error')
            return render_template('add_book.html')
        
        # Insert into database
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO books (title, author, year_published) VALUES (?, ?, ?)',
            (title, author, year_published)
        )
        conn.commit()
        conn.close()
        
        flash('Book added successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('add_book.html')

@app.route('/edit/<int:book_id>', methods=['GET', 'POST'])
def edit_book(book_id):
    """Edit an existing book"""
    conn = get_db_connection()
    book = conn.execute('SELECT * FROM books WHERE id = ?', (book_id,)).fetchone()
    
    if not book:
        flash('Book not found!', 'error')
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        title = request.form['title'].strip()
        author = request.form['author'].strip()
        year_published = request.form['year_published']
        
        # Validation
        if not title or not author or not year_published:
            flash('All fields are required!', 'error')
            return render_template('edit_book.html', book=book)
        
        try:
            year_published = int(year_published)
            if year_published < 0 or year_published > datetime.now().year:
                flash('Please enter a valid year!', 'error')
                return render_template('edit_book.html', book=book)
        except ValueError:
            flash('Year must be a number!', 'error')
            return render_template('edit_book.html', book=book)
        
        # Update database
        conn.execute(
            'UPDATE books SET title = ?, author = ?, year_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            (title, author, year_published, book_id)
        )
        conn.commit()
        conn.close()
        
        flash('Book updated successfully!', 'success')
        return redirect(url_for('index'))
    
    conn.close()
    return render_template('edit_book.html', book=book)

@app.route('/delete/<int:book_id>', methods=['POST'])
def delete_book(book_id):
    """Delete a book"""
    conn = get_db_connection()
    book = conn.execute('SELECT * FROM books WHERE id = ?', (book_id,)).fetchone()
    
    if not book:
        flash('Book not found!', 'error')
    else:
        conn.execute('DELETE FROM books WHERE id = ?', (book_id,))
        conn.commit()
        flash('Book deleted successfully!', 'success')
    
    conn.close()
    return redirect(url_for('index'))

@app.route('/api/books')
def api_books():
    """API endpoint to get all books as JSON"""
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books ORDER BY title ASC').fetchall()
    conn.close()
    
    books_list = []
    for book in books:
        books_list.append({
            'id': book['id'],
            'title': book['title'],
            'author': book['author'],
            'year_published': book['year_published'],
            'created_at': book['created_at'],
            'updated_at': book['updated_at']
        })
    
    return jsonify(books_list)

if __name__ == '__main__':
    # Initialize database
    init_db()
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)
