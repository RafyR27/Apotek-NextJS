import dbConnect from "@/lib/db";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
          data: null,
        },
        { status: 400 },
      );
    }

    const data = await UserModel.findOne({ email });

    console.log(data);

    return NextResponse.json({
      message: "Success get user",
      data,
    });
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json(
      {
        message: err.message,
        data: null,
      },
      { status: 500 },
    );
  }
}
