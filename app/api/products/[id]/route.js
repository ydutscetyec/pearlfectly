import { NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "../../../../lib/db";

export async function PUT(request, context) {
  const { id: idParam } = await context.params;
  const id = Number(idParam);
  const body = await request.json();
  const updated = await updateProduct(id, body);

  if (!updated) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request, context) {
  const { id: idParam } = await context.params;
  const id = Number(idParam);
  const deleted = await deleteProduct(id);

  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
