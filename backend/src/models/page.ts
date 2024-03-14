import mongoose, { Document } from 'mongoose';

// ドキュメントインターフェースを定義
export interface IPage extends Document {
  userId: string;
  title: string;
  content: string; // 従来のコンテンツ全体を表すフィールド
  lines: string[]; // 追加: 各行を個別に格納する配列
  vector: number[]; // テキストのベクトル表現
  folderIds: string[];
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const PageSchema = new mongoose.Schema<IPage>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  lines: [{ type: String, default: [] }], // 追加: linesフィールド
  vector: { type: [Number], default: [] },
  folderIds: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PageSchema.index({ userId: 1, title: 1 }, { unique: true });

// ミドルウェアでupdatedAtを更新
PageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// モデルを作成
const Page = mongoose.model<IPage>('Page', PageSchema);

export default Page;