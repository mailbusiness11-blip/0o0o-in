async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: any) {
  const product = await getProduct(
    params.id
  );

  if (!product) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-4xl font-bold">
          Product not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-10">
      <a
        href="/"
        className="text-blue-600"
      >
        ← Back to Home
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl shadow"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-6 text-lg">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
}