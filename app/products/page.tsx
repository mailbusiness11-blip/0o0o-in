import { NextResponse } from "next/server";

export async function GET() {

  const products = [

    {
      _id: "1",
      name: "Wireless Earbuds",
      price: 1999,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
      description: "Premium bluetooth earbuds.",
      url: "#",
      category: "Electronics",
    },

    {
      _id: "2",
      name: "Elegant Summer Dress",
      price: 1499,
      image: "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
      description: "Beautiful ladies dress.",
      url: "#",
      category: "Fashion and Apparel",
    },

    {
      _id: "3",
      name: "Luxury Skin Care Set",
      price: 1599,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      description: "Beauty products.",
      url: "#",
      category: "Beauty and Personal Care",
    },

    {
      _id: "4",
      name: "Yoga Mat",
      price: 899,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
      description: "Comfortable yoga mat.",
      url: "#",
      category: "Health and Wellness",
    },

  ];

  return NextResponse.json({
    success: true,
    products,
  });

}