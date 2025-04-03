// models/Book.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  coverImageURL?:string;
  genre?: string;
  isbn?: string;
  publishedYear?: number;
  totalCopies: number;
  copiesAvailable: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted:boolean;
}

const BookSchema: Schema<IBook> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    coverImageURL: String,
    genre: String,
    isbn: String,
    publishedYear: Number,
    totalCopies: { type: Number, default: 1 },
    copiesAvailable: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
