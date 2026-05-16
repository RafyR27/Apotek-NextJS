import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Category } from "@/models/kategori.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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

    const { category } = await req.json();

    const result = await Category.create({
      category,
    });

    return NextResponse.json({
      message: "Success add category",
      status: 200,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      message: err.message,
      status: 500,
    });
  }
}
