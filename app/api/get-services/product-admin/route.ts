import dbConnect from "@/lib/db";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const stock = searchParams.get("stock");
    const expired = searchParams.get("expired");
    const search = searchParams.get("search");

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const matchQuery: Record<string, unknown> = {};

    // Filter category
    if (category) {
      matchQuery.category = category;
    }

    // Filter subcategory
    if (subcategory) {
      matchQuery.subcategory = subcategory;
    }

    // Filter stock
    if (stock === "stok cukup") {
      matchQuery.$expr = { $gte: ["$stock", "$minStock"] };
    } else if (stock === "hampir habis") {
      matchQuery.$expr = { $lt: ["$stock", "$minStock"] };
    }

    // Filter expired
    if (expired === "kadaluarsa") {
      matchQuery.expiryDate = { $lte: thirtyDaysFromNow, $gte: new Date() };
    } else if (expired === "aman") {
      matchQuery.expiryDate = { $gt: thirtyDaysFromNow };
    }

    // Search by product name
    if (search) {
      matchQuery.$or = [
        { productName: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { subcategory: { $regex: search, $options: "i" } },
      ];
    }

    const result = await Product.aggregate([
      {
        $facet: {
          products: [{ $match: matchQuery }],

          totalProducts: [{ $count: "count" }],

          lowStock: [
            {
              $match: {
                $expr: { $lt: ["$stock", "$minStock"] },
              },
            },
            { $count: "count" },
          ],

          availableStock: [
            { $match: { stock: { $gt: 0 } } },
            { $count: "count" },
          ],

          nearExpiry: [
            {
              $match: {
                expiryDate: {
                  $lte: thirtyDaysFromNow,
                  $gte: new Date(),
                },
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          products: 1,
          totalProducts: { $arrayElemAt: ["$totalProducts.count", 0] },
          lowStock: { $arrayElemAt: ["$lowStock.count", 0] },
          availableStock: { $arrayElemAt: ["$availableStock.count", 0] },
          nearExpiry: { $arrayElemAt: ["$nearExpiry.count", 0] },
        },
      },
    ]);

    return NextResponse.json({
      message: "Success",
      status: 200,
      data: result[0],
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
