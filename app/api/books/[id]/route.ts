// app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BookController } from "@/controllers/BookController";
import { BookInput } from "@/app/types/BookInput";



// GET /api/books/:id
export const GET = async (
    _request: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    try {
      const controller = new BookController();
      const book = await controller.getBookById(params.id);
  
      return NextResponse.json(book, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to fetch book", error: (err as Error).message },
        { status: 404 }
      );
    }
  };

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const bookId = params.id;
    const body = await request.json();

    const data: BookInput = {
      title: body.title,
      author: body.author,
      description: body.description,
      coverImageURL: body.coverImageURL,
      genre: body.genre,
      isbn: body.isbn,
      publishedYear: Number(body.publishedYear),
      totalCopies: Number(body.totalCopies),
    };

    const controller = new BookController();
    const updatedBook = await controller.updateBook(bookId, data);

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update book", error: (err as Error).message },
      { status: 410 }
    );
  }
};
export const DELETE = async (
    _req: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    try {
      const controller = new BookController();
      const deletedBook = await controller.softDeleteBook(params.id);
  
      return NextResponse.json(deletedBook, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to delete book", error: (err as Error).message },
        { status: 400 }
      );
    }
  };