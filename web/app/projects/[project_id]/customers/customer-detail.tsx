"use client";

import { JsonRenderer } from "@/components/json-renderer";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function CustomerDetail({
  open,
  customer,
}: {
  open: boolean;
  customer: any;
}) {
  return (
    <Sheet open={open}>
      <SheetContent>
        <JsonRenderer json={customer} />
      </SheetContent>
    </Sheet>
  );
}
