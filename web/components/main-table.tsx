"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Sheet, SheetContent } from "./ui/sheet";
import { JsonRenderer } from "./json-renderer";
import { useState } from "react";
import EmptyState from "./empty-state";
import { FileSearch } from "lucide-react";

type Props = {
  detailSheet?: boolean;
  headers: {
    id: string;
    label: string;
    className?: string;
  }[];
  data: any[] | null;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: any;
};
export function MainTable({
  headers,
  data,
  emptyTitle,
  emptyDescription,
  emptyIcon,
}: Props) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const isEmpty = data?.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        title={emptyTitle || "No data"}
        description={emptyDescription || "There is no data to display."}
        icon={emptyIcon || <FileSearch />}
      />
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.id} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              className={cn("", row.className)}
              onClick={() => {
                setSelectedRow(row);
                setDetailOpen(true);
              }}
            >
              {headers.map((header) => (
                <TableCell key={header.id} className={header.className}>
                  {row[header.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent>
          <JsonRenderer json={selectedRow} />
        </SheetContent>
      </Sheet>
    </>
  );
}
