"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Download,
  RotateCcw,
  TrendingUp,
  Clock,
  X,
} from "lucide-react";

function formatPrice(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function SimpleBarChart({ data, height = 200 }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = 40;
  const gap = 20;
  const padding = 30;
  const width = data.length * (barWidth + gap) + padding * 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      style={{ minHeight: `${height}px` }}
    >
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <line
          key={`grid-${i}`}
          x1={padding}
          y1={height - padding - (height - padding * 2) * ratio}
          x2={width - padding}
          y2={height - padding - (height - padding * 2) * ratio}
          stroke="#B89A5E"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}

      {/* Bars */}
      {data.map((item, i) => {
        const barHeight = ((item.value / maxValue) * (height - padding * 2)) || 0;
        const x = padding + i * (barWidth + gap);
        const y = height - padding - barHeight;

        return (
          <g key={`bar-${i}`}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#B89A5E"
              rx="4"
            />
            <text
              x={x + barWidth / 2}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#1B1411"
              fontWeight="500"
            >
              {item.label}
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 5}
              textAnchor="middle"
              fontSize="12"
              fill="#1B1411"
              fontWeight="600"
            >
              {item.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AdminInventoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("inventory");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "Earrings",
    price: "",
    stock: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editPreviewImage, setEditPreviewImage] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sessionStats, setSessionStats] = useState({
    productsAdded: 0,
    productsDeleted: 0,
    ordersCreated: 0,
  });
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [productCategory, setProductCategory] = useState("all");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated" && !session?.user?.isAdmin) {
      // signed in but not an admin — redirect to home
      router.push("/");
      return;
    }
  }, [status, router]);

  useEffect(() => {
    async function loadData() {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);

      if (productsRes.ok) {
        setProducts(await productsRes.json());
      }

      if (ordersRes.ok) {
        setOrders(await ordersRes.json());
      }

      setLoadingProducts(false);
    }

    loadData();
  }, []);

  function handleImageDrop(e, isEdit = false) {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer?.files || e.target?.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (isEdit) {
            setEditForm({ ...editForm, image: event.target.result });
            setEditPreviewImage(event.target.result);
          } else {
            setForm({ ...form, image: event.target.result });
            setPreviewImage(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + Number(item.stock), 0);
  const lowStock = products.filter((item) => Number(item.stock) <= 5).length;

  async function handleAddProduct(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) return;

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        price: form.price,
        stock: form.stock,
        image: form.image,
      }),
    });

    if (!response.ok) return;

    const newProduct = await response.json();
    setProducts((prev) => [newProduct, ...prev]);
    setSessionStats((prev) => ({ ...prev, productsAdded: prev.productsAdded + 1 }));

    setForm({
      name: "",
      category: "Earrings",
      price: "",
      stock: "",
      image: "",
    });
    setPreviewImage(null);

    setToast({ type: "success", message: `Product "${newProduct.name}" added successfully!` });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDeleteProduct(id) {
    setDeleteConfirm(null);
    const product = products.find((p) => p.id === id);
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;

    setProducts((prev) => prev.filter((product) => product.id !== id));
    setSessionStats((prev) => ({ ...prev, productsDeleted: prev.productsDeleted + 1 }));
    setToast({ type: "success", message: `Product "${product.name}" deleted successfully!` });
    setTimeout(() => setToast(null), 3000);
  }

  function handleStartEdit(product) {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setEditPreviewImage(product.image);
  }

  async function handleUpdateProduct(e) {
    e.preventDefault();

    if (!editForm.name || !editForm.price || !editForm.stock) return;

    const response = await fetch(`/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editForm.name,
        category: editForm.category,
        price: editForm.price,
        stock: editForm.stock,
        image: editForm.image,
      }),
    });

    if (!response.ok) return;

    const updatedProduct = await response.json();

    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingId ? updatedProduct : product
      )
    );

    setToast({ type: "success", message: `Product updated successfully!` });
    setTimeout(() => setToast(null), 3000);

    setEditingId(null);
    setEditForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
    setEditPreviewImage(null);
  }

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (productCategory === "all" || product.category === productCategory)
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "stock-low":
          return a.stock - b.stock;
        case "stock-high":
          return b.stock - a.stock;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, search, sortBy, productCategory]);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        (orderFilter === "all" || order.status === orderFilter) &&
        (order.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
          order.id.toLowerCase().includes(orderSearch.toLowerCase()))
    );
  }, [orders, orderFilter, orderSearch]);

  function exportAsCSV(dataType) {
    let csv = "";
    if (dataType === "products") {
      csv = "Product Name,Category,Price,Stock,Status\n";
      products.forEach((p) => {
        csv += `"${p.name}","${p.category}",${p.price},${p.stock},"${p.status}"\n`;
      });
    } else {
      csv = "Order ID,Customer,Items,Total,Date,Status\n";
      orders.forEach((o) => {
        csv += `"${o.id}","${o.customer}",${o.items},${o.total},"${o.date}","${o.status}"\n`;
      });
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataType}-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    
    setToast({ type: "success", message: `${dataType} exported successfully!` });
    setTimeout(() => setToast(null), 3000);
  }

  const chartData = [
    { label: "Products", value: products.length },
    { label: "Low Stock", value: products.filter((p) => p.stock <= 5).length },
    { label: "Orders", value: orders.length },
    { label: "Completed", value: orders.filter((o) => o.status === "Completed").length },
  ];

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
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-[#B89A5E] text-[#1B1411]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "inventory"
                  ? "bg-[#B89A5E] text-[#1B1411]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Package className="h-5 w-5" />
              Inventory
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "orders"
                  ? "bg-[#B89A5E] text-[#1B1411]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
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
          {activeTab === "dashboard" && (
            <div>
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A6A3F]">
                    Admin / Dashboard
                  </p>
                  <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                    Welcome Back
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#1B1411]/60">
                    Here's an overview of your pearl business performance.
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

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Total Products</p>
                  <h3 className="mt-3 font-serif text-4xl">{products.length}</h3>
                </div>

                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Total Orders</p>
                  <h3 className="mt-3 font-serif text-4xl">{orders.length}</h3>
                </div>

                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Total Revenue</p>
                  <h3 className="mt-3 font-serif text-4xl">
                    {formatPrice(
                      orders.reduce((sum, order) => sum + order.total, 0)
                    )}
                  </h3>
                </div>

                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Low Stock Items</p>
                  <h3 className="mt-3 flex items-center gap-2 font-serif text-4xl">
                    {products.filter((item) => Number(item.stock) <= 5).length}
                    {products.filter((item) => Number(item.stock) <= 5).length >
                      0 && (
                      <AlertCircle className="h-6 w-6 text-[#B89A5E]" />
                    )}
                  </h3>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5">
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl">Business Analytics</h3>
                    <p className="mt-1 text-sm text-[#1B1411]/50">
                      Overview of your inventory and orders
                    </p>
                  </div>
                  <SimpleBarChart data={chartData} />
                </div>

                <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5">
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl">Session Activity</h3>
                    <p className="mt-1 text-sm text-[#1B1411]/50">
                      Changes made in this session
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl bg-[#FFF8EF] p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#CFE9DF]">
                          <Plus className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Products Added</p>
                          <p className="text-xs text-[#1B1411]/50">In this session</p>
                        </div>
                      </div>
                      <p className="font-serif text-2xl">{sessionStats.productsAdded}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-[#FFF8EF] p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#F4C6D3]/60">
                          <Trash2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Products Deleted</p>
                          <p className="text-xs text-[#1B1411]/50">In this session</p>
                        </div>
                      </div>
                      <p className="font-serif text-2xl">{sessionStats.productsDeleted}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-[#FFF8EF] p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#CFE9DF]">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Updates Made</p>
                          <p className="text-xs text-[#1B1411]/50">Product modifications</p>
                        </div>
                      </div>
                      <p className="font-serif text-2xl">
                        {sessionStats.productsAdded + sessionStats.productsDeleted}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div>
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
                  <h3 className="mt-3 font-serif text-4xl">{products.length}</h3>
                </div>

                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Total Stock</p>
                  <h3 className="mt-3 font-serif text-4xl">
                    {products.reduce((sum, item) => sum + Number(item.stock), 0)}
                  </h3>
                </div>

                <div className="rounded-3xl border border-[#B89A5E]/20 bg-white/70 p-6 shadow-xl shadow-black/5">
                  <p className="text-sm text-[#1B1411]/50">Low Stock Items</p>
                  <h3 className="mt-3 flex items-center gap-2 font-serif text-4xl">
                    {products.filter((item) => Number(item.stock) <= 5).length}
                    {products.filter((item) => Number(item.stock) <= 5).length >
                      0 && (
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

                <div
                  onDrop={(e) => handleImageDrop(e, false)}
                  onDragOver={handleDragOver}
                  className="rounded-2xl border-2 border-dashed border-[#B89A5E]/40 bg-[#FFF8EF] p-6 text-center transition hover:border-[#B89A5E] hover:bg-[#FFF8EF]/80 cursor-pointer"
                >
                  {previewImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <p className="text-xs text-[#1B1411]/60">Image selected</p>
                      <label className="text-xs text-[#8A6A3F] underline cursor-pointer">
                        Change image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageDrop(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-[#1B1411]">
                        Drop image here
                      </p>
                      <p className="mt-1 text-xs text-[#1B1411]/50">
                        or{" "}
                        <label className="text-[#8A6A3F] underline cursor-pointer">
                          click to select
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageDrop(e, false)}
                            className="hidden"
                          />
                        </label>
                      </p>
                    </div>
                  )}
                </div>

                <button className="w-full rounded-full bg-[#1B1411] px-6 py-4 text-sm font-medium text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                  Add Product
                </button>
              </div>
            </form>

            <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-serif text-3xl">Inventory List</h3>
                  <p className="mt-1 text-sm text-[#1B1411]/50">
                    {sortedAndFilteredProducts.length} product{sortedAndFilteredProducts.length !== 1 ? "s" : ""} total
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3">
                    <Search className="h-4 w-4 text-[#8A6A3F]" />
                    <input
                      className="bg-transparent text-sm outline-none placeholder:text-[#1B1411]/40"
                      placeholder="Search product..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSearch("");
                      setProductCategory("all");
                      setSortBy("name");
                    }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#B89A5E]/40 transition hover:bg-[#FFF8EF]"
                    title="Reset filters"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => exportAsCSV("products")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#B89A5E]/40 px-4 py-2 text-sm transition hover:bg-[#FFF8EF]"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                >
                  <option value="all">All Categories</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Rings">Rings</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                >
                  <option value="name">Sort by Name (A-Z)</option>
                  <option value="stock-low">Sort by Stock (Low to High)</option>
                  <option value="stock-high">Sort by Stock (High to Low)</option>
                  <option value="price-low">Sort by Price (Low to High)</option>
                  <option value="price-high">Sort by Price (High to Low)</option>
                </select>
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
                    {sortedAndFilteredProducts.map((product) => (
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
                            <button
                              onClick={() => handleStartEdit(product)}
                              className="grid h-9 w-9 place-items-center rounded-full bg-[#CFE9DF]/70 transition hover:bg-[#CFE9DF]"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="grid h-9 w-9 place-items-center rounded-full bg-[#F4C6D3]/70 transition hover:bg-[#F4C6D3]"
                              title="Delete product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {sortedAndFilteredProducts.length === 0 && (
                  <div className="py-16 text-center text-sm text-[#1B1411]/50">
                    No products found.
                  </div>
                )}
              </div>
            </div>
          </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A6A3F]">
                    Admin / Orders
                  </p>
                  <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
                    Order Management
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#1B1411]/60">
                    Track and manage all customer orders from your pearl shop.
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

              <div className="mt-8 rounded-[2rem] border border-[#B89A5E]/20 bg-white/75 p-6 shadow-xl shadow-black/5">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-serif text-3xl">Recent Orders</h3>
                    <p className="mt-1 text-sm text-[#1B1411]/50">
                      {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""} found
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3">
                      <Search className="h-4 w-4 text-[#8A6A3F]" />
                      <input
                        className="bg-transparent text-sm outline-none placeholder:text-[#1B1411]/40"
                        placeholder="Search order..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setOrderSearch("");
                        setOrderFilter("all");
                      }}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#B89A5E]/40 transition hover:bg-[#FFF8EF]"
                      title="Reset filters"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => exportAsCSV("orders")}
                      className="inline-flex items-center gap-2 rounded-full border border-[#B89A5E]/40 px-4 py-2 text-sm transition hover:bg-[#FFF8EF]"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-[0.2em] text-[#1B1411]/40">
                        <th className="px-4">Order ID</th>
                        <th className="px-4">Customer</th>
                        <th className="px-4">Items</th>
                        <th className="px-4">Total</th>
                        <th className="px-4">Date</th>
                        <th className="px-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="rounded-2xl bg-[#FFF8EF] text-sm shadow-sm"
                        >
                          <td className="rounded-l-2xl px-4 py-4 font-medium">
                            {order.id}
                          </td>
                          <td className="px-4 py-4">{order.customer}</td>
                          <td className="px-4 py-4">{order.items}</td>
                          <td className="px-4 py-4 font-medium">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-4 py-4 text-sm text-[#1B1411]/60">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="rounded-r-2xl px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                order.status === "Completed"
                                  ? "bg-[#CFE9DF] text-[#1B1411]"
                                  : order.status === "Pending"
                                  ? "bg-[#F4C6D3]/60 text-[#1B1411]"
                                  : "bg-[#FFF8EF] border border-[#B89A5E]/40 text-[#1B1411]"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {editingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <form
            onSubmit={handleUpdateProduct}
            className="w-full max-w-md rounded-[2rem] border border-[#B89A5E]/20 bg-white/95 p-6 shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="font-serif text-3xl">Edit Product</h3>
              <p className="mt-1 text-sm text-[#1B1411]/50">
                Update product information
              </p>
            </div>

            <div className="space-y-4">
              <input
                className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                placeholder="Product name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />

              <select
                className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
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
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              />

              <input
                className="w-full rounded-2xl border border-[#B89A5E]/20 bg-[#FFF8EF] px-4 py-3 text-sm outline-none focus:border-[#B89A5E]"
                placeholder="Stock"
                type="number"
                value={editForm.stock}
                onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
              />

              <div
                onDrop={(e) => handleImageDrop(e, true)}
                onDragOver={handleDragOver}
                className="rounded-2xl border-2 border-dashed border-[#B89A5E]/40 bg-[#FFF8EF] p-6 text-center transition hover:border-[#B89A5E] hover:bg-[#FFF8EF]/80 cursor-pointer"
              >
                {editPreviewImage ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={editPreviewImage}
                      alt="Preview"
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <p className="text-xs text-[#1B1411]/60">Image selected</p>
                    <label className="text-xs text-[#8A6A3F] underline cursor-pointer">
                      Change image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageDrop(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-[#1B1411]">
                      Drop image here
                    </p>
                    <p className="mt-1 text-xs text-[#1B1411]/50">
                      or{" "}
                      <label className="text-[#8A6A3F] underline cursor-pointer">
                        click to select
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageDrop(e, true)}
                          className="hidden"
                        />
                      </label>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#1B1411] px-6 py-4 text-sm font-medium text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 rounded-full border border-[#B89A5E]/40 px-6 py-4 text-sm font-medium transition hover:bg-[#FFF8EF]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <div className="w-full max-w-md rounded-[2rem] border border-[#B89A5E]/20 bg-white/95 p-6 shadow-2xl">
            <div className="mb-6">
              <h3 className="font-serif text-3xl">Delete Product?</h3>
              <p className="mt-2 text-sm text-[#1B1411]/60">
                This action cannot be undone. The product will be permanently removed from your inventory.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 rounded-full bg-[#F4C6D3] px-6 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#F4C6D3]/80"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-full border border-[#B89A5E]/40 px-6 py-3 text-sm font-medium transition hover:bg-[#FFF8EF]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 z-50">
          <div
            className={`flex items-center gap-3 rounded-full px-6 py-4 shadow-xl transition-all ${
              toast.type === "success"
                ? "bg-[#CFE9DF] text-[#1B1411]"
                : "bg-[#F4C6D3]/80 text-[#1B1411]"
            }`}
          >
            {toast.type === "success" ? (
              <div className="grid h-5 w-5 place-items-center rounded-full bg-[#1B1411]/10">
                <span className="text-sm font-bold">✓</span>
              </div>
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-lg opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}