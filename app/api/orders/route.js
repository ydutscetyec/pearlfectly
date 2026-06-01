import { NextResponse } from "next/server";
import { addOrder, getOrders, updateProductsAfterCheckout } from "../../../lib/db";
import { requireAdminUser, requireSignedInUser } from "../../../lib/auth";

export async function GET() {
  try {
    await requireAdminUser();

    const orders = await getOrders();

    return NextResponse.json(Array.isArray(orders) ? orders : []);
  } catch (error) {
    console.error("Orders GET error:", error);

    return NextResponse.json(
      { error: error.message || "Unable to load orders." },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await requireSignedInUser();
    const body = await request.json();

    const rawItems = Array.isArray(body.items) ? body.items : [];

    const lineItems = rawItems.map((item) => {
      const quantity = Math.max(1, Number(item.quantity ?? item.cartQuantity ?? 1));
      const price = Number(item.price ?? 0);

      return {
        id: Number(item.id),
        name: item.name,
        category: item.category || "Product",
        price,
        quantity,
        image: item.image,
        metal: item.metal || "",
        subtotal: price * quantity,
      };
    });

    const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const calculatedTotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await addOrder({
      customerName: body.customerName || user.name || user.email || "Pearl Client",
      customerEmail: body.customerEmail || user.email || "client@example.com",
      items: lineItems,
      itemCount,
      total: Number(body.total || calculatedTotal),
      status: "Pending",
    });

    await updateProductsAfterCheckout(lineItems);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);

    return NextResponse.json(
      { error: error.message || "Unable to create order." },
      { status: error.status || 500 }
    );
  }
}