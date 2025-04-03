"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface BorrowItem {
  _id: string;
  type: "check-in" | "check-out";
  userId?: string;
  date: string;
  returnedDate?: string;
}

interface BookDetails {
  _id: string;
  title: string;
  author: string;
  description?: string;
  genre?: string;
  isbn?: string;
  publishedYear?: number;
  totalCopies: number;
  copiesAvailable: number;
}

export default function ViewBookPanel({
  book,
  borrows,
}: {
  book: BookDetails;
  borrows: BorrowItem[];
}) {
  const [borrowList, setBorrowList] = useState<BorrowItem[]>(borrows);

  const handleBorrow = async () => {
    const res = await fetch("/api/borrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: book._id }),
    });

    if (res.ok) {
      const newBorrow = await res.json();
      setBorrowList([newBorrow, ...borrowList]);
      toast.success("Book marked as borrowed");
    } else {
      const err = await res.json();
      toast.error(err.message || "Error borrowing book");
    }
  };

  const handleReturn = async () => {
    const res = await fetch("/api/return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: book._id }),
    });

    if (res.ok) {
      const newReturn = await res.json();
      setBorrowList([newReturn, ...borrowList]);
      toast.success("Book marked as returned");
    } else {
      const err = await res.json();
      toast.error(err.message || "Error returning book");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Available Copies:</strong> {book.copiesAvailable} / {book.totalCopies}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleBorrow}>Borrow</Button>
            <Button variant="outline" onClick={handleReturn}>Return</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Borrow History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowList.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.type}</TableCell>
                  <TableCell>{new Date(b.date).toLocaleString()}</TableCell>
                  <TableCell>{b.userId || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
