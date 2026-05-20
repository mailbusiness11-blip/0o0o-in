import { NextResponse } from "next/server";

const products = [

  // Electronics
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
    name: "Gaming Mouse",
    price: 1299,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    description: "RGB gaming mouse.",
    url: "#",
    category: "Electronics",
  },

  // Fashion and Apparel
  {
    _id: "3",
    name: "Elegant Summer Dress",
    price: 1499,
    image: "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
    description: "Beautiful ladies dress.",
    url: "#",
    category: "Fashion and Apparel",
  },

  {
    _id: "4",
    name: "Women Casual Top",
    price: 999,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    description: "Stylish ladies top.",
    url: "#",
    category: "Fashion and Apparel",
  },

  // Grocery and Essentials
  {
    _id: "5",
    name: "Organic Grocery Box",
    price: 799,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    description: "Healthy groceries.",
    url: "#",
    category: "Grocery and Essentials",
  },

  {
    _id: "6",
    name: "Kitchen Storage Box",
    price: 599,
    image: "https://images.unsplash.com/photo-1584269600519-b2f6a7f0b1d1?q=80&w=1200&auto=format&fit=crop",
    description: "Kitchen organizer.",
    url: "#",
    category: "Grocery and Essentials",
  },

  // Beauty and Personal Care
  {
    _id: "7",
    name: "Luxury Skin Care Set",
    price: 1599,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    description: "Premium beauty products.",
    url: "#",
    category: "Beauty and Personal Care",
  },

  {
    _id: "8",
    name: "Hair Dryer",
    price: 1899,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    description: "Professional hair dryer.",
    url: "#",
    category: "Beauty and Personal Care",
  },

  // Health and Wellness
  {
    _id: "9",
    name: "Yoga Mat",
    price: 899,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    description: "Comfortable yoga mat.",
    url: "#",
    category: "Health and Wellness",
  },

  {
    _id: "10",
    name: "Gym Dumbbells",
    price: 2499,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    description: "Fitness dumbbells.",
    url: "#",
    category: "Health and Wellness",
  },

  // Pet Care
  {
    _id: "11",
    name: "Dog Bed",
    price: 1299,
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    description: "Soft pet bed.",
    url: "#",
    category: "Pet Care",
  },

  {
    _id: "12",
    name: "Pet Grooming Kit",
    price: 999,
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1200&auto=format&fit=crop",
    description: "Pet grooming set.",
    url: "#",
    category: "Pet Care",
  },

  // Niche Fashion and Lifestyle
  {
    _id: "13",
    name: "Luxury Handbag",
    price: 2899,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    description: "Luxury handbag.",
    url: "#",
    category: "Niche Fashion and Lifestyle",
  },

  {
    _id: "14",
    name: "Minimal Desk Lamp",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    description: "Modern desk lamp.",
    url: "#",
    category: "Niche Fashion and Lifestyle",
  },

];

export async function GET() {
  return NextResponse.json({ products });
}