import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BookFormMockup() {
  return (
    <Card className="max-w-2xl mx-auto bg-card border-border shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl font-semibold">Add New Book</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form className="space-y-6">
          {/* Two-column layout for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Book Title
              </Label>
              <Input
                id="title"
                placeholder="Enter book title"
                className="bg-input border-border focus:ring-ring rounded-lg"
                defaultValue="The Great Gatsby"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium text-foreground">
                Author
              </Label>
              <Input
                id="author"
                placeholder="Enter author name"
                className="bg-input border-border focus:ring-ring rounded-lg"
                defaultValue="F. Scott Fitzgerald"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium text-foreground">
                Year Published
              </Label>
              <Input
                id="year"
                type="number"
                placeholder="Enter publication year"
                className="bg-input border-border focus:ring-ring rounded-lg"
                defaultValue="1925"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium text-foreground">
                Genre
              </Label>
              <Input
                id="genre"
                placeholder="Enter book genre"
                className="bg-input border-border focus:ring-ring rounded-lg"
                defaultValue="Classic Literature"
              />
            </div>
          </div>

          {/* Success message mockup */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <p className="text-sm text-accent font-medium">✓ Book information looks good! Ready to save.</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-lg font-medium"
            >
              Save Book
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-2 rounded-lg font-medium bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
