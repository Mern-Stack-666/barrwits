import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  slug: string;
  title: string;
  description: string;
  tagline?: string;
  longDescription?: string;
  imageSrc: string;
  highlights: string[];
  features?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  benefits?: string[];
  deliverables?: string[];
  process?: {
    step: number;
    title: string;
    description: string;
  }[];
  caseStudies?: {
    title: string;
    metric: string;
    description: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  sections?: {
    title: string;
    content: string[];
    type?: 'text' | 'grid' | 'features';
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    features: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String },
      },
    ],
    benefits: {
      type: [String],
      default: [],
    },
    deliverables: {
      type: [String],
      default: [],
    },
    process: [
      {
        step: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    caseStudies: [
      {
        title: { type: String, required: true },
        metric: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    sections: [
      {
        title: { type: String, required: true },
        content: { type: [String], default: [] },
        type: { type: String, enum: ['text', 'grid', 'features'], default: 'text' },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in hot reload
const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
