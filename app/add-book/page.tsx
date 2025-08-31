import { AddBookForm } from "@/components/add-book-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AddBookPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Add New Book</h1>
          <p className="text-muted-foreground">Fill in the details to add a book to your library</p>
        </div>

        <AddBookForm />
      </div>
    </div>
  )
}
