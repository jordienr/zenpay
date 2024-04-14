import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <div>
      <h2 className="page-title">Customers</h2>

      <section className="section">
        <Table>
          <TableHeader>
            <TableRow>
              <th className="text-left">Id</th>
              <th className="text-left">Email</th>
              <th className="text-right">Created at</th>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer.id} className="text-zinc-700">
                <td className="font-mono">{customer.id}</td>
                <td>{customer.email}</td>
                <td className="text-right">{formatDate(customer.created)}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
