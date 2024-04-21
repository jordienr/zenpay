import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import React from "react";
import { redirect } from "next/navigation";
import { requireAuth } from "@/app/(auth)/auth/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { getProject } from "../../utils";

type Props = {
  params: {
    project_id: string;
  };
};

async function page({ params }: Props) {
  await requireAuth();
  const { data: project } = await getProject({ params });

  const _project_webhook_url = `https://api.zenpay.dev/api/stripe/${params.project_id}`;
  const project_webhook_url = `https://api-90.localcan.dev/api/stripe/${params.project_id}`;

  if (!project) {
    return <div>Project not found</div>;
  }

  async function updateStripeKeys(formData: FormData) {
    "use server";

    const supa = createClient();

    const stripe_secret_key = formData.get("stripe_secret_key") as string;
    const stripe_webhook_secret = formData.get(
      "stripe_webhook_secret"
    ) as string;

    const res = await supa
      .from("projects")
      .update({
        stripe_secret_key,
        stripe_webhook_secret,
      })
      .eq("id", params.project_id);

    if (res.error) {
      console.error(res.error);
    }

    revalidatePath(`/projects/${params.project_id}`);
  }

  async function deleteProject(formData: FormData) {
    "use server";

    const supa = createClient();

    const confirm = formData.get("confirm") as string;

    if (confirm !== `DELETE ${project?.name}`) {
      return alert("Confirmation text is incorrect");
    }

    const res = await supa
      .from("projects")
      .delete()
      .eq("id", params.project_id);

    if (res.error) {
      console.error(res.error);
    }

    redirect("/projects");
  }

  return (
    <div className="grid">
      <h1 className="page-title">Settings</h1>
      <section className="section">
        <h2 className="font-medium">Stripe configuration</h2>
        <p className="text-zinc-600">
          Configure your Stripe keys to sync your data with Zenpay.
        </p>

        <form
          action={updateStripeKeys}
          className="mt-6 grid gap-4 [&_small]:text-zinc-500"
        >
          <div>
            <Label htmlFor="stripe_secret_key">Stripe secret key</Label>
            <Input
              type={project.stripe_secret_key ? "password" : "text"}
              id="stripe_secret_key"
              name="stripe_secret_key"
              defaultValue={project.stripe_secret_key || ""}
              required
            />
            <small>Used to sync your Stripe data with Zenpay.</small>
          </div>
          <div>
            <Label htmlFor="stripe_webhook_secret">Stripe webhook secret</Label>
            <Input
              type={project.stripe_webhook_secret ? "password" : "text"}
              id="stripe_webhook_secret"
              name="stripe_webhook_secret"
              defaultValue={project.stripe_webhook_secret || ""}
              required
            />
            <small>
              Used to listen to Stripe events and update Zenpay data.
            </small>
          </div>
          <div className="actions">
            <Button>Save</Button>
          </div>
        </form>
      </section>

      <section className="section mt-6">
        <h2 className="section-title">Webhook URL</h2>
        <p className="section-desc">
          Go to your Stripe dashboard and add this URL as a webhook.
        </p>

        <div className="mt-6">
          <Label htmlFor="webhook_url">URL</Label>
          <Input
            type="text"
            id="webhook_url"
            name="webhook_url"
            className="select-all font-mono tracking-tighter"
            value={project_webhook_url}
            readOnly
          />
        </div>
      </section>

      <hr className="my-12" />

      <section className="section">
        <h2 className="section-title">Danger zone</h2>
        <p className="section-desc">Careful here.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="mt-4">
              <Trash size={16} className="mr-2" />
              Delete project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action={deleteProject} className="grid gap-4">
              <h3>
                Are you sure you want to delete <strong>{project.name}</strong>?
              </h3>
              <p className="section-desc">
                This action cannot be undone. This will delete all your data.
              </p>

              <div>
                <Label htmlFor="confirm">
                  Type "DELETE {project.name}" to confirm
                </Label>
                <Input
                  type="text"
                  id="confirm"
                  name="confirm"
                  required
                  placeholder=""
                />
              </div>

              <div className="actions">
                <Button variant="destructive">Delete project</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

export default page;
