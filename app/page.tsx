<button
  onClick={() => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added to cart");
  }}
  className="mt-4 bg-black text-white px-4 py-2 rounded-xl"
>
  Add To Cart
</button>