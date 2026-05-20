import { NextResponse } from "next/server";

const products = [

  {
    _id: "1",
    name: "Wireless Earbuds",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
    description: "Premium bluetooth earbuds.",
    url: "#",
    category: "Electronics",
  },

  {
    _id: "2",
    name: "Gaming Mouse",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    description: "RGB gaming mouse.",
    url: "#",
    category: "Electronics",
  },

  {
    _id: "3",
    name: "Elegant Summer Dress",
    price: 1499,
    image:
      "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
    description: "Beautiful ladies dress.",
    url: "#",
    category: "Fashion and Apparel",
  },

  {
    _id: "4",
    name: "Women Casual Top",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    description: "Stylish ladies top.",
    url: "#",
    category: "Fashion and Apparel",
  },

  {
    _id: "5",
    name: "Organic Grocery Box",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    description: "Healthy groceries.",
    url: "#",
    category: "Grocery and Essentials",
  },

  {
    _id: "6",
    name: "Luxury Skin Care Set",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    description: "Premium beauty products.",
    url: "#",
    category: "Beauty and Personal Care",
  },

  {
    _id: "7",
    name: "Yoga Mat",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    description: "Comfortable yoga mat.",
    url: "#",
    category: "Health and Wellness",
  },

  {
    _id: "8",
    name: "Dog Bed",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    description: "Soft pet bed.",
    url: "#",
    category: "Pet Care",
  },

  {
    _id: "9",
    name: "Luxury Handbag",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    description: "Luxury handbag.",
    url: "#",
    category: "Niche Fashion and Lifestyle",
  },

];

export async function GET() {
  return NextResponse.json({
    products,
  });
}