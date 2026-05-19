async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function ProductPage({
  params,
}: any) {
  const data = await getProducts();

  const product = data.products.find(
    (item: any) => item.id == params.id
  );

  if (!product) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            borderRadius: "12px",
          }}
        />

        <h1
          style={{
            marginTop: "20px",
            fontSize: "40px",
          }}
        >
          {product.title}
        </h1>

        <p
          style={{
            color: "green",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {product.price}
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "14px 20px",
            width: "100%",
            border: "none",
            borderRadius: "8px",
            background: "black",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}