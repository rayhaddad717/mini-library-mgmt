import { BookTable } from "@/components/functionalities/BookTable";
import { BookInput } from "@/app/types/BookInput";
import Book from "@/models/Book";
import { connectToDatabase } from "@/lib/mongoose";

interface BookWithId extends BookInput {
  _id: string;
  copiesAvailable: number;
  isDeleted: boolean;
}

export default async function BookListPage() {
  await connectToDatabase();
  const books: BookWithId[] = await Book.find({ isDeleted: false }).lean() as any;
    const booksJSON = JSON.parse(JSON.stringify(books)) as any as BookWithId[];
  return (
    <div className="p-6">
      <BookTable books={booksJSON} />
    </div>
  );
}
