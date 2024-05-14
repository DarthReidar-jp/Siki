import mongoose, { Document } from 'mongoose';

// ドキュメントインターフェースを定義
export interface IProject extends Document {
    projectId: string;
    projectName: string;
    createUserId: string;
    isPublic: boolean;
    projectMemberUserIds: string[]; // 配列として定義
    createdAt: Date;
    updatedAt: Date;
}

// Mongooseスキーマを定義
const ProjectSchema = new mongoose.Schema<IProject>({
    projectId: { type: String,required: true,unique: true,trim: true},
    projectName: {type: String,required: true,trim: true},
    createUserId: {type: String, required: true},
    isPublic: { type: Boolean,  default: false},
    projectMemberUserIds: {type: [String],default: []},
    createdAt: { type: Date,default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ミドルウェアでupdatedAtを更新
ProjectSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// モデルを作成
const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
