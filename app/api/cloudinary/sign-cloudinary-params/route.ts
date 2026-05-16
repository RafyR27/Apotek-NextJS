import environment from "@/config/environment";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  const body = await req.json();
  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    environment.CLOUDINARY_API_SECRET!,
  );
  return Response.json({ signature });
}
