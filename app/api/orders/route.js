import { NextResponse } from "next/server";
import { getOrders, writeOrders, getProducts, writeProducts } from "../../../lib/db";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (rawItems.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty." },
        { status: 400 }
      );
    }

    const products = await getProducts();

    const lineItems = rawItems.map((item) => {
      const product = products.find(
        (product) => String(product.id) === String(item.id)
      );

      if (!product) {
        const error = new Error(`Product not found: ${item.name || item.id}`);
        error.status = 404;
        throw error;
      }

      const quantity = Math.max(
        1,
        Number(item.quantity ?? item.cartQuantity ?? 1)
      );

      const currentStock = Number(product.stock ?? 0);

      if (currentStock < quantity) {
        const error = new Error(
          `Only ${currentStock} stock left for ${product.name}.`
        );
        error.status = 409;
        throw error;
      }

      const price = Number(product.price ?? item.price ?? 0);

      return {
        id: product.id,
        name: product.name,
        category: product.category || "Product",
        price,
        quantity,
        image: product.image,
        metal: product.metal || "",
        subtotal: price * quantity,
      };
    });

    const updatedProducts = products.map((product) => {
      const orderedItem = lineItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (!orderedItem) return product;

      const nextStock = Math.max(
        0,
        Number(product.stock ?? 0) - orderedItem.quantity
      );

      return {
        ...product,
        stock: nextStock,
        status:
          nextStock <= 0
            ? "Out of Stock"
            : nextStock <= 5
            ? "Low Stock"
            : "Active",
      };
    });

    const orders = await getOrders();

    const itemCount = lineItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const total = lineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const newOrder = {
      id: Date.now(),
      orderNumber: `PF-${Date.now()}`,
      customer: body.customerName || "Guest Customer",
      customerName: body.customerName || "Guest Customer",
      customerEmail: body.customerEmail || "guest@example.com",
      items: lineItems,
      itemCount,
      total,
      status: "Pending",
      date: new Date().toISOString(),
    };

    await writeProducts(updatedProducts);
    await writeOrders([newOrder, ...orders]);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unable to place order." },
      { status: error.status || 500 }
    );
  }
}