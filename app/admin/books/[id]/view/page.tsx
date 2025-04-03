import { connectToDatabase } from "@/lib/mongoose";
import Book from "@/models/Book";
import Borrow from "@/models/Borrow";
import ViewBookPanel from "@/components/functionalities/ViewBookPanel";

export default async function ViewBookPage({ params }: { params: { id: string } }) {
  await connectToDatabase();

  const book = await Book.findById(params.id).lean();
  if (!book || book.isDeleted) throw new Error("Book not found");

  const borrows = await Borrow.find({ bookId: book._id }).sort({ date: -1 }).lean();

  return (
    <div className="p-6">
      <ViewBookPanel book={JSON.parse(JSON.stringify(book))} borrows={borrows} />
    </div>
  );
}