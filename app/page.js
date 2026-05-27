"use client"; 

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  Menu, 
  X,
  ChevronDown,
  Globe2,
  Gift,
  ShieldCheck,
  Sparkles,
  Gem,
  Leaf,
  HandHeart,
  Award,
  Truck,
  CreditCard,
  Camera,
  Mail,
  UserRound,
  MessageCircle,
  ZoomIn,
  SlidersHorizontal,
  Moon,
  Sun,
  ArrowRight,
  Quote,
  Plus,
  Minus,
} from "lucide-react";

const palette = {
  pearl: "#FFF8EF",     
  mint: "#CFE9DF",       
  mintDeep: "#9CCDC0",
  blush: "#F4C6D3",    
  gold: "#B89A5E",       
  cocoa: "#4A3832",
  ivory: "#FFFDF7",
  black: "#1B1411",
};

const collections = [
  {
    title: "Weekly Pearl Stud Sets",
    copy: "A soft mint presentation box with pearl studs curated for every weekday mood.",
    image: "/weekly-pearl-box.png",
  },
  {
    title: "Blush Gift Boxes",
    copy: "Velvet-inspired pink packaging made for gifting luminous pearl earrings.",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    title: "Stud Size Guide",
    copy: "Classic pearl studs from dainty 10 mm to extra-large 16 mm statement pairs.",
    image: "/pearl-size-guide.png",
  },
  {
    title: "Classic Pearl Studs",
    copy: "Clean, polished pearl pairs with soft gold details and timeless everyday elegance.",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    title: "Pearlfectly Essentials",
    copy: "A refined starter collection of soft pink, ivory, champagne, and gray pearl tones.",
    image: "/weekly-pearl-box.png",
  },
];

const products = [
  {
    id: 1,
    name: "Weekly Pearl Stud Set",
    category: "Earrings",
    price: 1280,
    rating: 5,
    tag: "Best Seller",
    metal: "Gold-tone Setting",
    pearl: "Mixed Pearl Studs",
    image: "/weekly-pearl-box.png",
  },
  {
    id: 2,
    name: "Classic Pearl Gift Box",
    category: "Earrings",
    price: 960,
    rating: 5,
    tag: "Gift Pick",
    metal: "Soft Gold Base",
    pearl: "White Pearl Studs",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 3,
    name: "Blush Pearl Size Set",
    category: "Earrings",
    price: 720,
    rating: 4,
    tag: "Size Guide",
    metal: "Gold-tone Backing",
    pearl: "Pink Pearl Studs",
    image: "/pearl-size-guide.png",
  },
  {
    id: 4,
    name: "Dainty Pearl Duo",
    category: "Earrings",
    price: 840,
    rating: 5,
    tag: "Dainty",
    metal: "Gold-tone Setting",
    pearl: "Ivory Pearl Studs",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 5,
    name: "Pearl Glow Pendant",
    category: "Necklaces",
    price: 1180,
    rating: 5,
    tag: "New Arrival",
    metal: "Gold-tone Chain",
    pearl: "Ivory Pearl Pendant",
    image: "/weekly-pearl-box.png",
  },
  {
    id: 6,
    name: "Soft Mint Pearl Bracelet",
    category: "Bracelets",
    price: 1120,
    rating: 5,
    tag: "Everyday",
    metal: "Adjustable Gold-tone Clasp",
    pearl: "Freshwater Pearls",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 7,
    name: "Blush Pearl Ring",
    category: "Rings",
    price: 890,
    rating: 5,
    tag: "Minimal",
    metal: "Gold-tone Band",
    pearl: "Single Blush Pearl",
    image: "/pearl-size-guide.png",
  },
  {
    id: 8,
    name: "Pearlfectly Essentials Box",
    category: "Earrings",
    price: 1480,
    rating: 5,
    tag: "Signature Box",
    metal: "Mixed Gold-tone Backs",
    pearl: "Ivory, Pink, and Champagne Pearls",
    image: "/weekly-pearl-box.png",
  },
];

const testimonials = [
  {
    name: "Isabelle Laurent",
    role: "Bride, Paris",
    review:
      "The bridal pearls felt personal, refined, and unforgettable. Every detail arrived beautifully presented.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Maya Ellington",
    role: "Collector",
    review:
      "PEARLfectly Pearls has the rare balance of modern design and true heirloom quality.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Claire Bennett",
    role: "Gift Client",
    review:
      "Elegant service, secure checkout, and packaging that felt like opening a private atelier box.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=85",
  },
];


const gallery = [
  "/weekly-pearl-box.png",
  "/pink-pearl-gift-boxes.png",
  "/pearl-size-guide.png",
  "/weekly-pearl-box.png",
  "/pink-pearl-gift-boxes.png",
  "/pearl-size-guide.png",
];

const faqs = [
  {
    q: "Are PEARLfectly Pearls sustainably sourced?",
    a: "Yes. We work with vetted pearl farms and partners who prioritize responsible cultivation, traceability, and long-term marine stewardship.",
  },
  {
    q: "Can I request a custom bridal piece?",
    a: "Yes. Our private consultation process allows you to select pearl type, metal finish, length, silhouette, and personalized finishing details.",
  },
  {
    q: "Do you offer lifetime care?",
    a: "Each fine jewelry piece includes access to cleaning guidance, inspection support, and restringing recommendations for long-term preservation.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" },
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function SectionLabel({ children, dark = false }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-[#B89A5E]" />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.32em] ${
          dark ? "text-[#B89A5E]" : "text-[#8A6A3F]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function LuxuryButton({ children, variant = "primary", className = "", onClick, href }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B89A5E]/50";
  const styles =
    variant === "primary"
      ? "bg-[#1B1411] text-[#FFF8EF] shadow-xl shadow-black/10 hover:bg-[#B89A5E] hover:text-[#1B1411]"
      : variant === "light"
      ? "bg-[#CFE9DF]/95 text-[#1B1411] shadow-sm hover:bg-[#F4C6D3] hover:text-[#1B1411] backdrop-blur"
      : "border border-[#B89A5E]/60 text-current hover:border-[#B89A5E] hover:bg-[#CFE9DF]/25";

  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  );
}

function Navbar({ darkMode, setDarkMode, onSearch, onCart, cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  const navLinks = [
    { label: "SHOP", href: "#shop", hasDropdown: true },
    { label: "THE PEARLFECTLY EXPERIENCE", href: "#collections" },
    { label: "ABOUT", href: "#about" },
  ];

  const shopMegaMenu = [
    {
      title: "BY PEARL TYPE",
      items: ["Freshwater", "Akoya", "South Sea", "Tahitian", "All Types"],
    },
    {
      title: "BY JEWELRY STYLE",
      items: ["Earrings", "Necklaces", "Bracelets", "Rings", "Gift Sets", "All Styles"],
    },
    {
      title: "BY PEARL COLOR",
      items: ["White", "Pink", "Lavender", "Golden", "Black", "Multicolor"],
    },
  ];

  const navText =
    "text-[#4A3832] drop-shadow-[0_1px_8px_rgba(255,248,239,0.85)] transition-colors duration-300 group-hover/nav:text-[#FFF8EF] group-focus-within/nav:text-[#FFF8EF] dark:text-[#4A3832] dark:group-hover/nav:text-[#FFF8EF] dark:group-focus-within/nav:text-[#FFF8EF]";

  const iconButton =
    "grid h-12 w-12 place-items-center rounded-full text-[#4A3832] drop-shadow-[0_1px_8px_rgba(255,248,239,0.85)] transition duration-300 hover:bg-[#4A3832]/20 hover:text-[#FFF8EF] group-hover/nav:text-[#FFF8EF] group-hover/nav:drop-shadow-none group-focus-within/nav:text-[#FFF8EF] group-focus-within/nav:drop-shadow-none dark:text-[#4A3832] dark:hover:bg-white/10 dark:group-hover/nav:text-[#FFF8EF] dark:group-focus-within/nav:text-[#FFF8EF]";

  return (
    <header className="group/nav fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent shadow-none transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-gradient-to-b before:from-black/25 before:via-black/10 before:to-transparent before:opacity-100 before:transition-opacity before:duration-300 hover:border-[#D8C7A3]/40 hover:bg-[#FFF8EF]/95 hover:shadow-sm hover:shadow-black/5 hover:backdrop-blur-xl hover:before:opacity-0 focus-within:border-[#D8C7A3]/40 focus-within:bg-[#FFF8EF]/95 focus-within:shadow-sm focus-within:shadow-black/5 focus-within:backdrop-blur-xl focus-within:before:opacity-0 dark:hover:border-white/10 dark:hover:bg-[#1B1411]/95 dark:focus-within:border-white/10 dark:focus-within:bg-[#1B1411]/95">
      <div className="relative z-10 mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-14">
        <div className="relative flex h-[8.25rem] items-center justify-center">
          <button onClick={onSearch} className={`absolute left-0 ${iconButton}`} aria-label="Search">
            <Search className="h-6 w-6 stroke-[1.6]" />
          </button>

          <a href="#home" className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="PEARLfectly logo"
              className="mb-2 h-12 w-12 rounded-full border border-[#B89A5E]/40 bg-[#FFFDF7] object-cover p-1 shadow-md"
            />
            <span className={`font-serif text-4xl leading-none tracking-[0.12em] ${navText}`}>
              PEARL<span className="tracking-normal">fectly</span>
            </span>
            <span className={`mt-1 text-[12px] font-semibold uppercase tracking-[0.38em] ${navText}`}>
              PEARLS
            </span>
          </a>

          <div className="absolute right-0 hidden items-center gap-6 sm:flex">
            <button className={iconButton} aria-label="Account">
              <UserRound className="h-6 w-6 stroke-[1.6]" />
            </button>
            <button className={iconButton} aria-label="Messages">
              <MessageCircle className="h-6 w-6 stroke-[1.6]" />
            </button>
            <button onClick={onCart} className={`relative ${iconButton}`} aria-label="Open cart">
              <ShoppingBag className="h-6 w-6 stroke-[1.6]" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#B89A5E] px-1 text-[10px] font-semibold text-[#1B1411] shadow-sm">
                {cartCount}
              </span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={iconButton} aria-label="Toggle theme">
              {darkMode ? <Sun className="h-6 w-6 stroke-[1.6]" /> : <Moon className="h-6 w-6 stroke-[1.6]" />}
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="absolute right-0 grid h-11 w-11 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#CFE9DF]/70 hover:text-[#4A3832] dark:text-[#4A3832] dark:hover:bg-white/10 sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="hidden h-12 items-center justify-center gap-10 border-t border-[#B89A5E]/20 lg:flex">
          {navLinks.map((link) => {
            const isShop = link.label === "SHOP";

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => isShop && setMega(true)}
                onMouseLeave={() => isShop && setMega(false)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.28em] hover:text-[#4A3832] ${navText}`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 stroke-[1.5]" />}
                </a>

                <AnimatePresence>
                  {isShop && mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-1/2 top-11 z-[80] w-[960px] max-w-[calc(100vw-3rem)] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-[#D8C7A3]/40 bg-[#FFF8EF]/95 px-12 py-10 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#1B1411]/95"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#CFE9DF]/55 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-[#F4C6D3]/45 blur-3xl" />

                      <div className="relative grid gap-10 md:grid-cols-[1fr_1fr_1fr_0.9fr]">
                        {shopMegaMenu.map((group) => (
                          <div key={group.title}>
                            <h3 className="mb-5 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.24em] text-[#8A6A3F] dark:text-[#B89A5E]">
                              {group.title}
                            </h3>

                            <div className="space-y-2.5">
                              {group.items.map((item) => (
                                <a
                                  key={item}
                                  href="#shop"
                                  className="block rounded-full px-3 py-2 text-[15px] font-medium capitalize text-[#4A3832]/80 transition duration-300 hover:bg-[#F3E7D6]/70 hover:text-[#4A3832] dark:text-[#FFF8EF]/75 dark:hover:bg-white/10"
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="rounded-[1.5rem] border border-[#B89A5E]/25 bg-[#FFFDF7]/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B89A5E]">
                            Gift-ready
                          </p>
                          <p className="mt-3 font-serif text-2xl leading-tight text-[#1B1411] dark:text-[#FFF8EF]">
                            Pearl boxes made for soft luxury gifting.
                          </p>
                          <a href="#shop" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8A6A3F] hover:text-[#4A3832] dark:text-[#B89A5E]">
                            Shop new arrivals <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="ml-auto h-full w-[86%] max-w-sm bg-[#FFF8EF] p-6 dark:bg-[#1B1411]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="PEARLfectly logo" className="h-12 w-12 rounded-full border border-[#B89A5E]/40 bg-[#FFFDF7] object-cover p-1" />
                  <div>
                    <p className="font-serif text-2xl tracking-[0.12em] text-[#1B1411] dark:text-[#FFF8EF]">PEARLfectly</p>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#8A6A3F] dark:text-[#B89A5E]">PEARLS</p>
                  </div>
                </div>

                <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Close menu">
                  <X className="text-[#1B1411] dark:text-[#FFF8EF]" />
                </button>
              </div>

              <div className="mt-10 space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[#B89A5E]/20 pb-4 font-serif text-2xl text-[#1B1411] dark:text-[#FFF8EF]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-4 gap-3">
                <button onClick={onSearch} className="grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] dark:text-[#FFF8EF]" aria-label="Search">
                  <Search className="h-5 w-5" />
                </button>
                <button className="grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] dark:text-[#FFF8EF]" aria-label="Account">
                  <UserRound className="h-5 w-5" />
                </button>
                <button onClick={onCart} className="relative grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] dark:text-[#FFF8EF]" aria-label="Open cart">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#B89A5E] px-1 text-[10px] font-semibold text-[#1B1411]">
                    {cartCount}
                  </span>
                </button>
                <button onClick={() => setDarkMode(!darkMode)} className="grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] dark:text-[#FFF8EF]" aria-label="Toggle theme">
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#FFF8EF] pt-[190px] text-[#1B1411]"
    >
      <div className="absolute inset-0">
        <img
          src="/background.png"
          alt="Elegant pearl jewelry hero photography"
          className="h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8EF]/95 via-[#FFF8EF]/78 to-[#FFF8EF]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(207,233,223,0.45),transparent_30%),radial-gradient(circle_at_20%_90%,rgba(244,198,211,0.35),transparent_34%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(108vh-190px)] max-w-[1280px] items-center px-6 pb-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full rounded-[3rem] border border-white/60 bg-[#FFF8EF]/72 p-8 shadow-2xl shadow-black/5 backdrop-blur-md lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_340px] xl:grid-cols-[minmax(0,820px)_340px] lg:items-center">
            <div className="min-w-0">
              <SectionLabel dark>Pearlfectly Pearls</SectionLabel>

              <h1 className="max-w-[820px] font-serif text-5xl leading-[0.96] tracking-tight sm:text-6xl lg:text-[76px] xl:text-[84px]">
                Pearls made for soft everyday elegance.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#1B1411]/75 sm:text-lg">
                Discover luminous pearl studs, gift-ready sets, and pastel boxes designed for refined everyday wear and thoughtful gifting.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <LuxuryButton href="#shop" variant="primary">Shop Collection</LuxuryButton>
                <LuxuryButton href="#shop" variant="outline" className="text-[#1B1411]">
                  Find Your Pearl Size
                </LuxuryButton>
              </div>
            </div>

            <div className="relative hidden min-h-[390px] w-full max-w-[340px] self-center overflow-hidden rounded-[2.5rem] border border-[#B89A5E]/30 bg-[#FFFDF7]/78 p-7 shadow-2xl shadow-black/5 backdrop-blur-xl lg:flex lg:items-center lg:justify-center">
              <div className="pointer-events-none absolute -top-16 left-10 h-[160%] w-28 rotate-12 bg-white/35 blur-sm" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#CFE9DF]/60 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-[#F4C6D3]/45 blur-2xl" />

              <div className="relative w-full">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-[#B89A5E]/30 bg-[#FFF8EF]/90 text-[#B89A5E] shadow-sm">
                  <UserRound className="h-6 w-6 stroke-[1.5]" />
                </div>

                <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#8A6A3F]">
                  Pearl Member Access
                </p>

                <h2 className="mt-3 text-center font-serif text-3xl text-[#1B1411]">
                  Welcome Back
                </h2>

                <p className="mx-auto mt-3 max-w-[260px] text-center text-sm leading-6 text-[#1B1411]/60">
                  Access your saved pearl sets, gift picks, and recent viewing history.
                </p>

                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#B89A5E]/35 to-transparent" />

                <div className="space-y-3">
                  <button className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#B89A5E]/40 bg-[#FFF8EF]/70 px-5 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#CFE9DF]/70">
                    Sign In
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>

                  <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#1B1411] px-5 py-3 text-sm font-medium text-[#FFF8EF] shadow-lg shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]">
                    Create Account
                    <Sparkles className="h-4 w-4" />
                  </button>

                  <button className="w-full rounded-full bg-[#CFE9DF]/85 px-5 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#F4C6D3]/75">
                    Continue Viewing
                  </button>
                </div>

                <p className="mt-5 text-center text-[11px] leading-5 text-[#1B1411]/40">
                  Soft luxury, saved for your next visit.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Gift, title: "Gift-ready packaging", copy: "Ivory boxes, soft ribbons, and polished presentation." },
    { icon: ShieldCheck, title: "Quality checked", copy: "Each piece is inspected for luster, surface, and finish." },
    { icon: Truck, title: "Tracked delivery", copy: "Clear shipping flow for local and gift orders." },
    { icon: CreditCard, title: "Secure checkout", copy: "A calmer buying experience from cart to payment." },
  ];

  return (
    <section className="bg-[#FFF8EF] px-6 py-12 dark:bg-[#161616] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="rounded-[1.75rem] border border-[#B89A5E]/20 bg-[#FFFDF7] p-5 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#CFE9DF]/70 text-[#8A6A3F] dark:bg-[#B89A5E]/15 dark:text-[#B89A5E]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1B1411] dark:text-[#FFF8EF]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#1B1411]/65 dark:text-white/60">{item.copy}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section id="collections" className="bg-[#DCEFE8] px-6 py-24 dark:bg-[#1B1411] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Featured Collections</SectionLabel>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">
              Soft packaging, polished pearls, and gift-ready details.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#1B1411]/75 dark:text-white/65">
            Inspired by mint jewelry trays, blush velvet boxes, creamy silk backdrops, and classic black typography.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {collections.map((item, index) => (
            <motion.article
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="font-serif text-3xl">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.copy}</p>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#B89A5E]">
                  View Collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onQuickView, addToCart }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.article {...fadeUp} className="group overflow-hidden rounded-[2rem] border border-[#B89A5E]/20 bg-[#FFF8EF] shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7E8DD]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
        <div className="absolute left-4 top-4 rounded-full bg-[#FFF8EF]/90 px-4 py-2 text-xs font-semibold text-[#1B1411] backdrop-blur">
          {product.tag}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#FFF8EF]/90 text-[#1B1411] backdrop-blur transition hover:bg-[#B89A5E]"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-[#1B1411]" : ""}`} />
        </button>
        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={() => onQuickView(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1B1411] px-4 py-3 text-sm text-[#FFF8EF] hover:bg-[#B89A5E] hover:text-[#1B1411]">
            <ZoomIn className="h-4 w-4" /> Quick View
          </button>
          <button onClick={() => addToCart(product)} className="grid h-12 w-12 place-items-center rounded-full bg-[#FFF8EF] text-[#1B1411] hover:bg-[#B89A5E]" aria-label={`Add ${product.name} to cart`}>
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-1 text-[#B89A5E]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : "opacity-25"}`} />
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#8A6A3F] dark:text-[#B89A5E]">{product.category}</p>
        <h3 className="mt-2 font-serif text-2xl text-[#1B1411] dark:text-[#FFF8EF]">{product.name}</h3>
        <p className="mt-2 text-sm text-[#1B1411]/70 dark:text-white/60">{product.pearl} · {product.metal}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="font-serif text-2xl text-[#1B1411] dark:text-[#FFF8EF]">{formatPrice(product.price)}</p>
          <button onClick={() => addToCart(product)} className="rounded-full px-4 py-2 text-sm font-semibold text-[#8A6A3F] transition hover:bg-[#F3E7D6]/70 hover:text-[#1B1411] dark:text-[#B89A5E] dark:hover:bg-white/10 dark:hover:text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProductShowcase({ onQuickView, addToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Earrings", "Necklaces", "Bracelets", "Rings"];
  const visible =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="shop" className="bg-[#FFF8EF] px-6 py-24 dark:bg-[#161616] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Shop the Edit</SectionLabel>
            <h2 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">
              Best sellers & new arrivals
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">
              Give visitors something to buy immediately: clear product cards, visible prices, quick view, and add-to-cart actions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full border border-[#B89A5E]/20 bg-[#F7E8DD] p-2 dark:border-white/10 dark:bg-white/5">
            <span className="grid h-10 w-10 place-items-center rounded-full text-[#8A6A3F] dark:text-[#B89A5E]"><SlidersHorizontal className="h-4 w-4" /></span>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-[#1B1411] text-[#FFF8EF] dark:bg-[#B89A5E] dark:text-[#1B1411]"
                    : "text-[#1B1411] hover:bg-white dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  const values = [
    { icon: Leaf, title: "Sustainable pearl sourcing", copy: "Pearls are selected through responsible partners who respect marine ecosystems and cultivation cycles." },
    { icon: HandHeart, title: "Handmade craftsmanship", copy: "Every setting is finished by skilled artisans, balancing strength, comfort, and graceful proportion." },
    { icon: Gem, title: "Luxury materials", copy: "Fine pearls meet precious metals, silk-thread stringing, and luminous gold accents." },
    { icon: Award, title: "Quality assurance", copy: "Each piece is inspected for luster, surface, symmetry, nacre, and lasting wearability." },
  ];

  return (
    <section id="craftsmanship" className="relative overflow-hidden bg-[#1B1411] px-6 py-24 text-[#FFF8EF] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,180,131,0.2),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(255,253,249,0.08),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel dark>Craftsmanship</SectionLabel>
          <h2 className="font-serif text-4xl leading-tight sm:text-6xl">A modern atelier approach to pearl jewelry.</h2>
          <p className="mt-6 text-base leading-8 text-white/70">
            PEARLfectly Pearls begins with the pearl itself: its glow, movement, and character. From there, each silhouette is drawn, balanced, finished, and inspected to preserve the natural elegance of the gem.
          </p>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="font-serif text-2xl text-[#B89A5E]">“True luxury is quiet. It is seen in restraint, felt in finish, and remembered through time.”</p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.09]"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-[#B89A5E]/15 text-[#B89A5E]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{value.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductDetailLayout({ addToCart }) {
  const [variant, setVariant] = useState("Gold-tone Backing");
  const [quantity, setQuantity] = useState(1);
  const product = products[0];
  const variants = ["Gold-tone Backing", "Silver-tone Backing", "Rose-gold Tone"];

  return (
    <section className="bg-[#F7E8DD] px-6 py-24 dark:bg-[#1B1411] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <div className="mx-auto flex justify-center"><SectionLabel>Product Detail Preview</SectionLabel></div>
          <h2 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">Clearer product buying flow</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">
            A stronger product section builds trust with size options, reviews, secure checkout cues, and a working add-to-cart action.
          </p>
        </motion.div>

        <div className="grid gap-8 rounded-[2.5rem] border border-[#B89A5E]/20 bg-[#FFF8EF] p-4 shadow-2xl shadow-black/5 dark:border-white/10 dark:bg-white/[0.04] lg:grid-cols-2 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-[0.22fr_1fr]">
            <div className="hidden gap-4 sm:grid">
              {[product.image, products[1].image, products[2].image].map((img, index) => (
                <button key={`${img}-${index}`} className="overflow-hidden rounded-2xl border border-[#B89A5E]/20 bg-[#F7E8DD]">
                  <img src={img} alt="Pearl product thumbnail" className="aspect-square h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] bg-[#F7E8DD]">
              <img src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute right-5 top-5 rounded-full bg-[#FFF8EF]/90 p-3 text-[#1B1411] backdrop-blur">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-2 lg:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#8A6A3F] dark:text-[#B89A5E]">Pearl Stud Earrings</p>
            <h3 className="mt-3 font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF] sm:text-5xl">{product.name}</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-[#B89A5E]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-sm text-[#1B1411]/65 dark:text-white/60">48 customer reviews</span>
            </div>
            <p className="mt-6 font-serif text-3xl text-[#1B1411] dark:text-[#FFF8EF]">{formatPrice(product.price)}</p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#1B1411]/75 dark:text-white/65">
              A luminous pearl stud set inspired by soft blush boxes, mint packaging, and warm gold details. Designed for clean product display, gifting, and everyday quiet luxury.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="mb-3 text-sm font-medium text-[#1B1411] dark:text-[#FFF8EF]">Pearl / Backing Finish</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((item) => (
                    <button
                      key={item}
                      onClick={() => setVariant(item)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        variant === item
                          ? "border-[#1B1411] bg-[#1B1411] text-[#FFF8EF] dark:border-[#B89A5E] dark:bg-[#B89A5E] dark:text-[#1B1411]"
                          : "border-[#B89A5E]/30 text-[#1B1411] hover:border-[#B89A5E] hover:bg-[#F3E7D6]/60 dark:text-white/70 dark:hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-[#B89A5E]/30">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
                  <span className="min-w-10 text-center text-sm text-[#1B1411] dark:text-[#FFF8EF]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
                </div>
                <LuxuryButton onClick={() => Array.from({ length: quantity }).forEach(() => addToCart(product))} className="flex-1 sm:flex-none">
                  Add to Cart
                </LuxuryButton>
                <button className="grid h-12 w-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] hover:bg-[#CFE9DF]/70 dark:text-[#FFF8EF]">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, "Authenticity"],
                [Truck, "Tracked shipping"],
                [CreditCard, "Secure checkout"],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-2 rounded-2xl bg-[#F7E8DD] p-3 text-xs text-[#1B1411] dark:bg-white/5 dark:text-white/65">
                  <Icon className="h-4 w-4 text-[#B89A5E]" /> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LuxuryExperience() {
  const perks = [
    { icon: Globe2, title: "Worldwide shipping", copy: "Tracked, insured delivery for international clients and gifting." },
    { icon: Gift, title: "Luxury gift packaging", copy: "Signature ivory boxes, satin ribbons, and handwritten notes." },
    { icon: Sparkles, title: "Lifetime care service", copy: "Guidance, inspection, cleaning advice, and heirloom preservation." },
    { icon: ShieldCheck, title: "Secure payments", copy: "Encrypted checkout with polished, trustworthy purchase flow." },
  ];

  return (
    <section className="bg-[#FFF8EF] px-6 py-24 dark:bg-[#161616] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <div className="mx-auto flex justify-center"><SectionLabel>Luxury Experience</SectionLabel></div>
          <h2 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">A soft, gift-ready experience.</h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="rounded-[2rem] border border-[#B89A5E]/20 bg-gradient-to-br from-[#FFF8EF] to-[#F7E8DD] p-7 shadow-xl shadow-black/5 transition hover:-translate-y-1 dark:border-white/10 dark:from-white/[0.07] dark:to-white/[0.03]"
              >
                <div className="mb-7 grid h-14 w-14 place-items-center rounded-full bg-[#B89A5E]/20 text-[#8A6A3F] dark:text-[#B89A5E]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1B1411] dark:text-[#FFF8EF]">{perk.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">{perk.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section id="testimonials" className="bg-[#F7E8DD] px-6 py-24 dark:bg-[#1B1411] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-serif text-4xl leading-tight text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">Loved by brides, collectors, and thoughtful gift-givers.</h2>
          <div className="mt-8 flex gap-3">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition-all ${active === index ? "w-10 bg-[#B89A5E]" : "w-2.5 bg-[#B89A5E]/30"}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#B89A5E]/25 to-transparent blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[2.5rem] border border-[#B89A5E]/20 bg-[#FFF8EF] p-8 shadow-2xl shadow-black/5 dark:border-white/10 dark:bg-white/[0.04] sm:p-10"
            >
              <Quote className="mb-8 h-10 w-10 text-[#B89A5E]" />
              <p className="font-serif text-3xl leading-snug text-[#1B1411] dark:text-[#FFF8EF] sm:text-4xl">“{current.review}”</p>
              <div className="mt-8 flex items-center gap-4">
                <img src={current.image} alt={current.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-[#1B1411] dark:text-[#FFF8EF]">{current.name}</p>
                  <p className="text-sm text-[#1B1411]/65 dark:text-white/60">{current.role}</p>
                </div>
                <div className="ml-auto hidden text-[#B89A5E] sm:flex">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-[#1B1411] px-6 py-24 text-[#FFF8EF] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel dark>Social Gallery</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-6xl">Mint, blush, pearl, and gold.</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm text-[#B89A5E]">  </button>
        </motion.div>
        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {gallery.map((img, index) => (
            <motion.div
              key={`${img}-${index}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className={`group overflow-hidden rounded-[2rem] ${index === 0 || index === 3 ? "md:row-span-2" : ""} ${index === 1 ? "md:col-span-2" : ""}`}
            >
              <img src={img} alt="Luxury pearl lifestyle gallery" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#F7E8DD] px-6 py-24 dark:bg-[#1B1411] sm:px-8 lg:px-10">
      <motion.div {...fadeUp} className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-[#B89A5E]/25 bg-[#1B1411] p-8 text-center text-[#FFF8EF] shadow-2xl shadow-black/10 sm:p-14">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#B89A5E]/20 text-[#B89A5E]">
          <Mail className="h-7 w-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#B89A5E]">Join the PEARLfectly Circle</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Private launches, care rituals, and VIP offers.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65">
          Receive exclusive collection previews, bridal styling notes, and pearl care guidance from the PEARLfectly atelier.
        </p>
        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur sm:flex-row">
          <input className="min-h-12 flex-1 bg-transparent px-5 text-sm text-white placeholder:text-white/50 focus:outline-none" placeholder="Enter your email address" type="email" aria-label="Email address" />
          <button className="rounded-full bg-[#B89A5E] px-6 py-3 text-sm font-medium text-[#1B1411] transition hover:bg-[#FFF8EF]">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[#FFF8EF] px-6 py-24 dark:bg-[#161616] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">Questions before the sparkle?</h2>
          <p className="mt-5 text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">A premium buying experience should feel clear, calm, and secure from discovery to delivery.</p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <motion.div key={item.q} {...fadeUp} className="rounded-[1.5rem] border border-[#B89A5E]/20 bg-[#F7E8DD] dark:border-white/10 dark:bg-white/[0.04]">
              <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                <span className="font-serif text-xl text-[#1B1411] dark:text-[#FFF8EF]">{item.q}</span>
                <ChevronDown className={`h-5 w-5 text-[#B89A5E] transition ${open === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#1B1411] px-6 py-16 text-[#FFF8EF] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PEARLfectly logo" className="h-12 w-12 rounded-full object-cover shadow-inner" />
              <span className="font-serif text-2xl tracking-[0.2em]">PEARLfectly PEARLS</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">Modern pearl jewelry crafted for weddings, refined gifting, and heirloom collections. Designed with luminous restraint and atelier-level care.</p>
          </div>
          {[
            ["Service", ["Contact", "Shipping", "Care Guide", "Returns"]],
            ["Visit", ["Private Consultation", "Instagram", "Pinterest", "Newsletter"]],
          ].map(([title, items]) => (
            <div key={title}>
              <p className="font-serif text-xl text-[#B89A5E]">{title}</p>
              <div className="mt-5 space-y-3">
                {items.map((item) => <a key={item} href="#" className="block text-sm text-white/60 transition hover:text-[#4A3832]">{item}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-xs uppercase tracking-[0.25em] text-white/40 sm:flex-row">
          <p>© 2026 PEARLfectly Pearls. All rights reserved.</p>
          <p>Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}

function SearchOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-[#1B1411]/80 p-4 backdrop-blur-md">
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="mx-auto mt-24 max-w-3xl rounded-[2rem] bg-[#FFF8EF] p-6 shadow-2xl dark:bg-[#161616]">
            <div className="flex items-center gap-3 border-b border-[#B89A5E]/20 pb-4">
              <Search className="h-5 w-5 text-[#B89A5E]" />
              <input autoFocus placeholder="Search pearls, bridal, Akoya, earrings..." className="flex-1 bg-transparent text-lg text-[#1B1411] outline-none placeholder:text-[#1B1411]/40 dark:text-[#FFF8EF]" />
              <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"><X className="h-5 w-5 text-[#1B1411] dark:text-[#FFF8EF]" /></button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {products.slice(0, 2).map((product) => (
                <div key={product.id} className="flex gap-4 rounded-2xl bg-[#F7E8DD] p-3 dark:bg-white/5">
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div>
                    <p className="font-serif text-lg text-[#1B1411] dark:text-[#FFF8EF]">{product.name}</p>
                    <p className="mt-1 text-sm text-[#1B1411]/60 dark:text-white/60">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ open, onClose, cart }) {
  const subtotal = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm">
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 220 }} className="ml-auto flex h-full w-full max-w-md flex-col bg-[#FFF8EF] p-6 dark:bg-[#1B1411]">
            <div className="flex items-center justify-between border-b border-[#B89A5E]/20 pb-5">
              <h3 className="font-serif text-3xl text-[#1B1411] dark:text-[#FFF8EF]">Your Cart</h3>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"><X className="text-[#1B1411] dark:text-[#FFF8EF]" /></button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto py-6">
              {cart.length === 0 ? (
                <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-[#F7E8DD] p-6 text-center dark:border-white/10 dark:bg-white/5">
                  <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-[#B89A5E]" />
                  <p className="font-serif text-2xl text-[#1B1411] dark:text-[#FFF8EF]">Your cart is empty</p>
                  <p className="mt-2 text-sm leading-6 text-[#1B1411]/65 dark:text-white/60">
                    Add a pearl piece from the collection to preview checkout.
                  </p>
                  <a href="#shop" onClick={onClose} className="mt-5 inline-flex rounded-full bg-[#1B1411] px-5 py-3 text-sm font-medium text-[#FFF8EF] hover:bg-[#B89A5E] hover:text-[#1B1411]">
                    Shop Collection
                  </a>
                </div>
              ) : (
                cart.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="flex gap-4 rounded-2xl bg-[#F7E8DD] p-3 dark:bg-white/5">
                    <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-serif text-xl text-[#1B1411] dark:text-[#FFF8EF]">{product.name}</p>
                      <p className="mt-1 text-sm text-[#1B1411]/60 dark:text-white/60">Qty 1 · {product.metal}</p>
                      <p className="mt-3 font-medium text-[#1B1411] dark:text-[#FFF8EF]">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[#B89A5E]/20 pt-5">
              <div className="mb-5 flex justify-between text-[#1B1411] dark:text-[#FFF8EF]"><span>Subtotal</span><span className="font-serif text-2xl">{formatPrice(subtotal)}</span></div>
              <button disabled={cart.length === 0} className="w-full rounded-full bg-[#1B1411] px-6 py-4 text-sm font-medium text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#B89A5E] dark:text-[#1B1411]">
                Secure Checkout
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickViewModal({ product, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} className="grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#FFF8EF] shadow-2xl dark:bg-[#161616] md:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden bg-[#F7E8DD]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="relative overflow-y-auto p-8 sm:p-10">
              <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"><X className="text-[#1B1411] dark:text-[#FFF8EF]" /></button>
              <p className="text-xs uppercase tracking-[0.32em] text-[#8A6A3F] dark:text-[#B89A5E]">{product.category}</p>
              <h3 className="mt-3 font-serif text-4xl text-[#1B1411] dark:text-[#FFF8EF]">{product.name}</h3>
              <p className="mt-4 font-serif text-3xl text-[#1B1411] dark:text-[#FFF8EF]">{formatPrice(product.price)}</p>
              <p className="mt-5 text-sm leading-7 text-[#1B1411]/70 dark:text-white/60">
                A luminous statement piece designed with balanced proportion, radiant pearl quality, and refined metal finishing.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button onClick={() => { onAddToCart(product); onClose(); }} className="rounded-full bg-[#1B1411] px-6 py-4 text-sm font-medium text-[#FFF8EF] hover:bg-[#B89A5E] hover:text-[#1B1411]">
                  Add to Cart
                </button>
                <a href="#shop" onClick={onClose} className="rounded-full border border-[#B89A5E]/40 px-6 py-4 text-center text-sm font-medium text-[#1B1411] hover:bg-[#B89A5E]/10 dark:text-[#FFF8EF]">
                  View Details
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#FFF8EF] px-6 py-24 dark:bg-[#161616] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>About the Brand</SectionLabel>
          <h2 className="font-serif text-4xl leading-tight text-[#1B1411] dark:text-[#FFF8EF] sm:text-6xl">Soft luxury, shaped by pearl light.</h2>
          <p className="mt-6 text-sm leading-8 text-[#1B1411]/75 dark:text-white/65">
            PEARLfectly Pearls is styled around soft mint boxes, blush velvet packaging, warm ivory surfaces, and classic black typography. The look is gentle, feminine, clean, and product-focused—perfect for pearl stud earrings and gift sets.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Premium craftsmanship", "Trustworthy sourcing", "Artistic restraint", "Heirloom quality"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#B89A5E]/20 bg-[#F7E8DD] p-4 text-sm text-[#1B1411] dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                <Sparkles className="mb-3 h-5 w-5 text-[#B89A5E]" /> {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="relative min-h-[560px]">
          <img src="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1300&q=85" alt="Luxury jewelry brand story" className="absolute right-0 top-0 h-[72%] w-[78%] rounded-[2.5rem] object-cover shadow-2xl" />
          <div className="absolute bottom-0 left-0 w-[65%] rounded-[2rem] border border-[#B89A5E]/25 bg-[#FFF8EF]/85 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1B1411]/80">
            <p className="font-serif text-3xl text-[#1B1411] dark:text-[#FFF8EF]">Pearls chosen for luster, symmetry, surface, and soul.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PEARLfectlyPearlsWebsite() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const rootClass = useMemo(() => (darkMode ? "dark" : ""), [darkMode]);

  return (
    <div className={`${rootClass} scroll-smooth`}>
      <main className="min-h-screen bg-[#FFF8EF] font-sans text-[#1B1411] antialiased dark:bg-[#1B1411]">
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-multiply dark:opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={() => setSearchOpen(true)} onCart={() => setCartOpen(true)} cartCount={cart.length} />
        <Hero />
        <TrustBar />
        <ProductShowcase onQuickView={setQuickView} addToCart={addToCart} />
        <FeaturedCollections />
        <About />
        <Craftsmanship />
        <ProductDetailLayout addToCart={addToCart} />
        <LuxuryExperience />
        <Testimonials />
        <Gallery />
        <Newsletter />
        <FAQ />
        <Footer />
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAddToCart={addToCart} />
      </main>
    </div>
  );
}
