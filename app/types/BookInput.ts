// types/BookInput.ts
export interface BookInput {
    title: string;
    author: string;
    description?: string;
    coverImageURL?: string;
    genre?: string;
    isbn?: string;
    publishedYear?: number;
    totalCopies?: number;
  }
  