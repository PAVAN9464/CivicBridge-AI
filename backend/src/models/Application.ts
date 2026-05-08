import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  user: Types.ObjectId;
  scheme: Types.ObjectId;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedAt?: Date;
  documents: Array<{
    name: string;
    url: string;
    verified: boolean;
  }>;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheme: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected'],
      default: 'Draft'
    },
    submittedAt: { type: Date },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        verified: { type: Boolean, default: false }
      }
    ],
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
