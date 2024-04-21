import { MainTable } from "@/components/main-table";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: {
    project_id: string;
  };
};
export default async function Page(props: Props) {
  const supa = createClient();

  const { data: subscriptions, error } = await supa
    .from("subscriptions")
    .select("id, customer, created, status")
    .eq("project_id", props.params.project_id);

  function getUrl(subscription_id: string) {
    return `https://dashboard.stripe.com/subscriptions/${subscription_id}`;
  }

  return (
    <div>
      <h2 className="page-title">Subscriptions</h2>
      <section className="section">
        <MainTable
          headers={[
            { id: "id", label: "Id", className: "font-mono" },
            { id: "customer", label: "Customer" },
            { id: "created", label: "Created at", className: "text-right" },
            { id: "status", label: "Status", className: "text-right" },
          ]}
          data={subscriptions}
          emptyTitle="No subscriptions yet"
          emptyDescription="Create subscriptions through the Stripe dashboard or API and you'll be able to find them here."
        />
      </section>
    </div>
  );
}
