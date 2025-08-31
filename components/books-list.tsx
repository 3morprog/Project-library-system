"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2, BookOpen, Plus } from "lucide-react"

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
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          <p className="text-muted-foreground font-medium">Loading your library...</p>
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="bg-card rounded-2xl border shadow-sm p-12 text-center space-y-6">
        <div className="p-6 bg-primary/5 rounded-full w-fit mx-auto">
          <BookOpen className="w-16 h-16 text-primary" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-foreground">Your library is empty</h3>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Start building your collection by adding your first book. Track titles, authors, and publication years.
          </p>
        </div>
        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Your First Book
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-8 border-b bg-gradient-to-r from-card to-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">Your Library</h2>
              <p className="text-muted-foreground">
                {books.length} {books.length === 1 ? "book" : "books"} in your collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-6 font-semibold text-foreground">Title</th>
              <th className="text-left p-6 font-semibold text-foreground">Author</th>
              <th className="text-left p-6 font-semibold text-foreground">Year</th>
              <th className="text-right p-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book.id}
                className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
              >
                <td className="p-6">
                  <div className="font-semibold text-foreground text-lg">{book.title}</div>
                </td>
                <td className="p-6 text-muted-foreground font-medium">{book.author}</td>
                <td className="p-6 text-muted-foreground font-medium">{book.year}</td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/edit-book/${book.id}`}
                      className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                      title="Edit book"
                    >
                      <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Link>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200 group"
                      title="Delete book"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
