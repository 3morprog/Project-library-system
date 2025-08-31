"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2, BookOpen } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  year: number
}

export function BooksList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books")
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteBook = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return

    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" })
      setBooks(books.filter((book) => book.id !== id))
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto" />
        <h3 className="text-xl font-medium text-foreground">No books found</h3>
        <p className="text-muted-foreground">Start building your library by adding your first book.</p>
        <Link
          href="/add-book"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Add Your First Book
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-card-foreground">Your Books ({books.length})</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Author</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Year</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="p-4 font-medium text-foreground">{book.title}</td>
                <td className="p-4 text-muted-foreground">{book.author}</td>
                <td className="p-4 text-muted-foreground">{book.year}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/edit-book/${book.id}`}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
