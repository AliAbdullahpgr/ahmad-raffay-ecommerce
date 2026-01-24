// Brand Colors
export const COLORS = {
  emerald: "#1B4D3E",
  gold: "#D4AF37",
  terracotta: "#C75B39",
  cream: "#FDF8F3",
  charcoal: "#2D2D2D",
} as const;

// Contact Information
export const CONTACT = {
  whatsapp: "03199119572",
  instagram: "@ahmadrafayhandwork",
  facebook: "Ahmad Rafay Handwork",
  instagramUrl: "https://instagram.com/ahmadrafayhandwork",
  facebookUrl: "https://facebook.com/ahmadrafayhandwork",
} as const;

// Site Information
export const SITE = {
  name: "Ahmad Rafay Handwork",
  tagline: "Beautiful Embroidery, Honest Prices",
  description:
    "Traditional hand-embroidered shirts & trousers from Rajanpur. Quality embroidery at honest prices.",
  url: "https://ahmadrafayhandwork.com",
} as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery?category=shirts", label: "Shirts" },
  { href: "/gallery?category=trousers", label: "Trousers" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

// Admin Navigation Links
export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Products", icon: "Package" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

// Why Choose Us Items
export const WHY_CHOOSE_US = [
  {
    icon: "Hand",
    title: "Handcrafted",
    description: "Every stitch made by skilled artisans from Rajanpur",
  },
  {
    icon: "Banknote",
    title: "Affordable",
    description: "Quality embroidery at honest, fair prices",
  },
  {
    icon: "Heart",
    title: "For Women",
    description: "Designed for elegance, comfort & traditional beauty",
  },
  {
    icon: "Truck",
    title: "Nationwide",
    description: "Delivery across Pakistan with care",
  },
] as const;

// How to Order Steps
export const ORDER_STEPS = [
  {
    step: 1,
    title: "Browse",
    description: "Explore our collection of shirts & trousers",
    icon: "Search",
  },
  {
    step: 2,
    title: "Message Us",
    description: "Contact us on WhatsApp or social media",
    icon: "MessageCircle",
  },
  {
    step: 3,
    title: "Receive",
    description: "Get your beautiful embroidered wear delivered",
    icon: "Package",
  },
] as const;
