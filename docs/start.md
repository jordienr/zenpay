# Getting Started

1. Create your project

2. Add your stripe key and webhook secret

3. (In Stripe's Dashboard) Add your webhook endpoint to stripe

4. Wait for sync

5. Install the `zenpay` SDK

   ```bash
    npm install zenpay
   ```

6. From your app, check user subscription status

   ```javascript
   const zenpay = createClient("your_project_id");

   const products = zenpay.getProducts();

   const subscription = zenpay.getSubscription({
     userId: "user_id",
     productId: "product_id",
   });
   ```

## Managing products

You can manage your products from the Stripe dashboard. If you added the webhook secret and endpoint, the products will be synced to your zenpay project automatically.
