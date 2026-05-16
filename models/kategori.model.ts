import { ICategory, ISubcategory } from "@/types/category";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const SubcategorySchema = new Schema<ISubcategory>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

const Subcategory =
  mongoose.models.Subcategory ||
  mongoose.model<ISubcategory>("Subcategory", SubcategorySchema);

export { Category, Subcategory };
