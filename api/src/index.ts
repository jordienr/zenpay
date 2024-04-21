import { createClient } from "@supabase/supabase-js";
import { Hono } from "hono";
import { env } from "hono/adapter";
import Stripe from "stripe";

const app = new Hono();

type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/stripe/:project_id", async (c) => {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = env<Env>(c, "workerd");
  const supa = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  console.log("> supabase client created...");

  const project = await supa
    .from("projects")
    .select("stripe_webhook_secret, stripe_secret_key")
    .eq("id", c.req.param("project_id"))
    .single();

  if (project.error) {
    console.error(project.error);
    return c.json({ error: project.error.message }, 500);
  }
  if (!project) {
    console.log("> project not found...");
    return c.json({ error: "Project not found" }, 404);
  }

  console.log("> project found...");

  const whSecret = project.data.stripe_webhook_secret;
  const secretKey = project.data.stripe_secret_key;
  const sig = c.req.header("stripe-signature");

  if (!sig) {
    return c.json({ error: "No signature" }, 400);
  }
  console.log("> stripe signature found");

  const stripe = new Stripe(secretKey, {
    apiVersion: "2024-04-10",
  });

  const textBody = await c.req.text();

  console.log("> text body");

  let event;

  try {
    console.log("> trying to construct event...");
    event = await stripe.webhooks.constructEventAsync(textBody, sig, whSecret);
  } catch (err) {
    console.error(err);
    c.json({ err }, 400);
    return;
  }
  console.log("> event", event);

  console.log(event);

  return c.json({ received: true }, 200);
});

export default app;
