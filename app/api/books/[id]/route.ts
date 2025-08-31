import { type NextRequest, NextResponse } from "next/server"

// In-memory database for demo purposes
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
]

// GET /api/books/[id] - Get a specific book
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const book = books.find((b) => b.id === id)

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

// PUT /api/books/[id] - Update a specific book
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { title, author, year } = body

    if (!title || !author || !year) {
      return NextResponse.json({ error: "Title, author, and year are required" }, { status: 400 })
    }

    const bookIndex = books.findIndex((b) => b.id === id)

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    books[bookIndex] = {
      id,
      title,
      author,
      year: Number.parseInt(year),
    }

    return NextResponse.json(books[bookIndex])
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/books/[id] - Delete a specific book
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const bookIndex = books.findIndex((b) => b.id === id)

  if (bookIndex === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  books.splice(bookIndex, 1)
  return NextResponse.json({ message: "Book deleted successfully" })
}
