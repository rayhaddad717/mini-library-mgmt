import { BookForm } from "@/components/functionalities/BookForm";

export default function NewBookPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add New Book</h1>
      <BookForm />
    </div>
  );
}
