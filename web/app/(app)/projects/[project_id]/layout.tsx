import { requireAuth } from "@/app/(auth)/auth/utils";
import { NavLink } from "@/components/nav-link";
import { ProjectPicker } from "@/components/project-picker";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Layout({ children, params }: any) {
  await requireAuth();
  const supa = createClient();
  const project_id = params.project_id;

  const { data: project } = await supa
    .from("projects")
    .select("name, id")
    .eq("id", project_id)
    .single();

  if (!project) {
    return <div>Project not found</div>;
  }

  const { data: projects } = await supa.from("projects").select("*");

  if (!projects) {
    return <div>No projects found</div>;
  }

  return (
    <>
      <div className="border-b bg-white">
        <header className="flex justify-between px-4 max-w-2xl mx-auto items-center">
          <ProjectPicker currentProject={project} projects={projects} />
          <div className="flex gap-1 text-sm items-center [&_a]:p-2">
            <NavLink href={`/projects/${project_id}/`}>Overview</NavLink>
            <NavLink href={`/projects/${project_id}/customers`}>
              Customers
            </NavLink>
            <NavLink href={`/projects/${project_id}/products`}>
              Products
            </NavLink>
            <NavLink href={`/projects/${project_id}/subscriptions`}>
              Subscriptions
            </NavLink>
            <NavLink href={`/projects/${project_id}/settings`}>
              Settings
            </NavLink>
          </div>
        </header>
      </div>
      <div className="max-w-2xl mx-auto px-1.5">{children}</div>
    </>
  );
}
