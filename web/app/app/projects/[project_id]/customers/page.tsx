import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
              <TableHead className="text-left">Id</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-right">Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer.id} className="text-zinc-700">
                <TableCell className="font-mono">{customer.id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell className="text-right">
                  {formatDate(customer.created)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
