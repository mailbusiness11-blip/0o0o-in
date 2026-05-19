async function getProduct(id: string) {
  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.products.find(
    (p: any) => p._id === id
  );
}

export default async function ProductPage({
  params,
}: any) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl"
          />

          <div>
            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              {product.description}
            </p>

            <p className="mt-8 text-4xl font-bold">
              ₹{product.price}
            </p>

            <button className="mt-8 bg-black text-white px-8 py-4 rounded-xl text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.product;
}

export default async function ProductPage({
  params,
}: any) {
  const product = await getProduct(
    params.id
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="min-h-screen p-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl mt-4">
            ₹{product.price}
          </p>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <button className="mt-8 bg-black text-white px-6 py-3 rounded-xl">
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}