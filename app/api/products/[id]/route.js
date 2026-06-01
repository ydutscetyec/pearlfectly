import { NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/auth";

export async function PUT(request, context) {
  try {
    await requireAdminUser();

    const { id: idParam } = await context.params;
    const id = Number(idParam);

    const body = await request.json();
    const updated = await updateProduct(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to update product." },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    await requireAdminUser();

    const { id: idParam } = await context.params;
    const id = Number(idParam);

    const deleted = await deleteProduct(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to delete product." },
      { status: error.status || 500 }
    );
  }
}