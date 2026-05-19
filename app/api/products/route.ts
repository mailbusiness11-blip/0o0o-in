import { NextResponse } from "next/server";

const products = [
  {
    _id: "1",
    name: "Elegant Summer Dress",
    price: 1499,
    image:
      "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
    description: "Beautiful ladies summer dress.",
    url: "#",
    category: "Ladies Dresses",
  },
  {
    _id: "2",
    name: "Kitchen Storage Box",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1584269600519-b2f6a7f0b1d1?q=80&w=1200&auto=format&fit=crop",
    description: "Premium kitchen organizer.",
    url: "#",
    category: "Kitchen Tools",
  },
  {
    _id: "3",
    name: "Wireless Earbuds",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
    description: "High quality bluetooth earbuds.",
    url: "#",
    category: "Gadgets",
  },
  {
    _id: "4",
    name: "Luxury Handbag",
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    description: "Fashionable luxury handbag.",
    url: "#",
    category: "Fashion",
  },
  {
    _id: "5",
    name: "Modern Sneakers",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    description: "Comfortable modern sneakers.",
    url: "#",
    category: "Shoes",
  },
];

export async function GET() {
  return NextResponse.json({ products });
}