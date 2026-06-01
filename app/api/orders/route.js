import { NextResponse } from "next/server";
import { addOrder, getOrders, getProducts, updateProductsAfterCheckout } from "../../../lib/db";
import { requireAdminUser, requireSignedInUser } from "../../../lib/auth";

export async function GET() {
  try {
    await requireAdminUser();
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unable to load orders." },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await requireSignedInUser();
    const body = await request.json();
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (rawItems.length === 0) {
      return NextResponse.json({ message: "Cart is empty." }, { status: 400 });
    }

    const products = await getProducts();

    const lineItems = rawItems.map((item) => {
      const product = products.find((product) => String(product.id) === String(item.id));

      if (!product) {
        const error = new Error(`Product not found: ${item.name || item.id}`);
        error.status = 404;
        throw error;
      }

      const quantity = Math.max(1, Number(item.quantity ?? item.cartQuantity ?? 1));
      const currentStock = Number(product.stock ?? 0);

      if (currentStock < quantity) {
        const error = new Error(`Only ${currentStock} stock left for ${product.name}.`);
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

    const itemCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
    const orderId = Date.now();

    await updateProductsAfterCheckout(lineItems);

    const newOrder = await addOrder({
      id: orderId,
      orderNumber: `PF-${orderId}`,
      customer: user.name || user.email || "Pearl Client",
      customerName: user.name || user.email || "Pearl Client",
      customerEmail: user.email || body.customerEmail || "client@example.com",
      items: lineItems,
      itemCount,
      total,
      status: "Pending",
      date: new Date().toISOString(),
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unable to place order." },
      { status: error.status || 500 }
    );
  }
}
