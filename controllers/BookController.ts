// controllers/BookController.ts
import Book from "@/models/Book";
import { connectToDatabase } from "@/lib/mongoose";
import { BookInput } from "@/app/types/BookInput";

export class BookController {


    async getBookById(id: string) {
        await connectToDatabase();
      
        const book = await Book.findById(id);
        if (!book || book.isDeleted) {
          throw new Error("Book not found");
        }
      
        return book;
      }
      



  async createBook(data: BookInput) {
    await connectToDatabase();

    const {
      title,
      author,
      description,
      genre,
      isbn,
      publishedYear,
      totalCopies = 1,
    } = data;

    const book = new Book({
      title,
      author,
      description,
      genre,
      isbn,
      publishedYear,
      totalCopies,
      copiesAvailable: totalCopies,
    });

    const savedBook = await book.save();
    return savedBook;
  }
  async updateBook(id: string, data: BookInput) {
    await connectToDatabase();

    const updated = await Book.findByIdAndUpdate(
      id,
      {
        ...data,
        copiesAvailable: data.totalCopies ?? 1, // optional logic
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("Book not found");
    }

    return updated;
  }

  async softDeleteBook(id: string) {
    await connectToDatabase();

    const book = await Book.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!book) throw new Error("Book not found");

    return book;
  }
}
