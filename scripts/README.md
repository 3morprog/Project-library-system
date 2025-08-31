# Library Management System

A simple library management system built with Flask and SQLite.

## Features

- **Add Books**: Add new books with title, author, and publication year
- **View Books**: Display all books in a clean, organized table
- **Edit Books**: Update book information
- **Delete Books**: Remove books from the library
- **Search & Filter**: Easy navigation and book management
- **Responsive Design**: Works on desktop and mobile devices

## Requirements

- Python 3.7+
- Flask
- SQLite (included with Python)

## Installation & Setup

1. **Install Python dependencies:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. **Run the application:**
   \`\`\`bash
   python app.py
   \`\`\`

3. **Open your browser and visit:**
   \`\`\`
   http://localhost:5000
   \`\`\`

## Database

The application uses SQLite database (`library.db`) which will be created automatically when you first run the app. The database includes:

- **books table**: Stores book information (id, title, author, year_published, created_at, updated_at)
- **Sample data**: 5 classic books are added automatically for testing

## API Endpoints

- `GET /` - Home page with all books
- `GET /add` - Add book form
- `POST /add` - Create new book
- `GET /edit/<id>` - Edit book form
- `POST /edit/<id>` - Update book
- `POST /delete/<id>` - Delete book
- `GET /api/books` - JSON API for all books

## File Structure

\`\`\`
library-system/
├── app.py              # Main Flask application
├── library.db          # SQLite database (auto-created)
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   ├── base.html      # Base template
│   ├── index.html     # Home page
│   ├── add_book.html  # Add book form
│   └── edit_book.html # Edit book form
└── README.md          # This file
\`\`\`

## Usage

1. **View Books**: The home page shows all books in your library
2. **Add Book**: Click "Add New Book" to add a book with title, author, and year
3. **Edit Book**: Click the "Edit" button next to any book to modify its details
4. **Delete Book**: Click the "Delete" button and confirm to remove a book

## Development

To run in development mode with debug enabled:

\`\`\`bash
python app.py
\`\`\`

The application will reload automatically when you make changes to the code.

## Production Deployment

For production deployment:

1. Change the `secret_key` in `app.py`
2. Set `debug=False`
3. Use a production WSGI server like Gunicorn
4. Consider using PostgreSQL instead of SQLite for better performance

## License

This project is open source and available under the MIT License.
