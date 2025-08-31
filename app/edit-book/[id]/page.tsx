import { EditBookForm } from "@/components/edit-book-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface EditBookPageProps {
  params: {
    id: string
  }
}

export default function EditBookPage({ params }: EditBookPageProps) {
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
          <h1 className="text-3xl font-bold text-foreground">Edit Book</h1>
          <p className="text-muted-foreground">Update the book details</p>
        </div>

        <EditBookForm bookId={params.id} />
      </div>
    </div>
  )
}
