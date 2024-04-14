"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalizedPathname = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const normalizedHref = href.endsWith("/") ? href : `${href}/`;
  const isActive = normalizedPathname === normalizedHref;

  return (
    <Link
      className={cn(
        "hover:bg-zinc-50 p-0.5 px-1.5 rounded-lg text-sm font-medium tracking-tight transition-all",
        isActive ? "text-orange-500" : "text-zinc-500 hover:text-zinc-800"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
