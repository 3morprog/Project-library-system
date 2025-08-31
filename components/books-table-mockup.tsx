import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Classic Literature",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian Fiction",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Coming-of-age",
  },
]

export function BooksTableMockup() {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Library Books Collection</CardTitle>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {mockBooks.length} Books
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-muted-foreground">Title</th>
                <th className="text-left p-4 font-semibold text-muted-foreground">Author</th>
                <th className="text-left p-4 font-semibold text-muted-foreground">Year</th>
                <th className="text-left p-4 font-semibold text-muted-foreground">Genre</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? "bg-background" : "bg-card/50"
                  }`}
                >
                  <td className="p-4">
                    <div className="font-medium text-foreground">{book.title}</div>
                  </td>
                  <td className="p-4 text-foreground">{book.author}</td>
                  <td className="p-4 text-muted-foreground">{book.year}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-xs">
                      {book.genre}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 text-xs rounded"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 text-xs rounded"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination mockup */}
        <div className="flex justify-between items-center p-4 bg-muted/30 border-t border-border">
          <div className="text-sm text-muted-foreground">Showing 1-5 of 5 books</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled className="px-3 py-1 text-xs bg-transparent">
              Previous
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground px-3 py-1 text-xs">
              1
            </Button>
            <Button size="sm" variant="outline" disabled className="px-3 py-1 text-xs bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
