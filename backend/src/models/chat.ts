import mongoose, { Document } from 'mongoose';

type IMessage = {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
};
export interface IChat extends Document {
  userId: string;
  title:string;
  messages: IMessage[];
  projectId:string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
});

const ChatSchema = new mongoose.Schema<IChat>({
  userId: { type: String, required: true },
  title: {type: String, required:true },
  messages: [MessageSchema],
  projectId:{type:String, default:''},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
