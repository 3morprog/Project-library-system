import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/database"

// GET /api/books - Get all books
export async function GET() {
  try {
    console.log("[v0] API: Getting all books")
    const books = db.getAllBooks()
    console.log("[v0] API: Returning books:", books.length)
    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

// POST /api/books - Add a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, year } = body

    if (!title || !author || !year) {
      return NextResponse.json({ error: "Title, author, and year are required" }, { status: 400 })
    }

    const newBook = db.addBook(title, author, Number.parseInt(year))
    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Error adding book:", error)
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}
