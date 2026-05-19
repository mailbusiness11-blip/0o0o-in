"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce((sum: number, item: any) => {
    return sum + Number(item.price.replace("$", ""));
  }, 0);

  function handleCheckout() {
    alert("Payment Successful!");

    clearCart();
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "30px",
        }}
      >
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          <h2>Your cart is empty</h2>

          <a
            href="/products"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 20px",
              background: "black",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          {cart.map((item: any, index: number) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div
                style={{
                  flex: 1,
                }}
              >
                <h2>{item.title}</h2>

                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {item.price}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  padding: "10px 20px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "30px",
            }}
          >
            <h2>Total: ${total}</h2>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "14px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}