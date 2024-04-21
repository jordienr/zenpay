import { requireAuth } from "@/app/(auth)/auth/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  await requireAuth();

  const supa = createClient();

  const { data: projects } = await supa.from("projects").select("*");

  async function createProject(data: FormData) {
    "use server";
    const supabase = createClient();

    const name = data.get("name") as string;

    const res = await supabase
      .from("projects")
      .insert({
        name,
      })
      .select();

    console.log(res);

    if (res.error) {
      console.error(res.error);
    }

    if (res.data) {
      redirect(`/projects/${res.data[0].id}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create project</Button>
          </DialogTrigger>
          <DialogContent>
            <div>
              <h2 className="section-title">Create a project</h2>
              <p className="section-desc">
                Projects are a way to group your customers, products and
                subscriptions.
              </p>
            </div>
            <form action={createProject} className="grid gap-4">
              <div className="">
                <Label htmlFor="name">Project name</Label>
                <Input
                  type="text"
                  placeholder="Project name"
                  id="name"
                  name="name"
                />
              </div>
              <Button>Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {projects?.map((project) => (
          <Link
            className="p-4 hover:bg-zinc-50 section font-medium"
            href={`/projects/${project.id}`}
            key={project.id}
          >
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
