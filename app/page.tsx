import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Your Next Favorite Book
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Search our vast collection of books and borrow them with just a few clicks.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex w-full max-w-md items-center space-x-2">
                  <Input type="search" placeholder="Search books by title, author, or genre..." className="flex-1" />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Categories</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our most popular book categories
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/books?category=${category.slug}`}
                    className="group relative overflow-hidden rounded-lg border bg-background p-2 hover:border-primary"
                  >
                    <div className="flex h-[180px] items-center justify-center rounded-md bg-muted p-4">
                      <category.icon className="h-12 w-12 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="pt-2 text-center">
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} books</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recently Added</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Check out the latest additions to our library
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recentBooks.map((book) => (
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
              <Button asChild variant="outline" className="mt-4">
                <Link href="/books">View All Books</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 Bookify. All rights reserved.
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
const categories = [
  {
    id: 1,
    name: "Fiction",
    slug: "fiction",
    count: 245,
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Non-Fiction",
    slug: "non-fiction",
    count: 156,
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Science",
    slug: "science",
    count: 98,
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4.5 3h15" />
        <path d="M4.5 9h15" />
        <path d="M4.5 15h15" />
        <path d="M4.5 21h15" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Technology",
    slug: "technology",
    count: 67,
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
]

const recentBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "/placeholder.svg?height=450&width=300",
    available: true,
  },
  {
    id: 2,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImage: "/placeholder.svg?height=450&width=300",
    available: true,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "/placeholder.svg?height=450&width=300",
    available: false,
  },
  {
    id: 4,
    title: "The Four Winds",
    author: "Kristin Hannah",
    coverImage: "/placeholder.svg?height=450&width=300",
    available: true,
  },
]

