import mongoose, { Document } from 'mongoose';

export interface IFolder extends Document {
  userId: string;
  name: string;
  description: string;
  pages: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new mongoose.Schema<IFolder>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FolderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Folder = mongoose.model<IFolder>('Folder', FolderSchema);

export default Folder;