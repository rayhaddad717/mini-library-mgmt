"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")

  // Filter books based on search query, category, and availability
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory

    const matchesAvailability =
      selectedAvailability === "all" ||
      (selectedAvailability === "available" && book.available) ||
      (selectedAvailability === "borrowed" && !book.available)

    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Bookify</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/books" className="text-sm font-medium text-primary underline underline-offset-4">
              Browse
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              My Books
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Browse Books</h1>
            <p className="text-muted-foreground">Search and filter through our collection of books</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title or author..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="borrowed">Borrowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredBooks.length}</strong> of <strong>{books.length}</strong> books
              </p>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="group relative overflow-hidden rounded-lg border bg-background hover:border-primary"
                  >
                    <div className="aspect-[2/3] overflow-hidden">
                      <img
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`text-xs ${book.available ? "text-green-500" : "text-red-500"}`}>
                          {book.available ? "Available" : "Borrowed"}
                        </span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="mt-6">
              <div className="flex flex-col gap-4">
                {filteredBooks.map((book) => (
                  <Card key={book.id}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-[120px] p-2">
                        <div className="aspect-[2/3] overflow-hidden rounded-md">
                          <img
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <CardHeader>
                          <CardTitle>{book.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Author:</span>
                              <span className="text-sm text-muted-foreground">{book.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Category:</span>
                              <span className="text-sm text-muted-foreground capitalize">{book.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Status:</span>
                              <span className={`text-sm ${book.available ? "text-green-500" : "text-red-500"}`}>
                                {book.available ? "Available" : "Borrowed"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline">
                            <Link href={`/books/${book.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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

