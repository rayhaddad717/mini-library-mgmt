import { BookForm } from "@/components/functionalities/BookForm";

async function getBook(id: string) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`);

  if (!res.ok) throw new Error("Book not found");
  return res.json();
}

export default async function EditBookPage({ params }: { params: { id: string } }) {
 try {
   const book = await getBook(params.id);
   return (
     <div className="p-6">
       <h1 className="text-xl font-bold mb-4">Edit Book</h1>
       <BookForm initialData={book} bookId={params.id} />
     </div>
   );
 } catch (error) {
  console.error(error)
    return <h1>Error</h1>
 }

}
