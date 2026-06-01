import { NextResponse } from "next/server";
import { addProduct, getProducts } from "../../../lib/db";
import { requireAdminUser } from "../../../lib/auth";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    await requireAdminUser();
    const body = await request.json();
    const product = await addProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to add product." },
      { status: error.status || 500 }
    );
  }
}
