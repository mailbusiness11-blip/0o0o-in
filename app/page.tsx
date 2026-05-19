async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.products || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        0o0o Store 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="border rounded-2xl p-4 shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-xl mt-2">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}