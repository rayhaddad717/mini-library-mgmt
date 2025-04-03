// app/api/return/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BorrowController } from "@/controllers/BorrowController";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const controller = new BorrowController();
    const returnTxn = await controller.returnBook({
      bookId: body.bookId,
      userId: body.userId,
    });

    return NextResponse.json(returnTxn, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to return book", error: (err as Error).message },
      { status: 400 }
    );
  }
};
