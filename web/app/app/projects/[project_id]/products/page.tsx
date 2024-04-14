import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatStripeDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { BsStripe } from "react-icons/bs";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Id</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="text-zinc-700">
                <TableCell className="font-mono">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatStripeDate(product.created)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <a href={getUrl(product.id)} target="_blank">
                      <BsStripe />
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
