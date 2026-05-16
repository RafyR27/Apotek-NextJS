import { IBrand } from "@/types/brand";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BrandSchema = new Schema<IBrand>(
  {
    brand: {
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

const Brand =
  mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);

export { Brand };
