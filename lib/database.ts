import Database from "better-sqlite3"
import path from "path"

export interface Book {
  id: number
  title: string
  author: string
  year: number
}

class LibraryDatabase {
  private db: Database.Database

  constructor() {
    // Create database file in the project root
    const dbPath = path.join(process.cwd(), "library.db")
    this.db = new Database(dbPath)
    this.init()
  }

  private init() {
    // Create books table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER NOT NULL
      )
    `)

    // Check if table is empty and add sample data
    const count = this.db.prepare("SELECT COUNT(*) as count FROM books").get() as { count: number }

    if (count.count === 0) {
      const insert = this.db.prepare("INSERT INTO books (title, author, year) VALUES (?, ?, ?)")

      const sampleBooks = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
        { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
        { title: "1984", author: "George Orwell", year: 1949 },
        { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
      ]

      for (const book of sampleBooks) {
        insert.run(book.title, book.author, book.year)
      }
    }
  }

  getAllBooks(): Book[] {
    const stmt = this.db.prepare("SELECT * FROM books ORDER BY id DESC")
    return stmt.all() as Book[]
  }

  getBookById(id: number): Book | undefined {
    const stmt = this.db.prepare("SELECT * FROM books WHERE id = ?")
    return stmt.get(id) as Book | undefined
  }

  addBook(title: string, author: string, year: number): Book {
    const stmt = this.db.prepare("INSERT INTO books (title, author, year) VALUES (?, ?, ?)")
    const result = stmt.run(title, author, year)
    return {
      id: result.lastInsertRowid as number,
      title,
      author,
      year,
    }
  }

  updateBook(id: number, title: string, author: string, year: number): Book | null {
    const stmt = this.db.prepare("UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?")
    const result = stmt.run(title, author, year, id)

    if (result.changes === 0) {
      return null
    }

    return { id, title, author, year }
  }

  deleteBook(id: number): boolean {
    const stmt = this.db.prepare("DELETE FROM books WHERE id = ?")
    const result = stmt.run(id)
    return result.changes > 0
  }
}

// Create a singleton instance
const db = new LibraryDatabase()
export default db
