import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  location: string;
  duration: string;
  budget: string;
  challenge: string;
  solution: string;
  result: string;
  coverImage: string;
  galleryImages: string[];
  completionDate: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  budget: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  result: { type: String, required: true },
  coverImage: { type: String, default: '' },
  galleryImages: [{ type: String }],
  completionDate: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
