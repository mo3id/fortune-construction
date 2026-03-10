import mongoose, { Document, Schema } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  abbr: string;
  logo?: string;
  order: number;
}

const PartnerSchema = new Schema<IPartner>({
  name: { type: String, required: true, trim: true },
  abbr: { type: String, required: true, trim: true },
  logo: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IPartner>('Partner', PartnerSchema);
