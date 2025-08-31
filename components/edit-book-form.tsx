"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface EditBookFormProps {
  bookId: string
}

export function EditBookForm({ bookId }: EditBookFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBook()
  }, [bookId])

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`)

      if (!response.ok) {
        throw new Error("Book not found")
      }

      const book = await response.json()

      setFormData({
        title: book?.title || "",
        author: book?.author || "",
        year: book?.year ? book.year.toString() : "",
      })
    } catch (error) {
      console.error("Error fetching book:", error)
      setError("Error loading book data. Please try again.")
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null) // Clear previous errors

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: Number.parseInt(formData.year),
        }),
      })

      if (response.ok) {
        router.push("/")
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`
        console.error("Error updating book:", errorMessage)
        setError(`Failed to update book: ${errorMessage}`)
      }
    } catch (error) {
      console.error("Error updating book:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter book title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium text-foreground">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="text-sm font-medium text-foreground">
            Publication Year *
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1000"
            max={new Date().getFullYear()}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter publication year"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Updating Book..." : "Update Book"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-input rounded-md text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
