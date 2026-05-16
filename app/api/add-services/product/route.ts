import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Product } from "@/models/product.model";
import { IProductForm } from "@/types/product";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import * as z from "zod";

const formSchema = z.object({
  productName: z.string().trim(),
  brand: z.string(),
  kategori: z.string(),
  subkategori: z.string(),
  price: z.number().int().positive(),
  labelNumber: z.number().int().positive(),
  satuanLabel: z.string(),
  unit: z.string(),
  stock: z.number().int().nonnegative(),
  minStock: z.number().int().nonnegative(),
  expiryDate: z.date(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const body = (await req.json()) as IProductForm;

    const validated = formSchema.safeParse({
      ...body,
      expiryDate: new Date(body.expiryDate),
    });

    if (!validated.success) {
      return NextResponse.json({
        message: "Data tidak sesuai",
        status: 400,
        errors: validated.error.flatten().fieldErrors,
      });
    }

    const result = await Product.create({
      productName: body.productName,
      brand: body.brand,
      category: body.kategori,
      subcategory: body.subkategori,
      description: body.description,
      price: body.price,
      labelNumber: body.labelNumber,
      satuanLabel: body.satuanLabel,
      unit: body.unit,
      unitLabel: body.unitLabel,
      stock: body.stock,
      minStock: body.minStock,
      expiryDate: body.expiryDate,
      image: body.image,
      publicIdImage: body.publicIdImage,
    });

    return NextResponse.json({
      message: "Success add product",
      status: 200,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      message: err.message,
      status: 500,
      data: null,
    });
  }
}
