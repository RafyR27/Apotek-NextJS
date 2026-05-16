import { IProduct } from "@/types/product";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    labelNumber: {
      type: Number,
      required: true,
    },
    satuanLabel: {
      type: String,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    unitLabel: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    minStock: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    publicIdImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export { Product };
