import { NextResponse } from "next/server";
import { getProducts, addProduct } from "../../../lib/db";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  const body = await request.json();
  const product = await addProduct(body);
  return NextResponse.json(product, { status: 201 });
}
