"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookInput } from "@/app/types/BookInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().optional(),
  coverImageURL: z.string().optional(),
  genre: z.string().optional(),
  isbn: z.string().optional(),
  publishedYear: z.coerce.number().optional(),
  totalCopies: z.coerce.number().min(1),
});

type BookSchema = z.infer<typeof bookSchema>;

export function BookForm({
  initialData,
  bookId,
}: {
  initialData?: Partial<BookInput>;
  bookId?: string;
}) {
  const router = useRouter();
  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      description: initialData?.description || "",
      coverImageURL: initialData?.coverImageURL || "",

      genre: initialData?.genre || "",
      isbn: initialData?.isbn || "",
      publishedYear: initialData?.publishedYear || undefined,
      totalCopies: initialData?.totalCopies || 1,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BookSchema) => {
    setLoading(true);
    try {
      const method = bookId ? "PATCH" : "POST";
      const url = bookId ? `/api/books/${bookId}` : "/api/books";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save book");

      router.refresh();
      router.push("/admin/books");
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto"
      >
        {["title", "author","coverImageURL", "description", "genre", "isbn", "publishedYear", "totalCopies"].map(
          (field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof BookSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <Button type="submit" disabled={loading}>
          {bookId ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </Form>
  );
}
