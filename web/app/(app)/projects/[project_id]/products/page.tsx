import { MainTable } from "@/components/main-table";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: {
    project_id: string;
  };
};

export default async function Page(props: Props) {
  const supa = createClient();
  const { data: products, error } = await supa
    .from("products")
    .select("id, name, default_price, url, livemode, created")
    .eq("project_id", props.params.project_id)
    .eq("active", true);

  function getUrl(product_id: string) {
    return `https://dashboard.stripe.com/products/${product_id}`;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h2 className="page-title">Products</h2>

      <section className="section">
        <MainTable
          data={products}
          headers={[
            { id: "id", label: "Id", className: "font-mono" },
            { id: "name", label: "Name" },
            { id: "created", label: "Created at", className: "text-right" },
          ]}
          emptyTitle="No products yet"
          emptyDescription="Create products through the Stripe dashboard or API and you'll be able to find them here."
        />
      </section>
    </div>
  );
}
