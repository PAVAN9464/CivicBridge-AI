import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReminder extends Document {
  user: Types.ObjectId;
  scheme: Types.ObjectId | string;
  deadline: Date;
  notes?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheme: { type: Schema.Types.Mixed, required: true }, // Can be ObjectId ref or a string name
    deadline: { type: Date, required: true },
    notes: { type: String },
    isCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Reminder || mongoose.model<IReminder>('Reminder', ReminderSchema);
