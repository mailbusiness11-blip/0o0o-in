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
    category: "Dresses",
  },

  {
    _id: "2",
    name: "Luxury Women Handbag",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    description: "Premium fashion handbag.",
    url: "#",
    category: "Fashion",
  },

  {
    _id: "3",
    name: "Women Casual Top",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    description: "Stylish casual ladies top.",
    url: "#",
    category: "Tops",
  },

  {
    _id: "4",
    name: "Modern Ladies Shoes",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
    description: "Comfortable modern shoes.",
    url: "#",
    category: "Shoes",
  },

  {
    _id: "5",
    name: "Korean Fashion Dress",
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    description: "Trending korean fashion dress.",
    url: "#",
    category: "Dresses",
  },

  {
    _id: "6",
    name: "Women Elegant Blouse",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    description: "Elegant stylish blouse.",
    url: "#",
    category: "Blouse",
  },

  {
    _id: "7",
    name: "Fashion Mini Skirt",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    description: "Cute mini skirt fashion.",
    url: "#",
    category: "Skirts",
  },

  {
    _id: "8",
    name: "Women Luxury Coat",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    description: "Luxury winter fashion coat.",
    url: "#",
    category: "Winter",
  },

];

export async function GET() {
  return NextResponse.json({
    products,
  });
}