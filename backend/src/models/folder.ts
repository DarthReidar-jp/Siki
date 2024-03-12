import mongoose, { Document } from 'mongoose';

// フォルダードキュメントのインターフェース
export interface IFolder extends Document {
  name: string;
  description: string;
  pageIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const FolderSchema = new mongoose.Schema<IFolder>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  pageIds: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ミドルウェアでupdatedAtを更新
FolderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Folderモデルを作成
const Folder = mongoose.model<IFolder>('Folder', FolderSchema);

export default Folder;