import mongoose, { Document } from 'mongoose';

// ドキュメントインターフェースを定義
export interface IPage extends Document {
  userId: string;
  title: string;
  editorState:any;
  lines: string[]; 
  content: string; 
  vector: number[]; 
  folderIds: mongoose.Schema.Types.ObjectId[]; // フォルダーIDもObjectIdで参照
  projectId:string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mongooseスキーマを定義
const PageSchema = new mongoose.Schema<IPage>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  editorState:{ type: mongoose.Schema.Types.Mixed, required: true }, 
  lines: [{ type: String, default: [] }],
  content: { type: String, default: '' },
  vector: { type: [Number], default: [] },
  folderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: [] }],
  projectId:{type:String, default:''},
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ミドルウェアでupdatedAtを更新
PageSchema.pre('save', function(next) {
  
  this.updatedAt = new Date();
  next();
});


// モデルを作成
const Page = mongoose.model<IPage>('Page', PageSchema);

export default Page;