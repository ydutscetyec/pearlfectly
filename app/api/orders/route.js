import { NextResponse } from "next/server";
import { getOrders, writeOrders, decrementProductStock } from "../../../lib/db";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request) {
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [];
  const total = Number(body.total || items.reduce((sum, item) => sum + Number(item.price || 0), 0));
  const customer = body.customer?.trim() || "Guest";

  if (items.length === 0 || total <= 0) {
    return NextResponse.json(
      { error: "Order must include at least one item with a valid total." },
      { status: 400 }
    );
  }

  const orders = await getOrders();
  const newOrder = {
    id: `ORD-${String(Date.now()).slice(-6)}`,
    customer,
    total,
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
    items: items.length,
    lineItems: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })),
  };

  orders.unshift(newOrder);
  await writeOrders(orders);

  for (const item of items) {
    if (item?.id != null) {
      await decrementProductStock(Number(item.id), 1);
    }
  }

  return NextResponse.json(newOrder, { status: 201 });
}
