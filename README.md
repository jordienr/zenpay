# Zenpay

Zenpay allows you to add subscription payments to your website or app in minutes.

Zenpay syncs data with your Stripe account and allows you to fetch customer data, subscriptions, products and more, right from your app.

## Why Zenpay?

All apps with subscriptions need to create a backend to listen to Stripe webhooks, fetch data, and manage subscriptions. Zenpay does all of this for you, so you can focus on building your app.

## Getting started

1. Create your project

   - You can create a project for development and testing purposes. Once you're ready to go live, you can create a new project for production and repeat the steps below.

2. Add your stripe key.

   - NOTE: Use a read-only key. Zenpay doesn't need write access to your stripe account.

3. (In Stripe's Dashboard) Add your webhook endpoint to stripe

4. (Back in Zenpay) Add the webhook secret to your project

5. Sync your data (optional)

- In your project overview, click the "Sync" buttons to fetch your products, customers, and subscriptions from Stripe.

6. Install the `zenpay` SDK

   ```bash
    npm install zenpay
   ```

7. From your app, check user subscription status

   ```javascript
   const zenpay = createClient("your_project_id");

   const products = zenpay.getProducts();

   const subscription = zenpay.getSubscription({
     userId: "user_id",
     productId: "product_id",
   });
   ```

That's it! You're ready to start monetizing your content.
