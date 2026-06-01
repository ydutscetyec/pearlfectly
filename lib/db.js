import fs from "fs/promises";
import path from "path";
import { getSupabaseAdmin } from "./supabase";

const productsFile = path.join(process.cwd(), "data", "products.json");
const ordersFile = path.join(process.cwd(), "data", "orders.json");

const defaultProducts = [
  {
    id: 1,
    name: "Weekly Pearl Stud Set",
    category: "Earrings",
    price: 1280,
    stock: 14,
    status: "Active",
    image: "/weekly-pearl-box.png",
  },
  {
    id: 2,
    name: "Classic Pearl Gift Box",
    category: "Earrings",
    price: 960,
    stock: 8,
    status: "Active",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 3,
    name: "Blush Pearl Size Set",
    category: "Earrings",
    price: 720,
    stock: 3,
    status: "Low Stock",
    image: "/pearl-size-guide.png",
  },
  {
    id: 4,
    name: "Dainty Pearl Duo",
    category: "Earrings",
    price: 840,
    stock: 12,
    status: "Active",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 5,
    name: "Pearl Glow Pendant",
    category: "Necklaces",
    price: 1180,
    stock: 9,
    status: "Active",
    image: "/weekly-pearl-box.png",
  },
  {
    id: 6,
    name: "Soft Mint Pearl Bracelet",
    category: "Bracelets",
    price: 1120,
    stock: 5,
    status: "Low Stock",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 7,
    name: "Blush Pearl Ring",
    category: "Rings",
    price: 890,
    stock: 6,
    status: "Active",
    image: "/pearl-size-guide.png",
  },
  {
    id: 8,
    name: "Pearlfectly Essentials Box",
    category: "Earrings",
    price: 1480,
    stock: 11,
    status: "Active",
    image: "/weekly-pearl-box.png",
  },
];

const defaultOrders = [
  {
    id: "ORD-001",
    customer: "Maria Santos",
    total: 2240,
    status: "Completed",
    date: "2024-05-20",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Juan Dela Cruz",
    total: 1280,
    status: "Pending",
    date: "2024-05-22",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Ana Garcia",
    total: 720,
    status: "Shipped",
    date: "2024-05-23",
    items: 1,
  },
];

function getProductStatus(stock, status) {
  const quantity = Number(stock ?? 0);
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= 5) return "Low Stock";
  return status && status !== "Low Stock" && status !== "Out of Stock" ? status : "Active";
}

function mapProductFromSupabase(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category || "Earrings",
    price: Number(product.price || 0),
    stock: Number(product.stock || 0),
    status: getProductStatus(product.stock, product.status),
    image: product.image || "/weekly-pearl-box.png",
    description: product.description || "",
    createdAt: product.created_at,
  };
}

function mapOrderFromSupabase(order) {
  const lineItems = Array.isArray(order.items) ? order.items : [];
  const itemCount = Number(order.item_count ?? lineItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0));

  return {
    id: order.id,
    orderNumber: order.order_number || `PF-${order.id}`,
    customer: order.customer || order.customer_name || "Guest Customer",
    customerName: order.customer_name || order.customer || "Guest Customer",
    customerEmail: order.customer_email || "guest@example.com",
    items: lineItems,
    lineItems,
    itemCount,
    total: Number(order.total || 0),
    status: order.status || "Pending",
    date: order.date || order.created_at,
    createdAt: order.created_at,
  };
}

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function isMissingSupabaseTable(error) {
  return error?.code === "42P01" || String(error?.message || "").toLowerCase().includes("does not exist");
}

function shouldUseLocalFallback(error) {
  if (!error) return false;
  if (isMissingSupabaseTable(error)) return true;
  if (process.env.NODE_ENV !== "production") return true;
  return false;
}

export async function getProducts() {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, price, stock, status, image, description, created_at")
      .order("created_at", { ascending: false });

    if (!error) return (data || []).map(mapProductFromSupabase);
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase products table unavailable. Falling back to local JSON.", error.message);
  }

  return readJson(productsFile, defaultProducts);
}

export async function writeProducts(products) {
  await writeJson(productsFile, products);
}

export async function addProduct(data) {
  const payload = {
    name: data.name,
    category: data.category || "Earrings",
    price: Number(data.price || 0),
    stock: Number(data.stock || 0),
    status: getProductStatus(data.stock, data.status),
    image: data.image || "/weekly-pearl-box.png",
    description: data.description || "",
  };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("products")
      .insert(payload)
      .select("id, name, category, price, stock, status, image, description, created_at")
      .single();

    if (!error) return mapProductFromSupabase(inserted);
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase products insert unavailable. Falling back to local JSON.", error.message);
  }

  const products = await getProducts();
  const product = { id: Date.now(), ...payload };
  products.unshift(product);
  await writeProducts(products);
  return product;
}

export async function updateProduct(id, data) {
  const payload = {
    name: data.name,
    category: data.category || "Earrings",
    price: Number(data.price || 0),
    stock: Number(data.stock || 0),
    status: getProductStatus(data.stock, data.status),
    image: data.image || "/weekly-pearl-box.png",
    description: data.description || "",
  };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: updated, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select("id, name, category, price, stock, status, image, description, created_at")
      .maybeSingle();

    if (!error) return updated ? mapProductFromSupabase(updated) : null;
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase products update unavailable. Falling back to local JSON.", error.message);
  }

  const products = await getProducts();
  const index = products.findIndex((product) => String(product.id) === String(id));
  if (index === -1) return null;

  const updated = {
    ...products[index],
    ...payload,
  };

  products[index] = updated;
  await writeProducts(products);
  return updated;
}

export async function deleteProduct(id) {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (!error) return true;
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase products delete unavailable. Falling back to local JSON.", error.message);
  }

  const products = await getProducts();
  const filtered = products.filter((product) => String(product.id) !== String(id));
  if (filtered.length === products.length) return false;

  await writeProducts(filtered);
  return true;
}

export async function getOrders() {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_number, customer, customer_name, customer_email, items, item_count, total, status, date, created_at")
      .order("created_at", { ascending: false });

    if (!error) return (data || []).map(mapOrderFromSupabase);
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase orders table unavailable. Falling back to local JSON.", error.message);
  }

  return readJson(ordersFile, defaultOrders);
}

export async function writeOrders(orders) {
  await writeJson(ordersFile, orders);
}

export async function addOrder(order) {
  const now = new Date().toISOString();
  const id = Number(order.id || Date.now());
  const lineItems = Array.isArray(order.items) ? order.items : Array.isArray(order.lineItems) ? order.lineItems : [];
  const itemCount = Number(order.itemCount ?? order.itemsCount ?? lineItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
  const payload = {
    id,
    order_number: order.orderNumber || `PF-${id}`,
    customer: order.customer || order.customerName || "Guest Customer",
    customer_name: order.customerName || order.customer || "Guest Customer",
    customer_email: order.customerEmail || "guest@example.com",
    items: lineItems,
    item_count: itemCount,
    total: Number(order.total || 0),
    status: order.status || "Pending",
    date: order.date || now,
  };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("orders")
      .insert(payload)
      .select("id, order_number, customer, customer_name, customer_email, items, item_count, total, status, date, created_at")
      .single();

    if (!error) return mapOrderFromSupabase(inserted);
    if (!shouldUseLocalFallback(error)) throw error;
    console.warn("Supabase orders insert unavailable. Falling back to local JSON.", error.message);
  }

  const orders = await getOrders();
  const newOrder = {
    id,
    orderNumber: payload.order_number,
    customer: payload.customer,
    customerName: payload.customer_name,
    customerEmail: payload.customer_email,
    items: lineItems,
    lineItems,
    itemCount,
    total: payload.total,
    status: payload.status,
    date: payload.date,
  };

  await writeOrders([newOrder, ...orders]);
  return newOrder;
}

export async function decrementProductStock(id, amount = 1) {
  const products = await getProducts();
  const product = products.find((item) => String(item.id) === String(id));
  if (!product) return null;

  const updatedStock = Math.max(0, Number(product.stock || 0) - Number(amount || 0));
  return updateProduct(id, {
    ...product,
    stock: updatedStock,
    status: getProductStatus(updatedStock, product.status),
  });
}

export async function updateProductsAfterCheckout(lineItems) {
  const products = await getProducts();
  const updatedProducts = products.map((product) => {
    const orderedItem = lineItems.find((item) => String(item.id) === String(product.id));
    if (!orderedItem) return product;

    const nextStock = Math.max(0, Number(product.stock || 0) - Number(orderedItem.quantity || 0));

    return {
      ...product,
      stock: nextStock,
      status: getProductStatus(nextStock, product.status),
    };
  });

  await Promise.all(
    updatedProducts
      .filter((product, index) => product.stock !== products[index].stock)
      .map((product) => updateProduct(product.id, product))
  );

  return updatedProducts;
}
