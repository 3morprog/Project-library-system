import Link from "next/link"
import { BooksList } from "@/components/books-list"

export default function LibraryHome() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Library Management System</h1>
            <p className="text-lg text-muted-foreground mt-2">Manage your book collection</p>
          </div>
          <Link
            href="/add-book"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Add New Book
          </Link>
        </div>

        {/* Books List */}
        <BooksList />
      </div>
    </div>
  )
}
