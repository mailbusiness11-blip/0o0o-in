import { NextResponse } from "next/server";

// Generate 100 demo products
const products = Array.from({ length: 100 }, (_, i) => ({
  _id: (i + 1).toString(),
  name: `Demo Product ${i + 1}`,
  price: Math.floor(Math.random() * 3000 + 500), // random price 500–3500
  image: `https://picsum.photos/400/300?random=${i + 1}`,
  description: `This is demo product number ${i + 1}.`,
  url: "#",
  category: ["Ladies Dresses", "Gadgets", "Kitchen Tools", "Fashion", "Shoes"][i % 5],
}));

export async function GET() {
  return NextResponse.json({ products });
}