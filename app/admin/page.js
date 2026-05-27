"use client";

import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  ShoppingBag,
  AlertCircle,
  Gem,
} from "lucide-react";

const starterProducts = [
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
    name: "Pink Pearl Size Guide Set",
    category: "Earrings",
    price: 720,
    stock: 3,
    status: "Low Stock",
    image: "/pearl-size-guide.png",
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminInventoryPage() {
  const [products, setProducts] = useState(starterProducts);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "Earrings",
    price: "",
    stock: "",
    image: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + Number(item.stock), 0);
  const lowStock = products.filter((item) => Number(item.stock) <= 5).length;

  function handleAddProduct(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: Number(form.stock) <= 5 ? "Low Stock" : "Active",
      image: form.image || "/weekly-pearl-box.png",
    };

    setProducts((prev) => [newProduct, ...prev]);

    setForm({
      name: "",
      category: "Earrings",
      price: "",
      stock: "",
      image: "",
    });
  }

  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#FFF8EF] text-[#1B1411]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-[#B89A5E]/20 bg-[#1B1411] p-6 text-[#FFF8EF] lg:block">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#B89A5E]/20 text-[#B89A5E]">
              <Gem className="h-6 w-6" />
            </div>

            <div>
              <h1 className="font-serif text-2xl tracking-wide">PEARLfectly</h1>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Admin Panel
              </p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-2xl bg-[#B89A5E] px-4 py-3 text-sm font-medium text-[#1B1411]">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
              <Package className="h-5 w-5" />
              Inventory
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
              <ShoppingBag className="h-5 w-5" />
              Orders
            </button>
          </nav>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm font-medium text-[#B89A5E]">Frontend only</p>
            <p className="mt-2 text-xs leading-6 text-white/50">
              This page is not connected to a database yet. Changes will reset
              after refreshing.
            </p>
          </div>
        </aside>

        <section className="p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A6A3F]">
                Admin / Inventory
              </p>
              <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                Product Management
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#1B1411]/60">
                Manage pearl products, prices, stock, and visibility before
                connecting this page to your database.
              </p>
            </div>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#B89A5E]/40 px-5 py-3 text-sm font-medium transition hover:bg-[#CFE9DF]/70"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Shop
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
              <p className="text-sm text-[#1B1411]/50">Total Products</p>
              <h3 className="mt-3 font-serif text-4xl">{totalProducts}</h3>
            </div>

            <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
              <p className="text-sm text-[#1B1411]/50">Total Stock</p>
              <h3 className="mt-3 font-serif text-4xl">{totalStock}</h3>
            </div>

            <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
              <p className="text-sm text-[#1B1411]/50">Low Stock Items</p>
              <h3 className="mt-3 flex items-center gap-2 font-serif text-4xl">
                {lowStock}
                {lowStock > 0 && (
                  <AlertCircle className="h-6 w-6 text-[#B89A5E]" />
                )}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
            <form
              onSubmit={handleAddProduct}
              className="rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-3xl">Add Product</h3>
                  <p className="mt-1 text-sm text-[#1B1411]/50">
                    Temporary frontend form
                  </p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#CFE9DF]">
                  <Plus className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-4">
                <input
                  className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  placeholder="Product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <select
                  className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option>Earrings</option>
                  <option>Necklaces</option>
                  <option>Bracelets</option>
                  <option>Rings</option>
                </select>

                <input
                  className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                  className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  placeholder="Stock"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />

                <input
                  className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  placeholder="Image path, example: /weekly-pearl-box.png"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />

                <button className="w-full rounded-full bg-[#1B1411] px-6 py-4 text-sm font-medium text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                  Add Product
                </button>
              </div>
            </form>

            <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-serif text-3xl">Inventory List</h3>
                  <p className="mt-1 text-sm text-[#1B1411]/50">
                    Products currently displayed in admin state
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3">
                  <Search className="h-4 w-4 text-[#8A6A3F]" />
                  <input
                    className="bg-transparent text-sm outline-none placeholder:text-[#1B1411]/40"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.2em] text-[#1B1411]/40">
                      <th className="px-4">Product</th>
                      <th className="px-4">Category</th>
                      <th className="px-4">Price</th>
                      <th className="px-4">Stock</th>
                      <th className="px-4">Status</th>
                      <th className="px-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="rounded-2xl bg-[#FFF8EF] text-sm shadow-sm"
                      >
                        <td className="rounded-l-2xl px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-14 w-14 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-[#1B1411]/45">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">{product.category}</td>
                        <td className="px-4 py-4">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-4 py-4">{product.stock}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              product.status === "Low Stock"
                                ? "bg-[#F4C6D3]/60 text-[#1B1411]"
                                : "bg-[#CFE9DF] text-[#1B1411]"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>

                        <td className="rounded-r-2xl px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="grid h-9 w-9 place-items-center rounded-full bg-[#CFE9DF]/70 transition hover:bg-[#CFE9DF]">
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="grid h-9 w-9 place-items-center rounded-full bg-[#F4C6D3]/70 transition hover:bg-[#F4C6D3]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="py-16 text-center text-sm text-[#1B1411]/50">
                    No products found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}