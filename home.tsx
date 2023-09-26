/** @jsx jsx */
import { jsx } from "hono/middleware.ts";

export default function Home({ message }: { message: string }) {
  const formField = {
    display: "block",
    width: "100%",
    margin: "10px 0",
  };

  return (
    <html>
      <body style={{ margin: "10px auto", maxWidth: "320px" }}>
        {message
          ? (
            <p
              style={{
                color: "green",
                border: "1px solid",
                padding: "10px",
              }}
            >
              {message}
            </p>
          )
          : ""}
        <h1>Create an order</h1>
        <form action="/order" method="POST">
          <input
            style={formField}
            name="email"
            type="email"
            placeholder="Your email address"
            required
          />
          <input
            style={formField}
            name="order"
            type="text"
            placeholder="What would you like to order?"
            required
          />
          <button type="submit">Create Order</button>
        </form>
      </body>
    </html>
  );
}
