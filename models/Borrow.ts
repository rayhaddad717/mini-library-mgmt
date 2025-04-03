// models/Borrow.ts
import mongoose, { Document, Schema, Types, Model } from "mongoose";

export interface IBorrow extends Document {
  bookId: Types.ObjectId;
  userId?: Types.ObjectId; // optional for now
  type: "check-out" | "check-in";
  date: Date;
  dueDate?: Date;
  returnedDate?: Date;
}

const BorrowSchema = new Schema<IBorrow>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["check-out", "check-in"], required: true },
    date: { type: Date, required: true },
    dueDate: { type: Date },
    returnedDate: { type: Date },
  },
  { timestamps: true }
);

const Borrow: Model<IBorrow> =
  mongoose.models.Borrow || mongoose.model<IBorrow>("Borrow", BorrowSchema);

export default Borrow;
