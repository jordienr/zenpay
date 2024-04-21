import { createClient } from "@/utils/supabase/server";
import { MainTable } from "@/components/main-table";

type Props = {
  params: {
    project_id: string;
  };
};
export default async function Page(props: Props) {
  const supa = createClient();

  const { data: customers, error } = await supa
    .from("customers")
    .select("name, email, created, id")
    .eq("project_id", props.params.project_id);

  // date = seconds since epoch
  function formatDate(date: string) {
    const d = new Date(+date * 1000);

    // Date format: DD Month, Year
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const tableCustomers = customers?.map((customer) => ({
    ...customer,
    created: formatDate(customer.created),
  }));

  return (
    <div>
      <h2 className="page-title">Customers</h2>

      <section className="section">
        <MainTable
          headers={[
            { id: "id", label: "Id", className: "font-mono" },
            { id: "email", label: "Email" },
            { id: "created", label: "Created at", className: "text-right" },
          ]}
          data={tableCustomers || []}
          emptyTitle="No customers yet"
          emptyDescription="Create customers in through the Stripe dashboard or API and you'll find them here."
        />
      </section>
    </div>
  );
}
