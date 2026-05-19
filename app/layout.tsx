import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav
            style={{
              background: "black",
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href="/products"
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              0o0o Store
            </a>

            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <a
                href="/products"
                style={{
                  color: "white",
                }}
              >
                Products
              </a>

              <a
                href="/cart"
                style={{
                  color: "white",
                }}
              >
                Cart
              </a>
            </div>
          </nav>

          {children}
        </Providers>
      </body>
    </html>
  );
}