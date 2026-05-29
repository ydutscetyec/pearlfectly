import { NextResponse } from "next/server";
import { getOrders, writeOrders } from "../../../lib/db";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    const lineItems = items
      .map((item) => {
        const quantity = Math.max(1, Number(item.quantity ?? item.cartQuantity ?? 1));
        const price = Number(item.price ?? 0);

        return {
          id: item.id,
          name: item.name || "Product",
          category: item.category || "Product",
          price,
          quantity,
          image: item.image || "",
          metal: item.metal || "",
          subtotal: price * quantity,
        };
      })
      .filter((item) => item.price > 0 && item.quantity > 0);

    const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const calculatedTotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
    const total = Number(body.total || calculatedTotal);
    const customer = body.customer?.trim() || body.customerName?.trim() || "Guest";

    if (lineItems.length === 0 || itemCount <= 0 || total <= 0) {
      return NextResponse.json(
        { error: "Order must include at least one item with a valid total." },
        { status: 400 }
      );
    }

    const orders = await getOrders();
    const timestamp = Date.now();

    const newOrder = {
      id: `ORD-${String(timestamp).slice(-6)}`,
      orderNumber: `PF-${String(timestamp).slice(-6)}`,
      customer,
      customerEmail: body.customerEmail || "guest@example.com",
      total,
      status: "Pending",
      paymentStatus: "Unpaid",
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),

      items: itemCount,

      lineItems,
    };

    orders.unshift(newOrder);
    await writeOrders(orders);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Unable to create order", error);
    return NextResponse.json(
      { error: "Unable to create order." },
      { status: 500 }
    );
  }
}
