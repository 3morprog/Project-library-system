import Link from "next/link"
import { BooksList } from "@/components/books-list"
import { BookOpen, Plus } from "lucide-react"

export default function LibraryHome() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground text-balance">Library Management System</h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    Organize and manage your book collection with ease
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/add-book"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <BooksList />
      </div>
    </div>
  )
}
