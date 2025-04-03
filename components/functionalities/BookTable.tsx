"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookInput } from "@/app/types/BookInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface BookWithId extends BookInput {
  _id: string;
  copiesAvailable: number;
}

export function BookTable({ books }: { books: BookWithId[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl font-bold">Library</h1>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={() => router.push("/admin/books/new")}>+ New Book</Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Available Copies</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No books found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBooks.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.copiesAvailable}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/books/${book._id}/edit`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
