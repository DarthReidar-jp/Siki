import mongoose, { Document } from 'mongoose';

// ドキュメントインターフェースを定義
export interface IChat extends Document {
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const ChatSchema = new mongoose.Schema<IChat>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ミドルウェアでupdatedAtを更新
ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});


// モデルを作成
const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;