import mongoose, { Schema, Document } from 'mongoose';

export interface IScheme extends Document {
  schemeId: string;
  name: string;
  description: string;
  category: string;
  deadline?: Date;
  maxAmount?: number;
  minIncome: number;
  maxIncome: number;
  applicableStates: string[];
  applicableCategories: string[];
  applicableOccupations: string[];
  requirements: string[];
  matchCriteria: {
    lowIncomeBonus?: number;
    seniorBonus?: number;
    disabilityBonus?: number;
    occupationBonus?: number;
    veteranBonus?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SchemeSchema: Schema = new Schema(
  {
    schemeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    deadline: { type: Date },
    maxAmount: { type: Number },
    minIncome: { type: Number, default: 0 },
    maxIncome: { type: Number, required: true },
    applicableStates: [{ type: String }],
    applicableCategories: [{ type: String }],
    applicableOccupations: [{ type: String }],
    requirements: [{ type: String }],
    matchCriteria: {
      lowIncomeBonus: { type: Number, default: 0 },
      seniorBonus: { type: Number, default: 0 },
      disabilityBonus: { type: Number, default: 0 },
      occupationBonus: { type: Number, default: 0 },
      veteranBonus: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
