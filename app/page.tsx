export default function HomePage() {

  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Health",
    "Pet Care",
    "Lifestyle",
  ];

  const products = [

    {
      id: 1,
      name: "Wireless Earbuds",
      price: "₹1999",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Elegant Summer Dress",
      price: "₹1499",
      image: "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
    },

    {
      id: 3,
      name: "Luxury Skin Care Set",
      price: "₹1599",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,
      name: "Yoga Mat",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  return (

    <main className="min-h-screen bg-gray-100 p-5">

      {/* TOP COMING SOON */}
      <div className="bg-black text-white text-center py-3 rounded-xl mb-6 text-lg font-bold animate-pulse">
        🚀 Coming Soon — 0o0o India Marketplace
      </div>

      {/* Header */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold">
          0o0o India
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          India’s Cheapest Multi-Category Ecommerce Marketplace
        </p>

      </div>

      {/* CATEGORY SECTION */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Shop By Categories
        </h2>

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (

            <div
              key={category}
              className="bg-white border px-5 py-3 rounded-2xl shadow font-medium"
            >
              {category}
            </div>

          ))}

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p className="text-green-600 font-bold text-xl mt-2">
                {product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}