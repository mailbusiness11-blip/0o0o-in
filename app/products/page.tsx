async function getProduct(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/products`,
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
    return <div>Product not found</div>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          <p className="text-3xl font-bold mt-6">
            ₹{product.price}
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}