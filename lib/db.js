import fs from "fs/promises";
import path from "path";

const productsFile = path.join(process.cwd(), "data", "products.json");
const ordersFile = path.join(process.cwd(), "data", "orders.json");

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

export async function getProducts() {
  return readJson(productsFile, [
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
  ]);
}

export async function writeProducts(products) {
  await writeJson(productsFile, products);
}

export async function writeOrders(orders) {
  await writeJson(ordersFile, orders);
}

export async function decrementProductStock(id, amount = 1) {
  const products = await getProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }
  const updatedStock = Math.max(0, Number(products[index].stock) - amount);
  products[index] = {
    ...products[index],
    stock: updatedStock,
    status: updatedStock <= 5 ? "Low Stock" : "Active",
  };
  await writeProducts(products);
  return products[index];
}

export async function addProduct(data) {
  const products = await getProducts();
  const id = Date.now();
  const product = {
    id,
    name: data.name,
    category: data.category || "Earrings",
    price: Number(data.price || 0),
    stock: Number(data.stock || 0),
    status: Number(data.stock || 0) <= 5 ? "Low Stock" : "Active",
    image: data.image || "/weekly-pearl-box.png",
  };
  products.unshift(product);
  await writeProducts(products);
  return product;
}

export async function updateProduct(id, data) {
  const products = await getProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }
  const updated = {
    ...products[index],
    name: data.name,
    category: data.category,
    price: Number(data.price),
    stock: Number(data.stock),
    status: Number(data.stock) <= 5 ? "Low Stock" : "Active",
    image: data.image || products[index].image,
  };
  products[index] = updated;
  await writeProducts(products);
  return updated;
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter((product) => product.id !== id);
  if (filtered.length === products.length) {
    return false;
  }
  await writeProducts(filtered);
  return true;
}

export async function getOrders() {
  return readJson(ordersFile, [
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
  ]);
}
