"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
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
  Clock,
  X,
  UploadCloud,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function formatPrice(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function toNumber(value) {
  return Number(value) || 0;
}

function getStatus(product) {
  if (product.status) return product.status;
  return toNumber(product.stock) <= 5 ? "Low Stock" : "Active";
}

function AdminBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FFF8EF]">
      <img
        src="/background.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,248,239,0.96),rgba(255,253,247,0.86),rgba(207,233,223,0.42))]" />
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#CFE9DF]/45 blur-3xl" />
      <div className="absolute right-[-8rem] top-1/4 h-96 w-96 rounded-full bg-[#F4C6D3]/35 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#B89A5E]/15 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-10 bg-[#B89A5E]" />
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A3F]">
        {children}
      </span>
    </div>
  );
}

function AdminHeader({ activeTab, setActiveTab, products, orders }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#B89A5E]/20 bg-[#FFF8EF]/72 shadow-sm shadow-black/5 backdrop-blur-2xl">
      <div className="mx-auto max-w-[1720px] px-5 py-4 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/90 p-1 shadow-md shadow-black/5">
              <img
                src="/logo.png"
                alt="PEARLfectly logo"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-2xl leading-none tracking-[0.1em] text-[#4A3832]">
                PEARL<span className="tracking-normal">fectly</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8A6A3F]">
                Admin Atelier
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-start gap-2 rounded-full border border-[#B89A5E]/20 bg-[#F7E8DD]/75 p-2 shadow-inner lg:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#1B1411] text-[#FFF8EF] shadow-lg shadow-black/10"
                      : "text-[#4A3832] hover:bg-[#FFFDF7]/90 hover:text-[#1B1411]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 lg:justify-end">
            <div className="hidden rounded-full border border-[#B89A5E]/20 bg-[#FFFDF7]/75 px-4 py-2 text-xs font-medium text-[#4A3832]/70 sm:block">
              {products.length} products · {orders.length} orders
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/75 px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]"
            >
              <Eye className="h-4 w-4" />
              View Shop
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ title, value, note, icon: Icon }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#FFF8EF]/72 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#CFE9DF]/45 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#1B1411]/55">{title}</p>
          <h3 className="mt-3 font-serif text-4xl text-[#1B1411]">{value}</h3>
          {note && <p className="mt-2 text-xs text-[#1B1411]/45">{note}</p>}
        </div>
        {Icon && (
          <div className="grid h-11 w-11 place-items-center rounded-full border border-[#B89A5E]/25 bg-[#FFFDF7]/80 text-[#B89A5E]">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-[2.25rem] border border-white/60 bg-[#FFF8EF]/74 shadow-2xl shadow-black/5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-[#D8C7A3]/55 bg-[#FFFDF7]/82 px-4 py-3 text-sm text-[#1B1411] outline-none transition placeholder:text-[#1B1411]/35 focus:border-[#B89A5E] focus:bg-[#FFFDF7] focus:ring-2 focus:ring-[#B89A5E]/15";

function ImagePicker({ preview, onFile, label = "Drop image here" }) {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onFile(event.dataTransfer?.files?.[0]);
      }}
      className="rounded-[1.5rem] border-2 border-dashed border-[#B89A5E]/35 bg-[#FFFDF7]/60 p-6 text-center transition hover:border-[#B89A5E] hover:bg-[#FFFDF7]/85"
    >
      {preview ? (
        <div className="flex flex-col items-center gap-3">
          <img src={preview} alt="Product preview" className="h-24 w-24 rounded-2xl object-cover shadow-lg shadow-black/10" />
          <label className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A3F] underline underline-offset-4">
            Change image
            <input type="file" accept="image/*" onChange={(event) => onFile(event.target.files?.[0])} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#CFE9DF]/70 text-[#4A3832]">
            <UploadCloud className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-[#1B1411]">{label}</p>
          <p className="text-xs text-[#1B1411]/50">
            or{" "}
            <label className="cursor-pointer text-[#8A6A3F] underline underline-offset-4">
              click to select
              <input type="file" accept="image/*" onChange={(event) => onFile(event.target.files?.[0])} className="hidden" />
            </label>
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, copy }) {
  return (
    <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/70 p-10 text-center">
      <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#B89A5E]" />
      <p className="font-serif text-2xl text-[#1B1411]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#1B1411]/55">{copy}</p>
    </div>
  );
}

function SimpleBarChart({ data, height = 210 }) {
  const maxValue = Math.max(1, ...data.map((item) => Number(item.value) || 0));
  const barWidth = 44;
  const gap = 24;
  const padding = 34;
  const width = data.length * (barWidth + gap) + padding * 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ minHeight: `${height}px` }}>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
        <line
          key={ratio}
          x1={padding}
          y1={height - padding - (height - padding * 2) * ratio}
          x2={width - padding}
          y2={height - padding - (height - padding * 2) * ratio}
          stroke="#B89A5E"
          strokeWidth="0.6"
          opacity="0.28"
        />
      ))}
      {data.map((item, index) => {
        const barHeight = ((Number(item.value) || 0) / maxValue) * (height - padding * 2);
        const x = padding + index * (barWidth + gap);
        const y = height - padding - barHeight;
        return (
          <g key={item.label}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#B89A5E" rx="10" opacity="0.9" />
            <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize="11" fill="#4A3832" fontWeight="600">
              {item.label}
            </text>
            <text x={x + barWidth / 2} y={Math.max(16, y - 8)} textAnchor="middle" fontSize="13" fill="#1B1411" fontWeight="700">
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
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("inventory");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [productCategory, setProductCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sessionStats, setSessionStats] = useState({ added: 0, deleted: 0, updated: 0 });

  const blankForm = {
    name: "",
    category: "Earrings",
    price: "",
    stock: "",
    status: "Active",
    description: "",
    image: "",
  };

  const [form, setForm] = useState(blankForm);
  const [previewImage, setPreviewImage] = useState(null);
  const [editForm, setEditForm] = useState(blankForm);
  const [editPreviewImage, setEditPreviewImage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/");
    }
  }, [status, session, router, pathname]);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/orders", { cache: "no-store" }),
        ]);

        if (productsRes.ok) {
          const productData = await productsRes.json();
          setProducts(Array.isArray(productData) ? productData : []);
        }

        if (ordersRes.ok) {
          const orderData = await ordersRes.json();
          setOrders(Array.isArray(orderData) ? orderData : []);
        }
      } catch (error) {
        console.error("Unable to load admin data", error);
        showToast("error", "Unable to load admin data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function showToast(type, message) {
    setToast({ type, message });
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => setToast(null), 3000);
  }

  function handleImageFile(file, isEdit = false) {
    if (!file || !file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = event.target.result;
      if (isEdit) {
        setEditForm((prev) => ({ ...prev, image }));
        setEditPreviewImage(image);
      } else {
        setForm((prev) => ({ ...prev, image }));
        setPreviewImage(image);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleAddProduct(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.price || !form.stock) {
      showToast("error", "Please enter product name, price, and stock.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.status,
      description: form.description,
      image: form.image || "/weekly-pearl-box.png",
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      showToast("error", "Unable to add product.");
      return;
    }

    const newProduct = await response.json();
    setProducts((prev) => [newProduct, ...prev]);
    setSessionStats((prev) => ({ ...prev, added: prev.added + 1 }));
    setForm(blankForm);
    setPreviewImage(null);
    showToast("success", `Product "${newProduct.name}" added.`);
  }

  function handleStartEdit(product) {
    setEditingProduct(product);
    setEditForm({
      name: product.name ?? "",
      category: product.category ?? "Earrings",
      price: product.price ?? "",
      stock: product.stock ?? "",
      status: getStatus(product),
      description: product.description ?? "",
      image: product.image ?? "",
    });
    setEditPreviewImage(product.image || null);
  }

  async function handleUpdateProduct(event) {
    event.preventDefault();
    if (!editingProduct) return;

    if (!editForm.name.trim() || !editForm.price || !editForm.stock) {
      showToast("error", "Please enter product name, price, and stock.");
      return;
    }

    const payload = {
      name: editForm.name.trim(),
      category: editForm.category,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      status: editForm.status,
      description: editForm.description,
      image: editForm.image || "/weekly-pearl-box.png",
    };

    const response = await fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      showToast("error", "Unable to update product.");
      return;
    }

    const updatedProduct = await response.json();
    setProducts((prev) =>
      prev.map((product) =>
        Number(product.id) === Number(editingProduct.id) ? updatedProduct : product
      )
    );
    setSessionStats((prev) => ({ ...prev, updated: prev.updated + 1 }));
    setEditingProduct(null);
    setEditPreviewImage(null);
    showToast("success", "Product updated.");
  }

  async function handleDeleteProduct(id) {
    if (id == null) return;

    const product = products.find((item) => Number(item.id) === Number(id));
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (!response.ok) {
      showToast("error", "Unable to delete product.");
      return;
    }

    setProducts((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    setSessionStats((prev) => ({ ...prev, deleted: prev.deleted + 1 }));
    setDeleteConfirm(null);
    showToast("success", `Product "${product?.name ?? "item"}" deleted.`);
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + toNumber(item.stock), 0);
  const lowStock = products.filter((item) => toNumber(item.stock) <= 5).length;
  const totalRevenue = orders.reduce((sum, order) => sum + toNumber(order.total), 0);

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))];
  }, [products]);

  const sortedAndFilteredProducts = useMemo(() => {
    return [...products]
      .filter((product) => {
        const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = productCategory === "all" || product.category === productCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "stock-low":
            return toNumber(a.stock) - toNumber(b.stock);
          case "stock-high":
            return toNumber(b.stock) - toNumber(a.stock);
          case "price-low":
            return toNumber(a.price) - toNumber(b.price);
          case "price-high":
            return toNumber(b.price) - toNumber(a.price);
          default:
            return String(a.name ?? "").localeCompare(String(b.name ?? ""));
        }
      });
  }, [products, search, productCategory, sortBy]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer = String(order.customer ?? "").toLowerCase();
      const id = String(order.id ?? "").toLowerCase();
      return (
        (orderFilter === "all" || order.status === orderFilter) &&
        (customer.includes(orderSearch.toLowerCase()) || id.includes(orderSearch.toLowerCase()))
      );
    });
  }, [orders, orderFilter, orderSearch]);

  function exportAsCSV(dataType) {
    const rows = [];

    if (dataType === "products") {
      rows.push(["Product Name", "Category", "Price", "Stock", "Status"]);
      products.forEach((product) => rows.push([product.name, product.category, product.price, product.stock, getStatus(product)]));
    } else {
      rows.push(["Order ID", "Customer", "Items", "Total", "Date", "Status"]);
      orders.forEach((order) => rows.push([order.id, order.customer, order.items, order.total, order.date, order.status]));
    }

    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataType}-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast("success", `${dataType} exported.`);
  }

  const chartData = [
    { label: "Products", value: totalProducts },
    { label: "Stock", value: totalStock },
    { label: "Orders", value: orders.length },
    { label: "Low", value: lowStock },
  ];

  if (status === "loading" || loading) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#FFF8EF] text-[#1B1411]">
        <AdminBackground />
        <div className="rounded-[2.5rem] border border-white/60 bg-[#FFF8EF]/76 p-10 text-center shadow-2xl shadow-black/5 backdrop-blur-xl">
          <Gem className="mx-auto mb-4 h-9 w-9 text-[#B89A5E]" />
          <p className="font-serif text-3xl">Opening the atelier...</p>
          <p className="mt-2 text-sm text-[#1B1411]/55">Loading your admin workspace.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-[#1B1411]">
      <AdminBackground />
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} products={products} orders={orders} />

      <section className="mx-auto max-w-[1720px] px-5 py-8 sm:px-8 lg:px-10">
        {activeTab === "dashboard" && (
          <div>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <SectionLabel>Admin / Dashboard</SectionLabel>
                <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[#1B1411] sm:text-6xl">
                  Welcome back to your pearl atelier.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1B1411]/65">
                  A soft luxury control center for your products, orders, and shop activity.
                </p>
              </div>
              <a href="#inventory" onClick={() => setActiveTab("inventory")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B1411] px-6 py-3 text-sm font-semibold text-[#FFF8EF] shadow-xl shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                Manage products <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Total Products" value={totalProducts} icon={Package} />
              <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} />
              <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={Gem} />
              <StatCard title="Low Stock Items" value={lowStock} icon={AlertCircle} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Panel className="p-6">
                <SectionLabel>Business Analytics</SectionLabel>
                <h2 className="font-serif text-3xl">Inventory and order overview</h2>
                <p className="mt-2 text-sm text-[#1B1411]/55">Quick activity snapshot from your local shop data.</p>
                <div className="mt-8">
                  <SimpleBarChart data={chartData} />
                </div>
              </Panel>

              <Panel className="p-6">
                <SectionLabel>Session Activity</SectionLabel>
                <h2 className="font-serif text-3xl">Recent changes</h2>
                <div className="mt-6 space-y-3">
                  {[
                    [Plus, "Products Added", sessionStats.added, "bg-[#CFE9DF]/75"],
                    [Pencil, "Products Updated", sessionStats.updated, "bg-[#FFFDF7]/85"],
                    [Trash2, "Products Deleted", sessionStats.deleted, "bg-[#F4C6D3]/65"],
                  ].map(([Icon, label, value, bg]) => (
                    <div key={label} className="flex items-center justify-between rounded-[1.5rem] border border-[#B89A5E]/15 bg-[#FFFDF7]/65 p-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-10 w-10 place-items-center rounded-full ${bg}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{label}</p>
                          <p className="text-xs text-[#1B1411]/45">This session</p>
                        </div>
                      </div>
                      <p className="font-serif text-2xl">{value}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div id="inventory">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <SectionLabel>Admin / Inventory</SectionLabel>
                <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[#1B1411] sm:text-6xl">
                  Product management, softened.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1B1411]/65">
                  Add, edit, and organize your pearl products using the same soft ivory, cocoa, mint, blush, and gold language as your shop.
                </p>
              </div>
              <button onClick={() => exportAsCSV("products")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/75 px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]">
                <Download className="h-4 w-4" /> Export Products
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <StatCard title="Total Products" value={totalProducts} icon={Package} />
              <StatCard title="Total Stock" value={totalStock} icon={TrendingIcon} />
              <StatCard title="Low Stock Items" value={lowStock} icon={AlertCircle} />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
              <Panel className="p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <SectionLabel>Add Product</SectionLabel>
                    <h2 className="font-serif text-3xl">New pearl piece</h2>
                    <p className="mt-1 text-sm text-[#1B1411]/55">Creates a product in your local product API.</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#CFE9DF]/75 text-[#4A3832]">
                    <Plus className="h-5 w-5" />
                  </div>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input className={fieldClass} placeholder="Product name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                  <select className={fieldClass} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                    <option>Earrings</option>
                    <option>Necklaces</option>
                    <option>Bracelets</option>
                    <option>Rings</option>
                    <option>Gift Sets</option>
                    <option>Size Guide</option>
                  </select>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <input className={fieldClass} placeholder="Price" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
                    <input className={fieldClass} placeholder="Stock" type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} />
                  </div>
                  <select className={fieldClass} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                    <option>Active</option>
                    <option>Low Stock</option>
                    <option>Hidden</option>
                  </select>
                  <textarea className={`${fieldClass} min-h-28 resize-none`} placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                  <ImagePicker preview={previewImage} onFile={(file) => handleImageFile(file, false)} />
                  <button type="submit" className="w-full rounded-full bg-[#1B1411] px-6 py-4 text-sm font-semibold text-[#FFF8EF] shadow-xl shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                    Add Product
                  </button>
                </form>
              </Panel>

              <Panel className="p-6">
                <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <SectionLabel>Inventory List</SectionLabel>
                    <h2 className="font-serif text-3xl">Pearl catalog</h2>
                    <p className="mt-1 text-sm text-[#1B1411]/55">{sortedAndFilteredProducts.length} product{sortedAndFilteredProducts.length === 1 ? "" : "s"} shown</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-[#B89A5E]/25 bg-[#FFFDF7]/75 px-4 py-3">
                      <Search className="h-4 w-4 text-[#8A6A3F]" />
                      <input className="w-40 bg-transparent text-sm outline-none placeholder:text-[#1B1411]/35" placeholder="Search product..." value={search} onChange={(event) => setSearch(event.target.value)} />
                    </div>
                    <button type="button" onClick={() => { setSearch(""); setProductCategory("all"); setSortBy("name"); }} className="grid h-11 w-11 place-items-center rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/75 transition hover:bg-[#CFE9DF]/70" title="Reset filters">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <select value={productCategory} onChange={(event) => setProductCategory(event.target.value)} className={fieldClass}>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category === "all" ? "All Categories" : category}</option>
                    ))}
                  </select>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className={fieldClass}>
                    <option value="name">Sort by Name (A-Z)</option>
                    <option value="stock-low">Sort by Stock (Low to High)</option>
                    <option value="stock-high">Sort by Stock (High to Low)</option>
                    <option value="price-low">Sort by Price (Low to High)</option>
                    <option value="price-high">Sort by Price (High to Low)</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-[0.22em] text-[#1B1411]/40">
                        <th className="px-4">Product</th>
                        <th className="px-4">Category</th>
                        <th className="px-4">Price</th>
                        <th className="px-4">Stock</th>
                        <th className="px-4">Status</th>
                        <th className="px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedAndFilteredProducts.map((product) => {
                        const statusValue = getStatus(product);
                        return (
                          <tr key={product.id} className="rounded-2xl bg-[#FFFDF7]/82 text-sm shadow-sm shadow-black/5">
                            <td className="rounded-l-2xl px-4 py-4">
                              <div className="flex items-center gap-3">
                                <img src={product.image || "/weekly-pearl-box.png"} alt={product.name} className="h-14 w-14 rounded-xl object-cover shadow-md shadow-black/10" />
                                <div>
                                  <p className="font-semibold text-[#1B1411]">{product.name}</p>
                                  <p className="text-xs text-[#1B1411]/45">ID: {product.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">{product.category}</td>
                            <td className="px-4 py-4 font-medium">{formatPrice(product.price)}</td>
                            <td className="px-4 py-4">{product.stock}</td>
                            <td className="px-4 py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusValue === "Low Stock" ? "bg-[#F4C6D3]/65" : statusValue === "Hidden" ? "bg-[#F7E8DD]" : "bg-[#CFE9DF]/75"}`}>
                                {statusValue}
                              </span>
                            </td>
                            <td className="rounded-r-2xl px-4 py-4">
                              <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => handleStartEdit(product)} className="grid h-10 w-10 place-items-center rounded-full bg-[#CFE9DF]/70 text-[#1B1411] transition hover:bg-[#B89A5E] hover:text-[#1B1411]" title="Edit product">
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button type="button" onClick={() => setDeleteConfirm(product.id)} className="grid h-10 w-10 place-items-center rounded-full bg-[#F4C6D3]/65 text-[#1B1411] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]" title="Delete product">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {sortedAndFilteredProducts.length === 0 && (
                    <EmptyState title="No products found" copy="Try clearing the filters or add a new product from the form." />
                  )}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <SectionLabel>Admin / Orders</SectionLabel>
                <h1 className="max-w-3xl font-serif text-5xl leading-tight text-[#1B1411] sm:text-6xl">
                  Order management with a softer touch.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#1B1411]/65">
                  Track customer activity while keeping the same polished, calm PEARLfectly feel.
                </p>
              </div>
              <button onClick={() => exportAsCSV("orders")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/75 px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]">
                <Download className="h-4 w-4" /> Export Orders
              </button>
            </div>

            <Panel className="mt-8 p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <SectionLabel>Recent Orders</SectionLabel>
                  <h2 className="font-serif text-3xl">Customer orders</h2>
                  <p className="mt-1 text-sm text-[#1B1411]/55">{filteredOrders.length} order{filteredOrders.length === 1 ? "" : "s"} shown</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-[#B89A5E]/25 bg-[#FFFDF7]/75 px-4 py-3">
                    <Search className="h-4 w-4 text-[#8A6A3F]" />
                    <input className="w-40 bg-transparent text-sm outline-none placeholder:text-[#1B1411]/35" placeholder="Search order..." value={orderSearch} onChange={(event) => setOrderSearch(event.target.value)} />
                  </div>
                  <select value={orderFilter} onChange={(event) => setOrderFilter(event.target.value)} className="rounded-full border border-[#B89A5E]/25 bg-[#FFFDF7]/75 px-4 py-3 text-sm outline-none focus:border-[#B89A5E]">
                    <option value="all">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.22em] text-[#1B1411]/40">
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
                      <tr key={order.id} className="rounded-2xl bg-[#FFFDF7]/82 text-sm shadow-sm shadow-black/5">
                        <td className="rounded-l-2xl px-4 py-4 font-semibold">{order.id}</td>
                        <td className="px-4 py-4">{order.customer}</td>
                        <td className="px-4 py-4">{order.items}</td>
                        <td className="px-4 py-4 font-medium">{formatPrice(order.total)}</td>
                        <td className="px-4 py-4 text-[#1B1411]/60">{order.date ? new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}</td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.status === "Completed" ? "bg-[#CFE9DF]/75" : order.status === "Pending" ? "bg-[#F4C6D3]/65" : "bg-[#F7E8DD]"}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <EmptyState title="No orders yet" copy="Orders will appear here once your checkout flow starts saving them." />
                )}
              </div>
            </Panel>
          </div>
        )}
      </section>

      {editingProduct && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B1411]/55 p-4 backdrop-blur-sm">
          <form onSubmit={handleUpdateProduct} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2.5rem] border border-white/60 bg-[#FFF8EF]/92 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <SectionLabel>Edit Product</SectionLabel>
                <h2 className="font-serif text-3xl">Refine pearl details</h2>
                <p className="mt-1 text-sm text-[#1B1411]/55">Update the selected product.</p>
              </div>
              <button type="button" onClick={() => setEditingProduct(null)} className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF7]/80 transition hover:bg-[#F4C6D3]/70">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input className={fieldClass} placeholder="Product name" value={editForm.name} onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} />
              <select className={fieldClass} value={editForm.category} onChange={(event) => setEditForm({ ...editForm, category: event.target.value })}>
                <option>Earrings</option>
                <option>Necklaces</option>
                <option>Bracelets</option>
                <option>Rings</option>
                <option>Gift Sets</option>
                <option>Size Guide</option>
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={fieldClass} placeholder="Price" type="number" value={editForm.price} onChange={(event) => setEditForm({ ...editForm, price: event.target.value })} />
                <input className={fieldClass} placeholder="Stock" type="number" value={editForm.stock} onChange={(event) => setEditForm({ ...editForm, stock: event.target.value })} />
              </div>
              <select className={fieldClass} value={editForm.status} onChange={(event) => setEditForm({ ...editForm, status: event.target.value })}>
                <option>Active</option>
                <option>Low Stock</option>
                <option>Hidden</option>
              </select>
              <textarea className={`${fieldClass} min-h-28 resize-none`} placeholder="Description" value={editForm.description} onChange={(event) => setEditForm({ ...editForm, description: event.target.value })} />
              <ImagePicker preview={editPreviewImage} onFile={(file) => handleImageFile(file, true)} label="Drop replacement image here" />

              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                <button type="submit" className="rounded-full bg-[#1B1411] px-6 py-4 text-sm font-semibold text-[#FFF8EF] shadow-xl shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingProduct(null)} className="rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/65 px-6 py-4 text-sm font-semibold transition hover:bg-[#CFE9DF]/70">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B1411]/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2.5rem] border border-white/60 bg-[#FFF8EF]/92 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <SectionLabel>Confirm Delete</SectionLabel>
            <h2 className="font-serif text-3xl">Delete product?</h2>
            <p className="mt-3 text-sm leading-7 text-[#1B1411]/60">
              This will remove the product from your local inventory file and the shop page after refresh.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => handleDeleteProduct(deleteConfirm)} className="rounded-full bg-[#F4C6D3] px-6 py-3 text-sm font-semibold text-[#1B1411] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]">
                Delete
              </button>
              <button type="button" onClick={() => setDeleteConfirm(null)} className="rounded-full border border-[#B89A5E]/35 bg-[#FFFDF7]/65 px-6 py-3 text-sm font-semibold transition hover:bg-[#CFE9DF]/70">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 max-w-[calc(100vw-2rem)]">
          <div className={`flex items-center gap-3 rounded-full border border-white/60 px-6 py-4 shadow-2xl shadow-black/10 backdrop-blur-xl ${toast.type === "success" ? "bg-[#CFE9DF]/95" : "bg-[#F4C6D3]/95"}`}>
            {toast.type === "success" ? <ShieldCheck className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <p className="text-sm font-semibold text-[#1B1411]">{toast.message}</p>
            <button type="button" onClick={() => setToast(null)} className="ml-1 opacity-70 transition hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function TrendingIcon(props) {
  return <Sparkles {...props} />;
}
