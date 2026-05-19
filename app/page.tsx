async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function HomePage() {
  const data = await getProducts();

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        0o0o Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.products.map((product: any) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {product.description}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{product.price}
              </p>

              <a
                href={`/product/${product._id}`}
                className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}