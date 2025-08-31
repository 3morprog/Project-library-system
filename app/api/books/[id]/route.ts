import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/database"

// GET /api/books/[id] - Get a specific book
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    console.log("[v0] Fetching book with ID:", id)

    const book = db.getBookById(id)
    console.log("[v0] Book data from database:", book)

    if (!book) {
      console.log("[v0] Book not found in database")
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    console.log("[v0] Returning book data:", book)
    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
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

    const updatedBook = db.updateBook(id, title, author, Number.parseInt(year))

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

// DELETE /api/books/[id] - Delete a specific book
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const deleted = db.deleteBook(id)

    if (!deleted) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}
