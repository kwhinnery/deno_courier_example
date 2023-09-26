/** @jsx jsx */
import "std/dotenv/load.ts";
import { Hono } from "hono/mod.ts";
import { jsx } from "hono/middleware.ts";
import { deleteCookie, getCookie, setCookie } from "hono/helper.ts";
import Home from "./home.tsx";
import Notification, { isNotification } from "./notification.ts";

// Load Courier API token from system environment
const COURIER_API_TOKEN = Deno.env.get("COURIER_API_TOKEN");

// Create a Deno KV database reference
const kv = await Deno.openKv();

// Create a queue listener that will process enqueued messages
kv.listenQueue(async (message) => {
  if (!isNotification(message)) return;
  const { email, body } = message;

  // Create an email notification with Courier
  const response = await fetch("https://api.courier.com/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${COURIER_API_TOKEN}`,
    },
    body: JSON.stringify({
      message: {
        to: { email },
        content: {
          title: "New order placed by Deno!",
          body,
        },
      },
    }),
  });

  if (response.status >= 400) {
    console.error("Error sending notification:", message);
    console.error(await response.text());
  } else {
    console.log("Notification sent to", email);
  }
});

// Create a Hono server app to handle HTTP requests
const app = new Hono();

// Handle a POST request to create an order, and schedule a notification to
// go out at some point in the future.
app.post("/order", async (c) => {
  const { email, order } = await c.req.parseBody();
  const n: Notification = {
    email: email as string,
    body: `Order received for: "${order as string}"`,
  };

  // Select a time in the future - for now, just wait 5 seconds
  const delay = 1000 * 5;

  // Enqueue the message for processing!
  kv.enqueue(n, { delay });

  // Redirect back home with a success message!
  setCookie(c, "flash_message", "Order created!");
  return c.redirect("/");
});

// Render a home page with a form to create an order
app.get("/", (c) => {
  // Get any feedback message from a previous form submission
  const message = getCookie(c, "flash_message") || "";
  deleteCookie(c, "flash_message");

  // Render an HTML page with a simple form to submit an order
  return c.html(<Home message={message} />);
});

// Listen for incoming requests
Deno.serve(app.fetch);
