import mongoose, { Schema, Document } from 'mongoose';

export interface IJobPosting extends Document {
  title: string;
  department: string;
  description: string;
  qualifications: string[];
  minAge: number;
  maxAge: number;
  salary: {
    min: number;
    max: number;
  };
  deadline: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: [{ type: String }],
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required: true },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    deadline: { type: Date, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.JobPosting || mongoose.model<IJobPosting>('JobPosting', JobPostingSchema);
