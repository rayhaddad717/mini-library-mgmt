// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BookController } from "@/controllers/BookController";
import { BookInput } from "@/app/types/BookInput";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const data: BookInput = {
      title: body.title,
      author: body.author,
      description: body.description,
      coverImageURL:body.coverImageURL,
      genre: body.genre,
      isbn: body.isbn,
      publishedYear: Number(body.publishedYear),
      totalCopies: Number(body.totalCopies),
    };

    const controller = new BookController();
    const newBook = await controller.createBook(data);

    return NextResponse.json(newBook, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to add book", error: (err as Error).message },
      { status: 410 }
    );
  }
};
