"use client"

import { useState } from "react"
import { BookOpen, Calendar, Clock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/app/hooks/use-toast"

export default function DashboardPage() {
    const {toast} = useToast();
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "/placeholder.svg?height=450&width=300",
      borrowedDate: "2023-10-15",
      returnDate: "2023-11-15",
    },
    {
      id: 7,
      title: "Clean Code",
      author: "Robert C. Martin",
      coverImage: "/placeholder.svg?height=450&width=300",
      borrowedDate: "2023-10-20",
      returnDate: "2023-11-20",
    },
  ])

  const [history, setHistory] = useState([
    {
      id: 5,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "/placeholder.svg?height=450&width=300",
      borrowedDate: "2023-09-01",
      returnDate: "2023-10-01",
      returnedDate: "2023-09-28",
    },
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "/placeholder.svg?height=450&width=300",
      borrowedDate: "2023-08-15",
      returnDate: "2023-09-15",
      returnedDate: "2023-09-10",
    },
  ])

  const handleReturn = (bookId) => {
    // Find the book to return
    const bookToReturn = borrowedBooks.find((book) => book.id === bookId)

    if (bookToReturn) {
      // Remove from borrowed books
      setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId))

      // Add to history with returned date
      setHistory([
        {
          ...bookToReturn,
          returnedDate: new Date().toISOString().split("T")[0],
        },
        ...history,
      ])

      toast({
        title: "Book Returned",
        description: `You have successfully returned "${bookToReturn.title}"`,
      })
    }
  }

  // Calculate days remaining until return date
  const getDaysRemaining = (returnDate) => {
    const today = new Date()
    const return_date = new Date(returnDate)
    const diffTime = return_date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options as any)
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
            <Link href="/dashboard" className="text-sm font-medium text-primary underline underline-offset-4">
              My Books
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your borrowed books and view your borrowing history</p>
          </div>
          <Tabs defaultValue="borrowed" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="borrowed">Currently Borrowed</TabsTrigger>
              <TabsTrigger value="history">Borrowing History</TabsTrigger>
            </TabsList>
            <TabsContent value="borrowed" className="mt-6">
              {borrowedBooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">No books currently borrowed</h2>
                  <p className="text-muted-foreground mt-2">You don't have any books borrowed at the moment.</p>
                  <Button asChild className="mt-4">
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {borrowedBooks.map((book) => (
                    <Card key={book.id}>
                      <div className="flex flex-col">
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-[2/3] w-full overflow-hidden rounded-md mb-4">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Borrowed: {formatDate(book.borrowedDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Return by: {formatDate(book.returnDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{getDaysRemaining(book.returnDate)} days remaining</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button variant="outline" className="flex-1" asChild>
                            <Link href={`/books/${book.id}`}>View Details</Link>
                          </Button>
                          <Button className="flex-1" onClick={() => handleReturn(book.id)}>
                            Return
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">No borrowing history</h2>
                  <p className="text-muted-foreground mt-2">You haven't borrowed any books yet.</p>
                  <Button asChild className="mt-4">
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {history.map((book) => (
                    <Card key={book.id}>
                      <div className="flex flex-col">
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-[2/3] w-full overflow-hidden rounded-md mb-4">
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Borrowed: {formatDate(book.borrowedDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Returned: {formatDate(book.returnedDate)}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/books/${book.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
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

