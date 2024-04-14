import { requireAuth } from "@/app/auth/utils";
import { NavLink } from "@/components/nav-link";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Layout({ children, params }: any) {
  await requireAuth();
  const supa = createClient();
  const project_id = params.project_id;

  const project = await supa
    .from("projects")
    .select("*")
    .eq("id", project_id)
    .single();

  return (
    <>
      <div className="border-b bg-white">
        <header className="flex justify-between px-4 max-w-2xl mx-auto">
          <Link
            href={`/app/projects/${project_id}`}
            className="py-2 font-medium"
          >
            {project.data.name}
          </Link>
          <div className="flex gap-1 text-sm items-center [&_a]:p-2">
            <NavLink href={`/app/projects/${project_id}/`}>Overview</NavLink>
            <NavLink href={`/app/projects/${project_id}/customers`}>
              Customers
            </NavLink>
            <NavLink href={`/app/projects/${project_id}/products`}>
              Products
            </NavLink>
            <NavLink href={`/app/projects/${project_id}/subscriptions`}>
              Subscriptions
            </NavLink>
            <NavLink href={`/app/projects/${project_id}/settings`}>
              Settings
            </NavLink>
          </div>
        </header>
      </div>
      <div className="max-w-2xl mx-auto">{children}</div>
    </>
  );
}
