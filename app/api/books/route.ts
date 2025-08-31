import { type NextRequest, NextResponse } from "next/server"

// In-memory database for demo purposes
// In production, you would use a real database like SQLite, PostgreSQL, etc.
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
]

let nextId = 6

// GET /api/books - Get all books
export async function GET() {
  return NextResponse.json(books)
}

// POST /api/books - Add a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, year } = body

    if (!title || !author || !year) {
      return NextResponse.json({ error: "Title, author, and year are required" }, { status: 400 })
    }

    const newBook = {
      id: nextId++,
      title,
      author,
      year: Number.parseInt(year),
    }

    books.push(newBook)
    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
