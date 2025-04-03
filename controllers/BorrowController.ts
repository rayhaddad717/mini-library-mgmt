// controllers/BorrowController.ts

import Book from "@/models/Book";
import { connectToDatabase } from "@/lib/mongoose";
import { Types } from "mongoose";
import Borrow from "@/models/Borrow";

interface BorrowRequest {
  bookId: string;
  userId?: string;
  dueDate?: string; // ISO string
}
interface ReturnRequest {
    bookId: string;
    userId?: string;
  }
export class BorrowController {
  async borrowBook({ bookId, userId, dueDate }: BorrowRequest) {
    await connectToDatabase();

    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (book.copiesAvailable <= 0) throw new Error("No copies available");

    // Create a borrow record
    const borrow = await Borrow.create({
      bookId: new Types.ObjectId(bookId),
      userId: userId ? new Types.ObjectId(userId) : undefined,
      type: "check-out",
      date: new Date(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    // Decrease available copies
    book.copiesAvailable -= 1;
    await book.save();

    return borrow;
  }
  async returnBook({ bookId, userId }: ReturnRequest) {
    await connectToDatabase();

    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    const returnTransaction = await Borrow.create({
      bookId: new Types.ObjectId(bookId),
      userId: userId ? new Types.ObjectId(userId) : undefined,
      type: "check-in",
      date: new Date(),
      returnedDate: new Date(),
    });

    book.copiesAvailable += 1;
    await book.save();

    return returnTransaction;
  }
}
