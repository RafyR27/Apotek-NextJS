import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Brand } from "@/models/brand.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      await dbConnect();
      const session = auth.api.getSession({
        headers: await headers(),
      });

    if (!session) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const { brand } = await req.json();

    const result = await Brand.create({
      brand,
    });

    return NextResponse.json({
      message: "Success add brand",
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
