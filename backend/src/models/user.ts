import mongoose, { Document } from 'mongoose';

// ユーザードキュメントのインターフェース
export interface IUser extends Document {
  email: string;
  name: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  googleId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 残りのコードは省略

// インデックスを作成
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ googleId: 1 }, { unique: true });

// ミドルウェアでupdatedAtを更新
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Userモデルを作成
const User = mongoose.model<IUser>('User', UserSchema);

export default User;