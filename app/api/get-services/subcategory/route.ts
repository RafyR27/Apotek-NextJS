import dbConnect from "@/lib/db";
import { Subcategory } from "@/models/kategori.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const result = await Subcategory.find({ category });

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
