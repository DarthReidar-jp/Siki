import mongoose, { Document } from 'mongoose';

// ドキュメントインターフェースを定義 (オプション)
export interface IBook extends Document {
  title: string;
  content: string;
  vector: number[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const BookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  vector: { type: [Number], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BookSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// モデルを作成
const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;