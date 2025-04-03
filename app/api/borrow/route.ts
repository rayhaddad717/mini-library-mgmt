// app/api/borrow/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BorrowController } from "@/controllers/BorrowController";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const controller = new BorrowController();
    const borrow = await controller.borrowBook({
      bookId: body.bookId,
      userId: body.userId,
      dueDate: body.dueDate,
    });

    return NextResponse.json(borrow, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to borrow book", error: (err as Error).message },
      { status: 400 }
    );
  }
};
