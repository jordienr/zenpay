"use server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

export async function syncCustomers({ project_id }: { project_id: string }) {
  "use server";

  const supa = createClient();
  const { data: project, error } = await supa
    .from("projects")
    .select("stripe_secret_key")
    .eq("id", project_id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  if (!project) {
    return;
  }

  const stripe = new Stripe(project.stripe_secret_key, {
    apiVersion: "2024-04-10",
  });

  if (!stripe) {
    return;
  }

  const { data: customers } = await stripe.customers.list();

  console.log(customers);

  if (!customers) {
    return;
  }

  const customersWithProjectId = customers.map((customer) => ({
    ...customer,
    project_id,
  }));

  const res = await supa.from("customers").upsert(customersWithProjectId);

  if (res.error) {
    console.error(res.error);
  }
}

export async function syncProducts({ project_id }: { project_id: string }) {
  "use server";

  const supa = createClient();
  const { data: project, error } = await supa
    .from("projects")
    .select("stripe_secret_key")
    .eq("id", project_id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  if (!project) {
    return;
  }

  const stripe = new Stripe(project.stripe_secret_key, {
    apiVersion: "2024-04-10",
  });

  if (!stripe) {
    return;
  }

  const { data: products } = await stripe.products.list();

  console.log(products);

  if (!products) {
    return;
  }

  const productsWithProjectId = products.map((product) => ({
    ...product,
    project_id,
  }));

  const res = await supa.from("products").upsert(productsWithProjectId);

  if (res.error) {
    console.error(res.error);
  }
}

export async function syncSubscriptions({
  project_id,
}: {
  project_id: string;
}) {
  "use server";

  const supa = createClient();
  const { data: project, error } = await supa
    .from("projects")
    .select("stripe_secret_key")
    .eq("id", project_id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  if (!project) {
    return;
  }

  const stripe = new Stripe(project.stripe_secret_key, {
    apiVersion: "2024-04-10",
  });

  if (!stripe) {
    return;
  }

  const { data: subscriptions } = await stripe.subscriptions.list();

  console.log(subscriptions);

  if (!subscriptions) {
    return;
  }

  const subscriptionsWithProjectId = subscriptions.map((subscription) => ({
    ...subscription,
    project_id,
  }));

  const res = await supa
    .from("subscriptions")
    .upsert(subscriptionsWithProjectId, {
      defaultToNull: true,
    });

  if (res.error) {
    console.error(res.error);
  }
}
