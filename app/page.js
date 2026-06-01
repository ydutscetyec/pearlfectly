"use client"; 

import React, { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
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

const fallbackProducts = [
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
    category: "Gift Sets",
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
    category: "Size Guide",
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
    name: "Pastel Weekday Stud Box",
    category: "Gift Sets",
    price: 1180,
    rating: 5,
    tag: "New Arrival",
    metal: "Gold-tone Backs",
    pearl: "Ivory, Pink, Champagne, and Gray Pearl Studs",
    image: "/weekly-pearl-box.png",
  },
  {
    id: 6,
    name: "Soft Blush Pearl Studs",
    category: "Earrings",
    price: 1120,
    rating: 5,
    tag: "Everyday",
    metal: "Gold-tone Setting",
    pearl: "Freshwater Pearl Studs",
    image: "/pink-pearl-gift-boxes.png",
  },
  {
    id: 7,
    name: "Pearl Stud Size Guide",
    category: "Size Guide",
    price: 890,
    rating: 5,
    tag: "Minimal",
    metal: "Gold-tone Backing",
    pearl: "10 mm to 16 mm Pearl Stud Options",
    image: "/pearl-size-guide.png",
  },
  {
    id: 8,
    name: "PEARLfectly Essentials Box",
    category: "Gift Sets",
    price: 1480,
    rating: 5,
    tag: "Signature Box",
    metal: "Mixed Gold-tone Backs",
    pearl: "Ivory, Pink, and Champagne Pearl Studs",
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
  return `₱${Number(value).toLocaleString("en-PH")}`;
}

function normalizeProduct(product) {
  const category = product.category || "Earrings";

  return {
    ...product,
    id: product.id ?? `${product.name}-${product.price}`,
    name: product.name || "Untitled Product",
    category,
    price: Number(product.price ?? 0),
    status: product.status || "Active",
    rating: Number(product.rating ?? 5),
    tag: product.tag || product.status || "New",
    pearl: product.pearl || product.description || category,
    metal: product.metal || "Gold-tone Setting",
    image: product.image || "/weekly-pearl-box.png",
  };
}

function SectionLabel({ children, dark = false }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-10 bg-[#B89A5E]" />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          dark ? "text-[#B89A5E]" : "text-[#8A6A3F]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function SoftBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#CFE9DF]/35 blur-3xl" />
      <div className="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-[#F4C6D3]/30 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-[#B89A5E]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,248,239,0.90),rgba(255,253,247,0.72),rgba(247,232,221,0.78))]" />
    </div>
  );
}

function MintBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#FFF8EF]/45 blur-3xl" />
      <div className="absolute right-[-7rem] top-24 h-96 w-96 rounded-full bg-[#F4C6D3]/25 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 rounded-full bg-[#B89A5E]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,239,232,0.88),rgba(207,233,223,0.78),rgba(255,248,239,0.50))]" />
    </div>
  );
}

function DarkBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 top-16 h-96 w-96 rounded-full bg-[#B89A5E]/18 blur-3xl" />
      <div className="absolute right-[-8rem] top-1/3 h-96 w-96 rounded-full bg-[#CFE9DF]/10 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#F4C6D3]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,20,17,0.96),rgba(74,56,50,0.82),rgba(27,20,17,0.94))]" />
    </div>
  );
}

function LuxuryButton({ children, variant = "primary", className = "", onClick, href }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B89A5E]/50";
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

function Navbar({ onSearch, onCart, cartCount = 0, onWishlist, wishlistCount = 0, onAccount, session, authStatus }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  const navLinks = [
    { label: "SHOP", href: "/#shop", hasDropdown: true },
    { label: "THE PEARLFECTLY EXPERIENCE", href: "/#collections" },
    { label: "ABOUT", href: "/#about" },
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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hiddenAtScrollY = useRef(null);
  const lastRevealScrollY = useRef(null);
  const megaCloseTimeout = useRef(null);

  useEffect(() => {
    const hideAfterScrollY = 24;
    const scrollTolerance = 6;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current + scrollTolerance;
      const scrollingUp = currentScrollY < lastScrollY.current - scrollTolerance;

      setIsScrolled(currentScrollY > hideAfterScrollY);

      if (open || mega) {
        setIsNavVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= hideAfterScrollY) {
        setIsNavVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (scrollingDown) {
        setIsNavVisible(false);
      }

      if (scrollingUp) {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, mega]);

  useEffect(() => {
    return () => window.clearTimeout(megaCloseTimeout.current);
  }, []);

  const showNavFromFloatingButton = () => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 24);
    setIsNavVisible(true);
    setMega(false);
    hiddenAtScrollY.current = null;
    lastRevealScrollY.current = currentScrollY;
    lastScrollY.current = currentScrollY;
  };

  const openMegaMenu = () => {
    window.clearTimeout(megaCloseTimeout.current);
    setMega(true);
    setIsNavVisible(true);
  };

  const closeMegaMenu = () => {
    window.clearTimeout(megaCloseTimeout.current);
    megaCloseTimeout.current = window.setTimeout(() => {
      setMega(false);
    }, 180);
  };

  const navIsSolid = isScrolled || mega || open;

  const handleNavClick = (event, href) => {
    const isSamePageAnchor = href.startsWith("#");
    const isHomeAnchor = href.startsWith("/#");
    const targetHash = isHomeAnchor ? href.replace("/", "") : href;

    if (!isSamePageAnchor && !isHomeAnchor) return;

    setMega(false);
    setOpen(false);

    if (isHomeAnchor && window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    const target = document.querySelector(targetHash);
    if (!target) return;

    setIsNavVisible(targetHash === "#home");

    const headerHeight = document.querySelector("header")?.offsetHeight ?? 180;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    window.history.pushState(null, "", targetHash);

    if (targetHash !== "#home") {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const navText = `${
    navIsSolid  
      ? "text-[#FFF8EF] drop-shadow-none"
      : "text-[#4A3832] drop-shadow-[0_1px_8px_rgba(255,248,239,0.85)]"
  } transition-colors duration-300 group-hover/nav:text-[#FFF8EF] group-focus-within/nav:text-[#FFF8EF]`;

  const iconButton = `grid h-9 w-9 place-items-center rounded-full ${
    navIsSolid
      ? "text-[#FFF8EF] drop-shadow-none hover:bg-[#FFF8EF]/15"
      : "text-[#4A3832] drop-shadow-[0_1px_8px_rgba(255,248,239,0.85)] hover:bg-[#4A3832]/15"
  } transition duration-300 hover:text-[#FFF8EF] group-hover/nav:text-[#FFF8EF] group-hover/nav:drop-shadow-none group-focus-within/nav:text-[#FFF8EF] group-focus-within/nav:drop-shadow-none`;

  const isSignedIn = authStatus === "authenticated" && session?.user;
  const profileLabel = isSignedIn
    ? `Open ${session.user.name || session.user.email}'s profile`
    : "Open account options";

  return (
    <>
      <AnimatePresence>
        {!isNavVisible && !open && !mega && isScrolled && (
          <motion.button
            type="button"
            onClick={showNavFromFloatingButton}
            initial={{ opacity: 0, x: -18, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -18, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed left-4 top-5 z-[65] grid h-10 w-10 place-items-center rounded-full border border-[#B89A5E]/35 bg-[#4A3832]/90 text-[#FFF8EF] shadow-xl shadow-black/10 backdrop-blur-xl transition hover:bg-[#B89A5E] hover:text-[#1B1411] sm:left-6 lg:left-8"
            aria-label="Show navigation bar"
          >
            <Menu className="h-6 w-6 stroke-[1.7]" />
          </motion.button>
        )}
      </AnimatePresence>

      <header
        className={`group/nav fixed inset-x-0 top-0 z-50 transform overflow-visible border-b transition-all duration-300 ease-in-out ${
          isNavVisible || open || mega ? "translate-y-0" : "-translate-y-full"
        } before:pointer-events-none before:absolute before:inset-0 before:z-0 before:transition-opacity before:duration-300 after:pointer-events-none after:absolute after:inset-x-10 after:bottom-0 after:z-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#B89A5E]/45 after:to-transparent after:transition-opacity after:duration-300 ${
          navIsSolid
            ? "border-[#B89A5E]/25 bg-[#1B1411]/55 shadow-xl shadow-black/10 backdrop-blur-2xl before:opacity-100 before:bg-[radial-gradient(circle_at_16%_18%,rgba(184,154,94,0.20),transparent_26%),radial-gradient(circle_at_78%_16%,rgba(207,233,223,0.12),transparent_28%),linear-gradient(135deg,rgba(27,20,17,0.78),rgba(74,56,50,0.48))] after:opacity-100"
            : "border-transparent bg-transparent shadow-none before:opacity-100 before:bg-gradient-to-b before:from-black/25 before:via-black/10 before:to-transparent after:opacity-0"
        } hover:border-[#B89A5E]/25 hover:bg-[#1B1411]/55 hover:shadow-xl hover:shadow-black/10 hover:backdrop-blur-2xl hover:before:opacity-100 hover:before:bg-[radial-gradient(circle_at_16%_18%,rgba(184,154,94,0.20),transparent_26%),radial-gradient(circle_at_78%_16%,rgba(207,233,223,0.12),transparent_28%),linear-gradient(135deg,rgba(27,20,17,0.78),rgba(74,56,50,0.48))] hover:after:opacity-100 focus-within:border-[#B89A5E]/25 focus-within:bg-[#1B1411]/55 focus-within:shadow-xl focus-within:shadow-black/10 focus-within:backdrop-blur-2xl focus-within:before:opacity-100 focus-within:before:bg-[radial-gradient(circle_at_16%_18%,rgba(184,154,94,0.20),transparent_26%),radial-gradient(circle_at_78%_16%,rgba(207,233,223,0.12),transparent_28%),linear-gradient(135deg,rgba(27,20,17,0.78),rgba(74,56,50,0.48))] focus-within:after:opacity-100`}
      >
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative flex h-[5.6rem] items-center justify-center">
          <button onClick={onSearch} className={`absolute left-0 ${iconButton}`} aria-label="Search">
            <Search className="h-4 w-4 stroke-[1.6]" />
          </button>

          <a href="/#home" onClick={(event) => handleNavClick(event, "/#home")} className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="PEARLfectly logo"
              className="mb-1 h-8 w-8 rounded-full border border-[#B89A5E]/40 bg-[#FFFDF7] object-cover p-1 shadow-md"
            />
            <span className={`font-serif text-[1.7rem] leading-none tracking-[0.1em] ${navText}`}>
              PEARL<span className="tracking-normal">fectly</span>
            </span>
            <span className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] ${navText}`}>
              PEARLS
            </span>
          </a>

          <div className="absolute right-0 hidden items-center gap-4 sm:flex">
            <button
              type="button"
              onClick={onAccount}
              className={`relative ${iconButton}`}
              aria-label={profileLabel}
              title={isSignedIn ? session.user.name || session.user.email : "Sign in / Sign up"}
            >
              <UserRound className="h-4 w-4 stroke-[1.6]" />
              {isSignedIn && (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-[#FFF8EF] bg-[#CFE9DF]" />
              )}
            </button>
            <a href="mailto:hello@pearlfectly.com" className={iconButton} aria-label="Message Pearlfectly">
              <MessageCircle className="h-4 w-4 stroke-[1.6]" />
            </a>
            <button
              type="button"
              onClick={onWishlist}
              className={`relative ${iconButton}`}
              aria-label="Open wishlist"
            >
              <Heart className={`h-4 w-4 stroke-[1.6] ${wishlistCount > 0 ? "fill-current" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#F4C6D3] px-1 text-[10px] font-semibold text-[#1B1411] shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              data-cart-target="true"
              onClick={onCart}
              className={`relative ${iconButton}`}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4 stroke-[1.6]" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#B89A5E] px-1 text-[10px] font-semibold text-[#1B1411] shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="absolute right-0 grid h-9 w-9 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#CFE9DF]/70 hover:text-[#B89A5E] sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="hidden h-9 items-center justify-center gap-8 border-t border-[#B89A5E]/20 lg:flex">
          {navLinks.map((link) => {
            const isShop = link.label === "SHOP";

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => isShop && openMegaMenu()}
                onMouseLeave={() => isShop && closeMegaMenu()}
                onFocus={() => isShop && openMegaMenu()}
              >
                <a
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`flex items-center gap-2 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.22em] ${navText}`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 stroke-[1.5]" />}
                </a>

                <AnimatePresence>
                  {isShop && mega && (
                    <>
                      <div
                        onMouseEnter={openMegaMenu}
                        onMouseLeave={closeMegaMenu}
                        className="absolute left-1/2 top-7 z-[130] h-8 w-[760px] max-w-[calc(100vw-2rem)] -translate-x-1/2"
                        aria-hidden="true"
                      />
                      <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      onMouseEnter={openMegaMenu}
                      onMouseLeave={closeMegaMenu}
                      className="absolute left-1/2 top-9 z-[140] w-[760px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-[1.25rem] border border-[#D8C7A3]/45 bg-[#FFF8EF]/97 px-6 py-5 shadow-2xl shadow-black/14 backdrop-blur-2xl"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#CFE9DF]/55 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-[#F4C6D3]/45 blur-3xl" />

                      <div className="relative grid gap-10 md:grid-cols-[1fr_1fr_1fr_0.9fr]">
                        {shopMegaMenu.map((group) => (
                          <div key={group.title}>
                            <h3 className="mb-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.24em] text-[#8A6A3F]">
                              {group.title}
                            </h3>

                            <div className="space-y-2.5">
                              {group.items.map((item) => (
                                <a
                                  key={item}
                                  href="/#shop"
                                  onClick={(event) => handleNavClick(event, "/#shop")}
                                  className="block rounded-full px-3 py-1.5 text-[13px] font-medium capitalize text-[#4A3832]/82 transition duration-300 hover:bg-[#F3E7D6]/80 hover:text-[#B89A5E]"
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="rounded-[1.25rem] border border-[#B89A5E]/25 bg-[#FFFDF7]/80 p-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B89A5E]">
                            Gift-ready
                          </p>
                          <p className="mt-2 font-serif text-[1.15rem] leading-tight text-[#1B1411]">
                            Pearl boxes made for soft luxury gifting.
                          </p>
                          <a
                            href="/#shop"
                            onClick={(event) => handleNavClick(event, "/#shop")}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8A6A3F] hover:text-[#B89A5E]"
                          >
                            Shop gift sets <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                    </>
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
              className="ml-auto h-full w-[86%] max-w-sm bg-[#FFF8EF] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="PEARLfectly logo" className="h-10 w-10 rounded-full border border-[#B89A5E]/40 bg-[#FFFDF7] object-cover p-1" />
                  <div>
                    <p className="font-serif text-xl tracking-[0.12em] text-[#1B1411]">PEARLfectly</p>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-[#8A6A3F]">PEARLS</p>
                  </div>
                </div>

                <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-black/5" aria-label="Close menu">
                  <X className="text-[#1B1411]" />
                </button>
              </div>

              <div className="mt-10 space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="block border-b border-[#B89A5E]/20 pb-4 font-serif text-lg text-[#1B1411]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-5 gap-3">
                <button onClick={onSearch} className="grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411]" aria-label="Search">
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onAccount?.();
                  }}
                  className="relative grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411]"
                  aria-label={profileLabel}
                >
                  <UserRound className="h-4 w-4" />
                  {isSignedIn && (
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#9CCDC0]" />
                  )}
                </button>
                <a href="mailto:hello@pearlfectly.com" className="grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411]" aria-label="Message Pearlfectly">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <button onClick={onWishlist} className="relative grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411]" aria-label="Open wishlist">
                  <Heart className={`h-5 w-5 ${wishlistCount > 0 ? "fill-[#1B1411]" : ""}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#F4C6D3] px-1 text-[10px] font-semibold text-[#1B1411]">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button data-cart-target="true" onClick={onCart} className="relative grid h-12 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411]" aria-label="Open cart">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#B89A5E] px-1 text-[10px] font-semibold text-[#1B1411]">
                    {cartCount}
                  </span>
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#FFF8EF] pt-[126px] text-[#1B1411]"
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

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-126px)] max-w-[1020px] items-center px-5 pb-8 sm:px-7 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full rounded-[2.25rem] border border-white/60 bg-[#FFF8EF]/72 p-5 shadow-2xl shadow-black/5 backdrop-blur-md lg:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,560px)_270px] xl:grid-cols-[minmax(0,610px)_270px] lg:items-center">
            <div className="min-w-0">
              <SectionLabel dark>Pearlfectly Pearls</SectionLabel>

              <h1 className="max-w-[590px] pb-2 font-serif text-3xl leading-[1.02] tracking-tight sm:text-4xl lg:text-[48px] xl:text-[52px]">
                Pearls made for soft everyday elegance.
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-[#1B1411]/75 sm:text-[15px]">
                Discover luminous pearl studs, gift-ready sets, and pastel boxes designed for refined everyday wear and thoughtful gifting.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LuxuryButton href="/#shop" variant="primary">Shop Collection</LuxuryButton>
                <LuxuryButton href="/#shop" variant="outline" className="text-[#1B1411]">
                  Find Your Pearl Size
                </LuxuryButton>
              </div>
            </div>

            <div className="relative hidden min-h-[280px] w-full max-w-[270px] self-center overflow-hidden rounded-[1.5rem] border border-[#B89A5E]/30 bg-[#FFFDF7]/78 p-5 shadow-2xl shadow-black/5 backdrop-blur-xl lg:flex lg:items-center lg:justify-center">
              <div className="pointer-events-none absolute -top-16 left-10 h-[160%] w-28 rotate-12 bg-white/35 blur-sm" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#CFE9DF]/60 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 rounded-full bg-[#F4C6D3]/45 blur-2xl" />

              <div className="relative w-full">
                <div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-full border border-[#B89A5E]/30 bg-[#FFF8EF]/90 text-[#B89A5E] shadow-sm">
                  <UserRound className="h-5 w-5 stroke-[1.5]" />
                </div>

                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A6A3F]">
                  Pearl Member Access
                </p>

                <h2 className="mt-2.5 text-center font-serif text-lg text-[#1B1411]">
                  Welcome Back!
                </h2>

                <p className="mx-auto mt-3 max-w-[220px] text-center text-xs leading-5 text-[#1B1411]/60">
                  Access your saved pearl sets, gift picks, and recent viewing history.
                </p>

                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#B89A5E]/35 to-transparent" />

                <div className="relative z-20 space-y-2.5">
                  <a
                    href="/signin?callbackUrl=/%23shop"
                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#B89A5E]/40 bg-[#FFF8EF]/70 px-4 py-2 text-xs font-medium text-[#1B1411] transition hover:bg-[#CFE9DF]/70"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>

                  <a
                    href="/signup?callbackUrl=/%23shop"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#1B1411] px-4 py-2 text-xs font-medium text-[#FFF8EF] shadow-lg shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                  >
                    Create Account
                    <Sparkles className="h-4 w-4" />
                  </a>

                  <a
                    href="/#shop"
                    className="block w-full rounded-full bg-[#CFE9DF]/85 px-4 py-2 text-center text-xs font-medium text-[#1B1411] transition hover:bg-[#F4C6D3]/75"
                  >
                    Continue Viewing
                  </a>
                </div>

                <p className="mt-3 text-center text-[10px] leading-5 text-[#1B1411]/40">
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
    { icon: Truck, title: "Tracked delivery", copy: "Clear delivery updates for local and gift orders." },
    { icon: CreditCard, title: "Secure checkout", copy: "A secure, polished checkout from cart to payment." },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFF8EF] px-5 py-8 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="rounded-[1.25rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/82 p-5 shadow-lg shadow-black/5 backdrop-blur-md"
            >
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-[#CFE9DF]/70 text-[#8A6A3F]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1B1411]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#1B1411]/65">{item.copy}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section id="collections" className="relative overflow-hidden bg-[#DCEFE8] px-5 py-14 sm:px-6 lg:px-8">
      <MintBackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Featured Collections</SectionLabel>
            <h2 className="max-w-2xl font-serif text-xl leading-tight text-[#1B1411] sm:text-4xl">
              Soft packaging, polished pearls, and gift-ready details.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#1B1411]/75">
            Inspired by mint jewelry trays, blush velvet boxes, creamy silk backdrops, and classic black typography.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {collections.map((item, index) => (
            <motion.article
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className={`group relative min-h-[260px] overflow-hidden rounded-[1.25rem] ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-serif text-xl">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{item.copy}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#B89A5E]">
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
function ProductCard({ product, onQuickView, addToCart, isWishlisted = false, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [flyItem, setFlyItem] = useState(null);
  const stock = Number(product.stock ?? 0);
  const isOutOfStock = stock <= 0;
  const liked = isWishlisted;

  const productImageRef = useRef(null);
  const addedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(addedTimeoutRef.current);
    };
  }, []);

  const getCartTargetRect = () => {
    const cartButtons = Array.from(
      document.querySelectorAll("[data-cart-target='true']")
    );

    const visibleCartButton = cartButtons.find((button) => {
      const rect = button.getBoundingClientRect();

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= -20 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight + 80
      );
    });

    if (visibleCartButton) {
      return visibleCartButton.getBoundingClientRect();
    }

    return {
      left: window.innerWidth - 80,
      top: 32,
      width: 48,
      height: 48,
    };
  };

  const handleCardAddToCart = () => {
    if (isOutOfStock || quantity > stock) return;
    const sourceRect = productImageRef.current?.getBoundingClientRect();
    const cartRect = getCartTargetRect();

    if (sourceRect && cartRect) {
      const size = 76;

      setFlyItem({
        id: Date.now(),
        image: product.image,
        size,
        from: {
          x: sourceRect.left + sourceRect.width / 2 - size / 2,
          y: sourceRect.top + sourceRect.height / 2 - size / 2,
        },
        to: {
          x: cartRect.left + cartRect.width / 2 - size / 2,
          y: cartRect.top + cartRect.height / 2 - size / 2,
        },
      });
    }

    addToCart(product, quantity);
    setQuantity(1);

    setIsAdded(true);
    window.clearTimeout(addedTimeoutRef.current);

    addedTimeoutRef.current = window.setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {flyItem && (
          <motion.img
            key={flyItem.id}
            src={flyItem.image}
            alt=""
            initial={{
              x: flyItem.from.x,
              y: flyItem.from.y,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: flyItem.to.x,
              y: flyItem.to.y,
              scale: 0.24,
              opacity: [1, 1, 0],
              rotate: 12,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setFlyItem(null)}
            className="pointer-events-none fixed left-0 top-0 z-[120] rounded-2xl border border-[#B89A5E]/30 object-cover shadow-2xl shadow-black/20"
            style={{
              width: flyItem.size,
              height: flyItem.size,
            }}
          />
        )}
      </AnimatePresence>

      <motion.article
        {...fadeUp}
        animate={{
          scale: isAdded ? 1.012 : 1,
          boxShadow: isAdded
            ? "0 18px 45px rgba(184, 154, 94, 0.18)"
            : "0 0 0 rgba(184, 154, 94, 0)",
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className={`group overflow-hidden rounded-[1.25rem] border bg-[#FFF8EF]/88 shadow-xl shadow-black/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 ${
          isAdded ? "border-[#B89A5E]/60" : "border-[#B89A5E]/20"
        }`}
      >
        <div className="relative aspect-[1.2/1] overflow-hidden bg-[#F7E8DD]">
          <img
            ref={productImageRef}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
          />

          <div className="absolute left-3 top-3 rounded-full bg-[#FFF8EF]/90 px-3 py-1.5 text-[11px] font-semibold text-[#1B1411] backdrop-blur">
            {product.tag}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            animate={{ scale: liked ? 1.08 : 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => onToggleWishlist?.(product)}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
              liked
                ? "bg-[#F4C6D3] text-[#1B1411]"
                : "bg-[#FFF8EF]/90 text-[#1B1411] hover:bg-[#B89A5E]"
            }`}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-[#1B1411]" : ""}`} />
          </motion.button>

          <div className="absolute bottom-3 left-3 flex translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1B1411] px-3.5 py-1.5 text-xs font-medium text-[#FFF8EF] shadow-lg shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
            >
              <ZoomIn className="h-3.5 w-3.5" />
              Quick View
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center gap-1 text-[#B89A5E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating ? "fill-current" : "opacity-25"
                }`}
              />
            ))}
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#8A6A3F]">
            {product.category}
          </p>

          <h3 className="mt-1.5 font-serif text-lg text-[#1B1411]">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-[#1B1411]/70">
            {product.pearl} · {product.metal}
          </p>

          <div className="mt-1 space-y-2.5">
            <p className="font-serif text-lg text-[#1B1411]">
              {formatPrice(product.price)}
            </p>

            <div className="flex w-full items-center gap-2">
              <div className="flex h-8 shrink-0 items-center rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/80">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="grid h-8 w-7 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD]"
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>

                <span className="min-w-6 text-center text-xs font-semibold text-[#1B1411]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
                  disabled={isOutOfStock || quantity >= stock}
                  className="grid h-8 w-7 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                animate={{ scale: isAdded ? 1.04 : 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={handleCardAddToCart}
                className={`min-w-0 flex-1 overflow-hidden rounded-full px-3 py-1.5 text-center text-xs font-semibold transition ${
                  isAdded
                    ? "bg-[#CFE9DF] text-[#1B1411] shadow-sm"
                    : "text-[#8A6A3F] hover:bg-[#F3E7D6]/70 hover:text-[#1B1411]"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isAdded ? "added" : "add"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16 }}
                    className="block truncate text-center"
                  >
                    {isAdded ? "Added ✓" : "Add to Cart"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    </>
  );
}

function ProductShowcase({ products, onQuickView, addToCart, isWishlisted, onToggleWishlist }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const displayProducts = products;
  const filters = ["All", ...Array.from(new Set(displayProducts.map((product) => product.category).filter(Boolean)))];
  const visible =
    activeFilter === "All"
      ? displayProducts
      : displayProducts.filter((p) => p.category === activeFilter);

  return (
    <section id="shop" className="relative overflow-hidden bg-[#FFF8EF] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Shop</SectionLabel>
            <h2 className="font-serif text-lg text-[#1B1411] sm:text-4xl">
              Best sellers & new arrivals
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1B1411]/70">
              Shop polished pearl studs and gift-ready sets with clear prices, quick view, and easy add-to-cart actions.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-full border border-[#B89A5E]/20 bg-[#F7E8DD]/82 p-1.5 backdrop-blur-md">
            <span className="grid h-9 w-9 place-items-center rounded-full text-[#8A6A3F]"><SlidersHorizontal className="h-4 w-4" /></span>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  activeFilter === filter
                    ? "bg-[#1B1411] text-[#FFF8EF]"
                    : "text-[#1B1411] hover:bg-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.length > 0 ? (
            visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                addToCart={addToCart}
                isWishlisted={isWishlisted?.(product)}
                onToggleWishlist={onToggleWishlist}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[1.25rem] border border-[#B89A5E]/20 bg-[#F7E8DD]/82 p-6 text-center">
              <p className="font-serif text-lg text-[#1B1411]">No products yet</p>
              <p className="mt-2 text-sm text-[#1B1411]/60">
                Add products from the admin page, then refresh this page.
              </p>
            </div>
          )}
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
    <section id="craftsmanship" className="relative overflow-hidden bg-[#1B1411] px-5 py-14 text-[#FFF8EF] sm:px-6 lg:px-8">
      <DarkBackgroundDecor />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel dark>Craftsmanship</SectionLabel>
          <h2 className="font-serif text-xl leading-tight sm:text-4xl">A modern atelier approach to pearl jewelry.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            PEARLfectly Pearls begins with the pearl itself: its glow, movement, and character. From there, each silhouette is drawn, balanced, finished, and inspected to preserve the natural elegance of the gem.
          </p>
          <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <p className="font-serif text-xl text-[#B89A5E]">“True luxury is quiet. It is seen in restraint, felt in finish, and remembered through time.”</p>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.11]"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#B89A5E]/15 text-[#B89A5E]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{value.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductDetailLayout({ products, addToCart, isWishlisted, onToggleWishlist }) {
  const [variant, setVariant] = useState("Gold-tone Backing");
  const [quantity, setQuantity] = useState(1);
  const displayProducts = products;
  const product = displayProducts[0];

  if (!product) {
    return null;
  }
  const variants = ["Gold-tone Backing", "Silver-tone Backing", "Rose-gold Tone"];
  const productIsWishlisted = isWishlisted?.(product);

  return (
    <section id="product-details" className="relative scroll-mt-32 overflow-hidden bg-[#F7E8DD] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 text-center">
          <div className="mx-auto flex justify-center"><SectionLabel>Product Detail Preview</SectionLabel></div>
          <h2 className="font-serif text-lg text-[#1B1411] sm:text-4xl">A clearer product buying flow</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#1B1411]/70">
            A stronger buying flow builds trust with finish options, reviews, secure checkout cues, and a working add-to-cart action.
          </p>
        </motion.div>

        <div className="grid gap-6 rounded-[1.75rem] border border-[#B89A5E]/20 bg-[#FFF8EF]/88 p-4 shadow-xl shadow-black/5 backdrop-blur-md lg:grid-cols-2 lg:p-6">
          <div className="grid gap-3 sm:grid-cols-[0.2fr_1fr]">
            <div className="hidden gap-3 sm:grid">
              {displayProducts.slice(0, 3).map((item, index) => (
                <button key={`${item.id}-${index}`} className="overflow-hidden rounded-xl border border-[#B89A5E]/20 bg-[#F7E8DD]">
                  <img src={item.image} alt={item.name} className="aspect-square h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="group relative overflow-hidden rounded-[1.25rem] bg-[#F7E8DD]">
              <img src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute right-4 top-4 rounded-full bg-[#FFF8EF]/90 p-2.5 text-[#1B1411] backdrop-blur">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-2 lg:p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-[#8A6A3F]">Pearl Stud Earrings</p>
            <h3 className="mt-2 font-serif text-3xl text-[#1B1411] sm:text-4xl">{product.name}</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-[#B89A5E]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-sm text-[#1B1411]/65">48 customer reviews</span>
            </div>
            <p className="mt-4 font-serif text-lg text-[#1B1411]">{formatPrice(product.price)}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#1B1411]/75">
              A luminous pearl stud set inspired by soft blush boxes, mint packaging, and warm gold details. Designed for clean product display, gifting, and everyday quiet luxury.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-3 text-sm font-medium text-[#1B1411]">Pearl / Backing Finish</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((item) => (
                    <button
                      key={item}
                      onClick={() => setVariant(item)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        variant === item
                          ? "border-[#1B1411] bg-[#1B1411] text-[#FFF8EF]"
                          : "border-[#B89A5E]/30 text-[#1B1411] hover:border-[#B89A5E] hover:bg-[#F3E7D6]/60"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-[#B89A5E]/30">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5"><Minus className="h-4 w-4" /></button>
                  <span className="min-w-10 text-center text-sm text-[#1B1411]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5"><Plus className="h-4 w-4" /></button>
                </div>
                <LuxuryButton onClick={() => Array.from({ length: quantity }).forEach(() => addToCart(product))} className="flex-1 sm:flex-none">
                  Add to Cart
                </LuxuryButton>
                <button
                  onClick={() => Array.from({ length: quantity }).forEach(() => addToCart(product))}
                  className="rounded-full border border-[#B89A5E]/40 px-4 py-2 text-xs font-semibold text-[#1B1411] transition hover:bg-[#CFE9DF]/60"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() => onToggleWishlist?.(product)}
                  className={`grid h-10 w-10 place-items-center rounded-full border border-[#B89A5E]/30 text-[#1B1411] transition ${
                    productIsWishlisted ? "bg-[#F4C6D3]" : "hover:bg-[#CFE9DF]/70"
                  }`}
                  aria-label={productIsWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`h-5 w-5 ${productIsWishlisted ? "fill-[#1B1411]" : ""}`} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {[
                [ShieldCheck, "Authenticity"],
                [Truck, "Tracked shipping"],
                [CreditCard, "Secure checkout"],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-2 rounded-xl bg-[#F7E8DD] p-2.5 text-xs text-[#1B1411]">
                  <Icon className="h-4 w-4 text-[#B89A5E]" /> {label}
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 text-xs leading-6 text-[#1B1411]/70 sm:grid-cols-2">
              <p><span className="font-semibold text-[#1B1411]">Delivery:</span> 2–5 business days</p>
              <p><span className="font-semibold text-[#1B1411]">Care:</span> Soft cloth cleaning</p>
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
    <section className="relative overflow-hidden bg-[#FFF8EF] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 text-center">
          <div className="mx-auto flex justify-center"><SectionLabel>Luxury Experience</SectionLabel></div>
          <h2 className="font-serif text-lg text-[#1B1411] sm:text-4xl">A soft, gift-ready luxury experience.</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                className="rounded-[1.25rem] border border-[#B89A5E]/20 bg-gradient-to-br from-[#FFF8EF]/90 to-[#F7E8DD]/82 p-5 shadow-lg shadow-black/5 backdrop-blur-md transition hover:-translate-y-1"
              >
                <div className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-[#B89A5E]/20 text-[#8A6A3F]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg text-[#1B1411]">{perk.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#1B1411]/70">{perk.copy}</p>
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
    <section id="testimonials" className="relative overflow-hidden bg-[#F7E8DD] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-serif text-xl leading-tight text-[#1B1411] sm:text-4xl">Loved by brides, collectors, and thoughtful gift-givers.</h2>
          <div className="mt-6 flex gap-3">
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
          <div className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-br from-[#B89A5E]/25 to-transparent blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[1.75rem] border border-[#B89A5E]/20 bg-[#FFF8EF]/88 p-6 shadow-xl shadow-black/5 backdrop-blur-md sm:p-8"
            >
              <Quote className="mb-5 h-8 w-8 text-[#B89A5E]" />
              <p className="font-serif text-xl leading-snug text-[#1B1411] sm:text-3xl">“{current.review}”</p>
              <div className="mt-6 flex items-center gap-4">
                <img src={current.image} alt={current.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-[#1B1411]">{current.name}</p>
                  <p className="text-sm text-[#1B1411]/65">{current.role}</p>
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
    <section className="relative overflow-hidden bg-[#1B1411] px-5 py-14 text-[#FFF8EF] sm:px-6 lg:px-8">
      <DarkBackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <SectionLabel dark>Social Gallery</SectionLabel>
            <h2 className="pb-2 font-serif text-3xl leading-[0.98] sm:text-5xl">Mint, blush, pearl, and gold.</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm text-[#B89A5E]">View Gallery <ArrowRight className="h-4 w-4" /></button>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {gallery.map((img, index) => (
            <motion.div
              key={`${img}-${index}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="group aspect-[4/5] overflow-hidden rounded-[1.35rem]"
            >
              <img
                src={img}
                alt="PEARLfectly pearl product and packaging gallery"
                className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-[#F7E8DD] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#B89A5E]/25 bg-[#1B1411]/90 p-6 text-center text-[#FFF8EF] shadow-xl shadow-black/10 backdrop-blur-xl sm:p-10">
        <div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#B89A5E]/20 text-[#B89A5E]">
          <Mail className="h-5 w-5" />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#B89A5E]">Join the PEARLfectly Circle</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl">Private launches, care rituals, and VIP offers.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65">
          Receive exclusive collection previews, bridal styling notes, and pearl care guidance from the PEARLfectly atelier.
        </p>
        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur sm:flex-row">
          <input className="min-h-10 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none" placeholder="Enter your email address" type="email" aria-label="Email address" />
          <button className="rounded-full bg-[#B89A5E] px-4 py-2 text-xs font-medium text-[#1B1411] transition hover:bg-[#FFF8EF]">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#FFF8EF] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-serif text-lg text-[#1B1411] sm:text-4xl">Questions before the sparkle?</h2>
          <p className="mt-3 text-sm leading-6 text-[#1B1411]/70">A premium buying experience should feel clear, calm, and secure from discovery to delivery.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <motion.div key={item.q} {...fadeUp} className="rounded-[1.25rem] border border-[#B89A5E]/20 bg-[#F7E8DD]/82 backdrop-blur-md">
              <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-4 text-left">
                <span className="font-serif text-lg text-[#1B1411]">{item.q}</span>
                <ChevronDown className={`h-5 w-5 text-[#B89A5E] transition ${open === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-6 text-[#1B1411]/70">{item.a}</p>
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
    <footer id="contact" className="relative overflow-hidden bg-[#1B1411] px-5 py-10 text-[#FFF8EF] sm:px-6 lg:px-8">
      <DarkBackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid gap-8 border-b border-white/10 pb-7 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PEARLfectly logo" className="h-10 w-10 rounded-full object-cover shadow-inner" />
              <span className="font-serif text-xl tracking-[0.18em]">PEARLfectly PEARLS</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">Modern pearl jewelry crafted for weddings, refined gifting, and heirloom collections. Designed with luminous restraint and atelier-level care.</p>
          </div>
          {[
            ["Service", ["Contact", "Shipping", "Care Guide", "Returns"]],
            ["Visit", ["Private Consultation", "Instagram", "Pinterest", "Newsletter"]],
          ].map(([title, items]) => (
            <div key={title}>
              <p className="font-serif text-lg text-[#B89A5E]">{title}</p>
              <div className="mt-4 space-y-2.5">
                {items.map((item) => <a key={item} href="#" className="block text-sm text-white/60 transition hover:text-[#B89A5E]">{item}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[11px] uppercase tracking-[0.22em] text-white/40 sm:flex-row">
          <p>© 2026 PEARLfectly Pearls. All rights reserved.</p>
          <p>Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}

function SearchOverlay({ open, onClose, onQuickView, onAddToCart, products }) {
  const [query, setQuery] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);
  const [cartNotice, setCartNotice] = useState(false);
  const [searchQuantities, setSearchQuantities] = useState({});
  const addedTimeoutRef = useRef(null);
  const noticeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setAddedProductId(null);
      setCartNotice(false);
      setSearchQuantities({});

      window.clearTimeout(addedTimeoutRef.current);
      window.clearTimeout(noticeTimeoutRef.current);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      window.clearTimeout(addedTimeoutRef.current);
      window.clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const displayProducts = products.length ? products : fallbackProducts.map(normalizeProduct);

  const searchResults = normalizedQuery
    ? displayProducts.filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.tag,
          product.status,
          product.metal,
          product.pearl,
          product.description,
          String(product.price),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : displayProducts.slice(0, 4);

  const searchSuggestions = ["Earrings", "Gift Sets", "Pink", "Ivory", "Size Guide"];

  const getSearchQuantity = (productId) => {
    return searchQuantities[productId] ?? 1;
  };

  const updateSearchQuantity = (productId, change) => {
    setSearchQuantities((prev) => {
      const currentQuantity = prev[productId] ?? 1;
      const nextQuantity = Math.max(1, currentQuantity + change);

      return {
        ...prev,
        [productId]: nextQuantity,
      };
    });
  };

  const handleQuickView = (product) => {
    onQuickView?.(product);
    onClose();
  };

  const handleAddToCart = (product, quantity = 1) => {
    Array.from({ length: quantity }).forEach(() => {
      onAddToCart?.(product);
    });

    setAddedProductId(product.id);
    setCartNotice(true);

    window.clearTimeout(addedTimeoutRef.current);
    window.clearTimeout(noticeTimeoutRef.current);

    addedTimeoutRef.current = window.setTimeout(() => {
      setAddedProductId(null);
    }, 800);

    noticeTimeoutRef.current = window.setTimeout(() => {
      setCartNotice(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] bg-[#1B1411]/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="relative mx-auto mt-24 max-h-[80vh] max-w-4xl overflow-hidden rounded-[1.5rem] bg-[#FFF8EF] shadow-2xl"
          >
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-3 border-b border-[#B89A5E]/20 p-6"
            >
              <Search className="h-5 w-5 shrink-0 text-[#B89A5E]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pearls, earrings, gift sets, pink, ivory..."
                className="flex-1 bg-transparent text-base text-[#1B1411] outline-none placeholder:text-[#1B1411]/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A3F] transition hover:bg-[#F7E8DD]"
                >
                  Clear
                </button>
              )}
              <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-black/5" aria-label="Close search">
                <X className="h-5 w-5 text-[#1B1411]" />
              </button>
            </form>

            <AnimatePresence>
              {cartNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.94 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute right-16 top-[6.5rem] z-12 rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/95 px-6 py-3 text-sm font-semibold text-[#4A3832] shadow-xl shadow-black/10 backdrop-blur"
                >
                  Added to cart
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-h-[calc(80vh-96px)] overflow-y-auto p-6">
              <div className="mb-5 flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-[#B89A5E]/25 bg-[#F7E8DD]/70 px-4 py-2 text-sm text-[#4A3832] transition hover:border-[#B89A5E] hover:bg-[#CFE9DF]/70"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8A6A3F]">
                  {normalizedQuery ? `Search results for “${query.trim()}”` : "Popular searches"}
                </p>
                <p className="text-sm text-[#1B1411]/50">
                  {searchResults.length} {searchResults.length === 1 ? "item" : "items"}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {searchResults.map((product) => {
                    const isAdded = addedProductId === product.id;
                    const quantity = getSearchQuantity(product.id);

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: isAdded ? 1.02 : 1,
                          boxShadow: isAdded
                            ? "0 18px 45px rgba(184, 154, 94, 0.18)"
                            : "0 0 0 rgba(184, 154, 94, 0)",
                        }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className={`group overflow-hidden rounded-2xl border p-3 transition hover:border-[#B89A5E]/45 hover:bg-[#FFFDF7] ${
                          isAdded
                            ? "border-[#B89A5E]/60 bg-[#FFFDF7]"
                            : "border-[#B89A5E]/20 bg-[#F7E8DD]"
                        }`}
                      >
                        <div className="flex items-stretch gap-4">
                          <div className="relative w-24 shrink-0 self-stretch overflow-hidden rounded-xl bg-[#F7E8DD]">
                            <img src={product.image} alt={product.name} className="h-full min-h-24 w-24 object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A6A3F]">
                                {product.category}
                              </p>
                              <p className="mt-1 font-serif text-lg leading-tight text-[#1B1411]">
                                {product.name}
                              </p>
                            </div>
                            <p className="shrink-0 font-serif text-base text-[#1B1411]">{formatPrice(product.price)}</p>
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#1B1411]/60">
                            {product.pearl} · {product.metal}
                          </p>

                          <div className="mt-4 grid w-full grid-cols-[88px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-1.5">
                            <div className="flex h-9 min-w-0 items-center justify-center rounded-full border border-[#B89A5E]/35 bg-[#FFF8EF]/70">
                              <button
                                type="button"
                                onClick={() => updateSearchQuantity(product.id, -1)}
                                disabled={quantity <= 1}
                                className="grid h-9 w-7 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD] disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label={`Decrease quantity of ${product.name}`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>

                              <span className="min-w-5 text-center text-xs font-semibold text-[#1B1411]">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => updateSearchQuantity(product.id, 1)}
                                className="grid h-9 w-7 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD]"
                                aria-label={`Increase quantity of ${product.name}`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleQuickView(product)}
                              className="h-9 min-w-0 rounded-full bg-[#1B1411] px-2 text-[11px] font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                            >
                              Quick View
                            </button>

                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.94 }}
                              animate={{ scale: isAdded ? 1.04 : 1 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              onClick={handleCardAddToCart}
                              disabled={isOutOfStock}
                              className={`min-w-0 flex-1 overflow-hidden rounded-full px-3 py-2 text-center text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isAdded
                                  ? "bg-[#CFE9DF] text-[#1B1411] shadow-sm"
                                  : "text-[#8A6A3F] hover:bg-[#F3E7D6]/70 hover:text-[#1B1411]"
                              }`}
                            >
                              <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                  key={isOutOfStock ? "out" : isAdded ? "added" : "add"}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.16 }}
                                  className="block truncate text-center"
                                >
                                  {isOutOfStock ? "Out of Stock" : isAdded ? "Added ✓" : "Add to Cart"}
                                </motion.span>
                              </AnimatePresence>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[1.25rem] border border-[#B89A5E]/20 bg-[#F7E8DD] p-8 text-center">
                  <Search className="mx-auto mb-4 h-8 w-8 text-[#B89A5E]" />
                  <p className="font-serif text-lg text-[#1B1411]">No products found</p>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#1B1411]/60">
                    Try searching for earrings, gift sets, pink, ivory, pearl studs, or size guide.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function WishlistDrawer({
  open,
  onClose,
  wishlist,
  onRemoveItem,
  onQuickView,
  onAddToCart,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="fixed right-0 top-0 z-[75] flex h-full w-full max-w-md flex-col border-l border-[#B89A5E]/25 bg-[#FFF8EF]/96 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A3F]">
                Saved Pieces
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#1B1411]">
                Wishlist
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#F7E8DD] text-[#1B1411] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]"
              aria-label="Close wishlist"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="grid flex-1 place-items-center rounded-[1.5rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/76 p-8 text-center">
              <div>
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#F4C6D3]/65 text-[#1B1411]">
                  <Heart className="h-7 w-7" />
                </div>
                <p className="font-serif text-lg text-[#1B1411]">
                  Your wishlist is empty.
                </p>
                <p className="mt-3 text-sm leading-6 text-[#1B1411]/60">
                  Tap the heart on a product to save it here.
                </p>
              </div>
            </div>
          ) : (
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-[1.75rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/82 p-4 shadow-lg shadow-black/5"
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image || "/weekly-pearl-box.png"}
                      alt={product.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-lg text-[#1B1411]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#8A6A3F]">
                        {product.category || "Product"}
                      </p>
                      <p className="mt-2 font-serif text-lg text-[#1B1411]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F4C6D3]/65 text-[#1B1411] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                      className="rounded-full border border-[#B89A5E]/35 px-4 py-2.5 text-sm font-semibold text-[#4A3832] transition hover:bg-[#CFE9DF]/70"
                    >
                      Quick View
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product, 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B1411] px-4 py-2.5 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function AccountDrawer({ open, onClose, session, authStatus }) {
  const user = session?.user;
  const isSignedIn = authStatus === "authenticated" && user;
  const initials = (user?.name || user?.email || "P")
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[74] bg-[#1B1411]/52 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden border-l border-[#B89A5E]/25 bg-[#FFF8EF]/96 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="relative overflow-hidden border-b border-[#B89A5E]/20 p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#CFE9DF]/55 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#F4C6D3]/45 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8A6A3F]">
                    Pearl Profile
                  </p>
                  <h2 className="mt-2 font-serif text-4xl leading-tight text-[#1B1411]">
                    {isSignedIn ? "Welcome back" : "Your account"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#F7E8DD] text-[#1B1411] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]"
                  aria-label="Close account panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-7">
              {isSignedIn ? (
                <>
                  <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/82 p-5 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-4">
                      <div className="grid h-16 w-16 place-items-center rounded-full border border-[#B89A5E]/35 bg-[radial-gradient(circle_at_35%_30%,#FFFFFF,#F7E8DD)] font-serif text-2xl text-[#4A3832] shadow-md">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-serif text-2xl text-[#1B1411]">
                          {user.name || "Pearl Client"}
                        </p>
                        <p className="truncate text-sm text-[#4A3832]/65">{user.email}</p>
                        {user.isAdmin && (
                          <span className="mt-2 inline-flex rounded-full bg-[#CFE9DF]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1411]">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {user.isAdmin && (
                      <a
                        href="/admin"
                        className="inline-flex items-center justify-between rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/82 px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#1B1411] hover:text-[#FFF8EF]"
                      >
                        Open Admin Atelier <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href="/#shop"
                      onClick={onClose}
                      className="inline-flex items-center justify-between rounded-full border border-[#B89A5E]/30 bg-[#FFFDF7]/82 px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#CFE9DF]/80"
                    >
                      Continue Shopping <ShoppingBag className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="inline-flex items-center justify-center rounded-full bg-[#1B1411] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-[2rem] border border-[#B89A5E]/20 bg-[#FFFDF7]/82 p-6 text-center shadow-xl shadow-black/5">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#CFE9DF]/70 text-[#1B1411]">
                    <UserRound className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#1B1411]">Sign in to checkout</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#4A3832]/65">
                    Create an account or sign in so your order uses your real customer profile instead of a guest checkout.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <a
                      href="/signin?callbackUrl=/"
                      className="rounded-full bg-[#1B1411] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                    >
                      Sign in
                    </a>
                    <a
                      href="/signup?callbackUrl=/"
                      className="rounded-full border border-[#B89A5E]/35 bg-[#FFF8EF] px-5 py-3 text-sm font-semibold text-[#4A3832] transition hover:bg-[#CFE9DF]/75"
                    >
                      Create account
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({
  open,
  onClose,
  cart,
  cartCount,
  onRemoveItem,
  onRemoveAll,
  onCheckout,
  isCheckingOut,
  checkoutNotice,
}) {
  const [removeQuantities, setRemoveQuantities] = useState({});
  const [removingProductId, setRemovingProductId] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const previousCartIds = useRef([]);

  useEffect(() => {
    const cartIds = cart.map((product) => String(product.id));
    const previousIds = previousCartIds.current;
    const addedIds = cartIds.filter((id) => !previousIds.includes(id));

    setSelectedProductIds((prev) => {
      const stillInCart = prev.filter((id) => cartIds.includes(id));
      return Array.from(new Set([...stillInCart, ...addedIds]));
    });

    previousCartIds.current = cartIds;
  }, [cart]);

  const selectedCart = cart.filter((product) =>
    selectedProductIds.includes(String(product.id))
  );

  const selectedItemCount = selectedCart.reduce(
    (sum, product) => sum + (product.cartQuantity ?? 1),
    0
  );

  const selectedSubtotal = selectedCart.reduce(
    (sum, product) => sum + product.price * (product.cartQuantity ?? 1),
    0
  );

  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * (product.cartQuantity ?? 1),
    0
  );

  const selectedItemLabel = selectedItemCount === 1 ? "item" : "items";
  const itemLabel = cartCount === 1 ? "item" : "items";
  const toggleSelectProduct = (productId) => {
    const id = String(productId);

    setSelectedProductIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const getRemoveQuantity = (product) => {
    const maxQuantity = product.cartQuantity ?? 1;
    return Math.min(removeQuantities[product.id] ?? 1, maxQuantity);
  };

  const updateRemoveQuantity = (product, change) => {
    const maxQuantity = product.cartQuantity ?? 1;

    setRemoveQuantities((prev) => {
      const current = prev[product.id] ?? 1;
      const next = Math.min(maxQuantity, Math.max(1, current + change));

      return {
        ...prev,
        [product.id]: next,
      };
    });
  };

  const handleRemoveQuantity = (product) => {
    const quantityToRemove = getRemoveQuantity(product);

    setRemovingProductId(product.id);

    window.setTimeout(() => {
      onRemoveItem(product.id, quantityToRemove);

      setRemoveQuantities((prev) => {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      });

      setRemovingProductId(null);
    }, 520);
  };

  const handleCheckoutSelected = () => {
    if (selectedCart.length === 0 || isCheckingOut) return;
    onCheckout(selectedCart);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-[#1B1411]/60 backdrop-blur-md"
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 230 }}
            className="relative ml-auto flex h-full w-full max-w-[540px] flex-col overflow-hidden border-l border-[#D8C7A3]/45 bg-[#FFF9F1] shadow-[0_28px_90px_rgba(27,20,17,0.32)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.92),transparent_18%),linear-gradient(145deg,rgba(255,251,246,0.98),rgba(255,248,239,0.95),rgba(247,232,221,0.88))]" />
            <div className="pointer-events-none absolute -right-16 top-16 h-44 w-44 rounded-full bg-white/55 blur-2xl" />
            <div className="pointer-events-none absolute -left-16 top-52 h-40 w-40 rounded-full bg-[#CFE9DF]/22 blur-3xl" />
            <div className="pointer-events-none absolute right-[-4rem] bottom-24 h-44 w-44 rounded-full bg-[#F4C6D3]/18 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B89A5E]/50 to-transparent" />

            <div className="relative z-10 border-b border-[#D8C7A3]/28 px-7 pb-5 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D8C7A3]/65 bg-white/72 px-3.5 py-1.5 shadow-sm shadow-[#B89A5E]/10 backdrop-blur-sm">
                    <Gem className="h-3.5 w-3.5 text-[#8A6A3F]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A6A3F]">
                      Pearl Cart Atelier
                    </span>
                  </div>

                  <h3 className="font-serif text-[2.65rem] leading-[0.92] tracking-[-0.02em] text-[#1B1411] sm:text-[3rem]">
                    Your Cart
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#4A3832]/62">
                    Review your selected pearl pieces before secure checkout.
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] font-medium text-[#8A6A3F]/90">
                    <span>{cartCount} {itemLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-[#B89A5E]/70" />
                    <span>{selectedItemCount} selected</span>
                    <span className="h-1 w-1 rounded-full bg-[#B89A5E]/70" />
                    <span>{formatPrice(selectedSubtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D8C7A3]/60 bg-white/78 text-[#1B1411] shadow-[0_10px_24px_rgba(184,154,94,0.12)] transition hover:-translate-y-0.5 hover:bg-[#1B1411] hover:text-[#FFF8EF]"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

            </div>

            <div className="relative z-10 flex-1 space-y-4 overflow-y-auto px-7 py-5">
              {cart.length === 0 ? (
                <div className="rounded-[1.5rem] border border-[#E2D2B2]/55 bg-white/72 p-9 text-center shadow-[0_18px_40px_rgba(27,20,17,0.06)] backdrop-blur-xl">
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full border border-[#E6DABD] bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.98),rgba(247,232,221,0.95),rgba(232,216,195,0.88))] text-[#8A6A3F] shadow-[0_8px_22px_rgba(184,154,94,0.18)]">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                  <p className="font-serif text-3xl text-[#1B1411]">
                    Your cart is empty
                  </p>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#4A3832]/65">
                    Add a luminous pearl piece from the collection to begin your curated checkout.
                  </p>
                  <a
                    href="/#shop"
                    onClick={onClose}
                    className="mt-6 inline-flex rounded-full bg-[#1B1411] px-6 py-3 text-sm font-medium text-[#FFF8EF] shadow-lg shadow-black/10 transition hover:bg-[#B89A5E] hover:text-[#1B1411]"
                  >
                    Shop Collection
                  </a>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((product) => {
                    const cartQuantity = product.cartQuantity ?? 1;
                    const removeQuantity = getRemoveQuantity(product);
                    const isSelected = selectedProductIds.includes(String(product.id));
                    const lineTotal = product.price * cartQuantity;

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={
                          removingProductId === product.id
                            ? {
                                opacity: 0.72,
                                y: -6,
                                scale: 0.985,
                                filter: "brightness(1.06)",
                                boxShadow: "0 22px 60px rgba(184, 154, 94, 0.22)",
                              }
                            : {
                                opacity: isSelected ? 1 : 0.78,
                                y: 0,
                                scale: 1,
                                filter: "brightness(1)",
                                boxShadow: isSelected
                                  ? "0 18px 44px rgba(184, 154, 94, 0.13)"
                                  : "0 8px 24px rgba(27, 20, 17, 0.04)",
                              }
                        }
                        exit={{
                          opacity: 0,
                          x: 28,
                          scale: 0.96,
                          filter: "blur(2px)",
                        }}
                        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative overflow-hidden rounded-[1.75rem] border p-4 backdrop-blur-xl transition ${
                          isSelected
                            ? "border-[#D9C7A5]/72 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(255,248,239,0.96),rgba(247,232,221,0.84))]"
                            : "border-[#E8DCC7]/55 bg-white/54"
                        }`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_30%)]" />
                        <div
                          className={`pointer-events-none absolute inset-y-4 left-0 w-[4px] rounded-r-full transition ${
                            isSelected ? "bg-[#B89A5E]" : "bg-[#E5D9C5]"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => toggleSelectProduct(product.id)}
                          aria-label={`${isSelected ? "Deselect" : "Select"} ${product.name} for checkout`}
                          className={`absolute left-3 top-3 z-20 grid h-5 w-5 place-items-center rounded-full border text-[9px] font-bold shadow-[0_6px_14px_rgba(27,20,17,0.12)] transition ${
                            isSelected
                              ? "border-[#1B1411] bg-[#1B1411] text-[#FFF8EF]"
                              : "border-[#B89A5E]/45 bg-white/90 text-transparent hover:border-[#1B1411]"
                          }`}
                        >
                          ✓
                        </button>

                        <AnimatePresence>
                          {removingProductId === product.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem]"
                            >
                              <motion.div
                                initial={{ x: "-120%" }}
                                animate={{ x: "260%" }}
                                transition={{ duration: 0.52, ease: "easeInOut" }}
                                className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[#FFF8EF]/85 to-transparent"
                              />
                              <div className="absolute inset-0 rounded-[1.75rem] border border-[#B89A5E]/35" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="relative flex gap-3.5 pl-2">
                          <div className="relative shrink-0 rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(247,232,221,0.9))] p-1.5 shadow-[0_10px_24px_rgba(27,20,17,0.07)]">
                            <div className="relative h-[84px] w-[84px] overflow-hidden rounded-[1rem] bg-[#F7E8DD] ring-1 ring-white/70">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_35%,rgba(27,20,17,0.02))]" />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-serif text-[1.55rem] leading-tight text-[#1B1411]">
                                  {product.name}
                                </p>
                                <p className="mt-1 truncate text-sm text-[#4A3832]/58">
                                  {product.metal || product.category}
                                </p>
                              </div>

                              <span className="shrink-0 rounded-full border border-[#E1D2B7]/75 bg-white/70 px-3 py-1 text-xs font-semibold text-[#4A3832] shadow-sm">
                                Qty {cartQuantity}
                              </span>
                            </div>

                            <div className="mt-3 flex items-end justify-between gap-3">
                              <motion.p
                                key={lineTotal}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18 }}
                                className="font-serif text-[1.75rem] leading-none text-[#1B1411]"
                              >
                                {formatPrice(lineTotal)}
                              </motion.p>

                              <span
                                className={`rounded-full border px-3 py-1 text-[10px] font-semibold shadow-sm ${
                                  isSelected
                                    ? "border-[#CFE9DF]/60 bg-[#E3F2ED] text-[#1B1411]"
                                    : "border-[#E8DCC7]/80 bg-white/60 text-[#4A3832]/50"
                                }`}
                              >
                                {isSelected ? "Selected" : "Not selected"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#DCCCAE]/40 pt-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveQuantity(product)}
                            disabled={removingProductId === product.id}
                            className="rounded-full border border-[#E6DABD]/80 bg-white/56 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A6A3F] shadow-sm transition hover:border-[#B89A5E] hover:text-[#1B1411] disabled:cursor-wait disabled:opacity-70"
                          >
                            {cartQuantity > 1
                              ? `Remove ${removeQuantity}`
                              : removingProductId === product.id
                              ? "Removing..."
                              : "Remove"}
                          </button>

                          {cartQuantity > 1 && (
                            <div className="flex items-center gap-2 rounded-full border border-[#E5D8C2]/80 bg-white/60 px-2 py-1 shadow-sm">
                              <span className="pl-2 text-[10px] font-medium text-[#4A3832]/50">
                                Remove qty
                              </span>
                              <div className="flex h-8 items-center rounded-full border border-[#B89A5E]/28 bg-[#FFFDF9]">
                                <button
                                  type="button"
                                  onClick={() => updateRemoveQuantity(product, -1)}
                                  disabled={removeQuantity <= 1}
                                  className="grid h-8 w-8 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>

                                <motion.span
                                  key={removeQuantity}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.14 }}
                                  className="min-w-6 text-center text-xs font-semibold text-[#1B1411]"
                                >
                                  {removeQuantity}
                                </motion.span>

                                <button
                                  type="button"
                                  onClick={() => updateRemoveQuantity(product, 1)}
                                  disabled={removeQuantity >= cartQuantity}
                                  className="grid h-8 w-8 place-items-center rounded-full text-[#4A3832] transition hover:bg-[#F7E8DD] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            <div className="relative z-10 border-t border-[#D8C7A3]/35 bg-[linear-gradient(180deg,rgba(255,251,246,0.86),rgba(255,248,239,0.98))] px-7 py-5 shadow-[0_-18px_50px_rgba(27,20,17,0.07)] backdrop-blur-xl">
              <div className="mb-4 overflow-hidden rounded-[1.55rem] border border-[#E2D2B2]/65 bg-white/58 p-4 shadow-[0_14px_36px_rgba(27,20,17,0.045)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8A6A3F]">
                      Order Summary
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#4A3832]/55">
                      Taxes and delivery are calculated later.
                    </p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-[#E6DABD]/75 bg-white/70 text-[#8A6A3F] shadow-sm">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-[#4A3832]/68">
                  <div className="flex items-center justify-between gap-4">
                    <span>Total cart</span>
                    <span>
                      {cartCount} {itemLabel} · {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span>Selected</span>
                    <span>
                      {selectedItemCount} {selectedItemLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-4 border-t border-[#DCCCAE]/45 pt-3">
                  <span className="text-sm font-semibold text-[#1B1411]">
                    Selected subtotal
                  </span>
                  <motion.span
                    key={selectedSubtotal}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="font-serif text-[2.25rem] leading-none text-[#1B1411]"
                  >
                    {formatPrice(selectedSubtotal)}
                  </motion.span>
                </div>
              </div>

              <AnimatePresence>
                {checkoutNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className={`mb-4 rounded-[1.35rem] border px-4 py-3 text-sm shadow-sm ${
                      checkoutNotice.type === "success"
                        ? "border-[#CFE9DF]/65 bg-[#E0F0EA]/88 text-[#1B1411]"
                        : "border-[#F4C6D3]/70 bg-[#FAE0E7]/80 text-[#1B1411]"
                    }`}
                  >
                    {checkoutNotice.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="button"
                whileHover={
                  selectedItemCount > 0 && !isCheckingOut
                    ? { scale: 1.015, y: -1 }
                    : undefined
                }
                whileTap={{ scale: 0.96 }}
                animate={
                  isCheckingOut
                    ? {
                        scale: [1, 1.025, 1],
                        boxShadow: [
                          "0 18px 45px rgba(184, 154, 94, 0.16)",
                          "0 24px 70px rgba(184, 154, 94, 0.35)",
                          "0 18px 45px rgba(184, 154, 94, 0.16)",
                        ],
                      }
                    : {
                        scale: 1,
                        boxShadow: "0 18px 42px rgba(27, 20, 17, 0.16)",
                      }
                }
                transition={
                  isCheckingOut
                    ? { duration: 1.15, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.22, ease: "easeOut" }
                }
                onClick={handleCheckoutSelected}
                disabled={selectedItemCount === 0 || isCheckingOut}
                className="relative w-full overflow-hidden rounded-full bg-[linear-gradient(135deg,#1B1411,#2A1E1A,#1B1411)] px-5 py-3 text-sm font-semibold text-[#FFF8EF] transition hover:text-[#FFF8EF] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_36%)]" />
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D9C7A5]/75 to-transparent" />

                <AnimatePresence>
                  {isCheckingOut && (
                    <motion.span
                      initial={{ x: "-120%" }}
                      animate={{ x: "120%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    />
                  )}
                </AnimatePresence>

                <span className="relative z-10 flex items-center justify-center gap-2">
                  <AnimatePresence mode="wait" initial={false}>
                    {isCheckingOut ? (
                      <motion.span
                        key="checking-out"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-[#FFF8EF]/35 border-t-[#D9C7A5]"
                        />
                        Securing selected pearls...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="secure-checkout"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        {selectedItemCount > 0
                          ? `Secure checkout · ${selectedItemCount} selected ${selectedItemLabel}`
                          : "Select pieces to checkout"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickViewModal({ product, onClose, onAddToCart, showReturnButton = false, onReturnToSearch }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-[#FFF8EF] shadow-2xl md:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden bg-[#F7E8DD]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="relative overflow-y-auto p-6 sm:p-7">
              <button
                type="button"
                onClick={showReturnButton ? onReturnToSearch : onClose}
                className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full hover:bg-black/5"
                aria-label={showReturnButton ? "Return to search" : "Close quick view"}
              >
                <X className="h-5 w-5 text-[#1B1411]" />
              </button>
              <p className="text-xs uppercase tracking-[0.32em] text-[#8A6A3F]">{product.category}</p>
              <h3 className="mt-3 font-serif text-3xl text-[#1B1411]">{product.name}</h3>
              <p className="mt-3 font-serif text-2xl text-[#1B1411]">{formatPrice(product.price)}</p>
              <p className="mt-5 text-sm leading-7 text-[#1B1411]/70">
                A luminous statement piece designed with balanced proportion, radiant pearl quality, and refined metal finishing.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button onClick={() => { onAddToCart(product); onClose(); }} className="rounded-full bg-[#1B1411] px-5 py-3 text-sm font-medium text-[#FFF8EF] hover:bg-[#B89A5E] hover:text-[#1B1411]">
                  Add to Cart
                </button>
                <a href="#product-details" onClick={onClose} className="rounded-full border border-[#B89A5E]/40 px-6 py-4 text-center text-sm font-medium text-[#1B1411] hover:bg-[#B89A5E]/10">
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
    <section id="about" className="relative overflow-hidden bg-[#FFF8EF] px-5 py-10 sm:px-6 lg:px-8">
      <SoftBackgroundDecor />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>About the Brand</SectionLabel>
          <h2 className="font-serif text-xl leading-tight text-[#1B1411] sm:text-4xl">Soft luxury, shaped by pearl light.</h2>
          <p className="mt-4 text-sm leading-7 text-[#1B1411]/75">
            PEARLfectly Pearls is styled around soft mint boxes, blush velvet packaging, warm ivory surfaces, and classic black typography. The look is gentle, feminine, clean, and product-focused—perfect for pearl stud earrings and gift sets.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Premium craftsmanship", "Trustworthy sourcing", "Artistic restraint", "Heirloom quality"].map((item) => (
              <div key={item} className="rounded-xl border border-[#B89A5E]/20 bg-[#F7E8DD]/82 p-3.5 text-sm text-[#1B1411] backdrop-blur-md">
                <Sparkles className="mb-2 h-4 w-4 text-[#B89A5E]" /> {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="relative min-h-[360px]">
          <img src="/weekly-pearl-box.png" alt="PEARLfectly pearl gift packaging and stud set" className="absolute right-0 top-0 h-[66%] w-[72%] rounded-[1.75rem] object-cover shadow-xl" />
          <div className="absolute bottom-0 left-0 w-[62%] rounded-[1.25rem] border border-[#B89A5E]/25 bg-[#FFF8EF]/82 p-5 shadow-xl backdrop-blur-xl">
            <p className="font-serif text-lg text-[#1B1411]">Pearls chosen for luster, symmetry, surface, and timeless character.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PEARLfectlyPearlsWebsite() {
  const { data: session, status: authStatus } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [quickViewSource, setQuickViewSource] = useState(null);
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(null);

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.cartQuantity ?? 1),
    0
  );

  const wishlistProducts = wishlist.map((savedProduct) => {
    const latestProduct = products.find(
      (product) => String(product.id) === String(savedProduct.id)
    );

    return latestProduct ? { ...savedProduct, ...latestProduct } : savedProduct;
  });

  const wishlistCount = wishlist.length;

  useEffect(() => {
    try {
      const savedWishlist = window.localStorage.getItem("pearlfectly-wishlist");
      const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

      if (Array.isArray(parsedWishlist)) {
        setWishlist(parsedWishlist);
      }
    } catch (error) {
      console.error("Unable to load wishlist", error);
    } finally {
      setWishlistLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!wishlistLoaded) return;

    window.localStorage.setItem(
      "pearlfectly-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist, wishlistLoaded]);

  const isWishlisted = (product) =>
    wishlist.some((item) => String(item.id) === String(product.id));

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));

      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      }

      return [
        {
          ...product,
          cartQuantity: undefined,
        },
        ...prev,
      ];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => String(item.id) !== String(productId))
    );
  };

  const addToCart = (product, quantity = 1) => {
    const stock = Number(product.stock ?? 0);
    if (stock <= 0) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      const existingQuantity = existingItem?.cartQuantity ?? 0;
      const allowedQuantity = Math.max(0, stock - existingQuantity);
      const quantityToAdd = Math.min(quantity, allowedQuantity);

      if (quantityToAdd <= 0) {
        return prev;
      }

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: (item.cartQuantity ?? 1) + quantityToAdd,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartQuantity: quantityToAdd,
        },
      ];
    });
  };

  const handleCheckout = async (selectedCartItems = cart) => {
    if (selectedCartItems.length === 0 || isCheckingOut) return;

    if (authStatus !== "authenticated" || !session?.user) {
      setCheckoutNotice({
        type: "error",
        message: "Please sign in or create an account before checkout.",
      });
      setAccountOpen(true);
      return;
    }

    setIsCheckingOut(true);
    setCheckoutNotice(null);

    const selectedIds = selectedCartItems.map((item) => String(item.id));

    const items = selectedCartItems.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: Number(item.price || 0),
      quantity: item.cartQuantity ?? 1,
      image: item.image,
      metal: item.metal,
    }));

    const selectedItemCount = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: session.user.name || session.user.email || "Pearl Client",
          customerEmail: session.user.email || "client@example.com",
          items,
          itemCount: selectedItemCount,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const order = await response.json();

      setCart((prev) =>
        prev.filter((item) => !selectedIds.includes(String(item.id)))
      );
      await loadProducts();

      setCheckoutNotice({
        type: "success",
        message: `Order ${order.orderNumber} placed successfully for ${session.user.name || session.user.email}. Unselected items stayed in your cart.`,
      });

      setTimeout(() => {
        setCheckoutNotice(null);
      }, 4000);
    } catch (error) {
      console.error(error);

      setCheckoutNotice({
        type: "error",
        message: "Checkout failed. Please try again.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const removeFromCart = (productId, quantityToRemove = 1) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== productId) return item;

          const nextQuantity = (item.cartQuantity ?? 1) - quantityToRemove;

          return {
            ...item,
            cartQuantity: nextQuantity,
          };
        })
        .filter((item) => (item.cartQuantity ?? 1) > 0)
    );
  };

  const removeAllFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load products");
      const data = await response.json();
      setProducts(Array.isArray(data) ? data.map(normalizeProduct) : []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();

    const refreshWhenReturningToTab = () => loadProducts();
    window.addEventListener("focus", refreshWhenReturningToTab);

    return () => {
      window.removeEventListener("focus", refreshWhenReturningToTab);
    };
  }, []);


  const openQuickView = (product) => {
    setQuickView(product);
    setQuickViewSource(null);
  };

  const openQuickViewFromSearch = (product) => {
    setQuickView(product);
    setQuickViewSource("search");
    setSearchOpen(false);
  };

  const closeQuickView = () => {
    setQuickView(null);
    setQuickViewSource(null);
  };

  const returnToSearchFromQuickView = () => {
    setQuickView(null);
    setQuickViewSource(null);
    setSearchOpen(true);
  };

  return (
    <div className="scroll-smooth">
      <main className="min-h-screen bg-[#FFF8EF] font-sans text-[#1B1411] antialiased">
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
        <Navbar
          onSearch={() => setSearchOpen(true)}
          onCart={() => setCartOpen(true)}
          onWishlist={() => setWishlistOpen(true)}
          onAccount={() => setAccountOpen(true)}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          session={session}
          authStatus={authStatus}
        />
        <Hero />
        <TrustBar />
        <ProductShowcase products={products} onQuickView={openQuickView} addToCart={addToCart} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
        <FeaturedCollections />
        <About />
        <Craftsmanship />
        <ProductDetailLayout products={products} addToCart={addToCart} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
        <LuxuryExperience />
        <Testimonials />
        <Gallery />
        <Newsletter />
        <FAQ />
        <Footer />
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onQuickView={openQuickViewFromSearch} onAddToCart={addToCart} products={products} />
        <WishlistDrawer
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          wishlist={wishlistProducts}
          onRemoveItem={removeFromWishlist}
          onQuickView={openQuickView}
          onAddToCart={addToCart}
        />
        <AccountDrawer
          open={accountOpen}
          onClose={() => setAccountOpen(false)}
          session={session}
          authStatus={authStatus}
        />
        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          cartCount={cartCount}
          onRemoveItem={removeFromCart}
          onRemoveAll={removeAllFromCart}
          onCheckout={handleCheckout}
          isCheckingOut={isCheckingOut}
          checkoutNotice={checkoutNotice}
        />
        <QuickViewModal product={quickView} onClose={closeQuickView} onAddToCart={addToCart} showReturnButton={quickViewSource === "search"} onReturnToSearch={returnToSearchFromQuickView} />
      </main>
    </div>
  );
}
