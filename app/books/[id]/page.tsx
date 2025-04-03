"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Calendar, Hash, Layers } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/app/hooks/use-toast"

export default function BookDetailPage() {
  const params = useParams()
  const bookId = Number(params.id)
    const {toast} = useToast();
  // Find the book with the matching ID
  const book = books.find((book) => book.id === bookId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [returnDate, setReturnDate] = useState("")

  if (!book) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="text-muted-foreground">The book you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/books">Back to Books</Link>
        </Button>
      </div>
    )
  }

  const handleBorrow = () => {
    if (!returnDate) {
      toast({
        title: "Error",
        description: "Please select a return date",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: `You have borrowed "${book.title}" until ${returnDate}`,
    })

    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Bookify</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/books" className="text-sm font-medium hover:underline underline-offset-4">
              Browse
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              My Books
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="aspect-[2/3] overflow-hidden rounded-lg border">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {book.available ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Borrow Book</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Borrow Book</DialogTitle>
                      <DialogDescription>
                        You are about to borrow &quot;{book.title}&quot;. Please select a return date.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="return-date">Return Date</Label>
                        <Input
                          id="return-date"
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleBorrow}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button disabled className="w-full">
                  Currently Borrowed
                </Button>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
              </div>
              <Separator />
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{book.description}</p>
              </div>
              <Separator />
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Published Year</p>
                      <p className="text-sm text-muted-foreground">{book.publishedYear}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pages</p>
                      <p className="text-sm text-muted-foreground">{book.pages}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground capitalize">{book.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">ISBN</p>
                      <p className="text-sm text-muted-foreground">{book.isbn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2023 Bookify. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

// Mock data
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "fiction",
    available: true,
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    publishedYear: 2020,
    pages: 304,
    isbn: "9780525559474",
  },
  {
    id: 2,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "fiction",
    available: true,
    description:
      "From the Nobel Prize-winning author, a novel about an Artificial Friend who observes the world around her, learning the mysteries of human behavior.",
    publishedYear: 2021,
    pages: 320,
    isbn: "9780571364879",
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "science",
    available: false,
    description:
      "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
    publishedYear: 2021,
    pages: 496,
    isbn: "9780593135204",
  },
  {
    id: 4,
    title: "The Four Winds",
    author: "Kristin Hannah",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "fiction",
    available: true,
    description:
      "From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression.",
    publishedYear: 2021,
    pages: 464,
    isbn: "9781250178602",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "non-fiction",
    available: true,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
    publishedYear: 2018,
    pages: 320,
    isbn: "9780735211292",
  },
  {
    id: 6,
    title: "The Code Breaker",
    author: "Walter Isaacson",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "science",
    available: true,
    description:
      "The bestselling author of Leonardo da Vinci and Steve Jobs returns with a gripping account of how Nobel Prize winner Jennifer Doudna and her colleagues launched a revolution that will allow us to cure diseases, fend off viruses, and have healthier babies.",
    publishedYear: 2021,
    pages: 560,
    isbn: "9781982115852",
  },
  {
    id: 7,
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "technology",
    available: false,
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    publishedYear: 2008,
    pages: 464,
    isbn: "9780132350884",
  },
  {
    id: 8,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    coverImage: "/placeholder.svg?height=450&width=300",
    category: "technology",
    available: true,
    description:
      "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability.",
    publishedYear: 2017,
    pages: 616,
    isbn: "9781449373320",
  },
]

