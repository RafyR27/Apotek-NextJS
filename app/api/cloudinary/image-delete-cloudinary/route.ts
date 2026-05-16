// app/api/delete-image/route.ts
import environment from "@/config/environment";
import { auth } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: environment.CLOUDINARY_CLOUD_NAME,
  api_key: environment.CLOUDINARY_API_KEY,
  api_secret: environment.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id diperlukan" },
        { status: 400 },
      );
    }

    await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({
      message: "Gambar berhasil dihapus",
      status: 200,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      message: err.message,
      status: 500,
    });
  }
}
