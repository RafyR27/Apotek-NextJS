import dbConnect from "@/lib/db";
import { Category } from "@/models/kategori.model";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const result = await Category.find();

    return NextResponse.json({
      message: "Success get category",
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
