import React from "react";
import { getProject } from "../utils";
import { Check, CreditCard, ShoppingCart, Smile, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { syncCustomers, syncProducts } from "@/lib/stripe";

type Props = {
  params: {
    project_id: string;
  };
};

const Overview = async (props: Props) => {
  const project_id = props.params.project_id;
  const { data: project } = await getProject(props);

  if (!project) {
    return <div>Project not found</div>;
  }

  function formatDate(date: string) {
    const d = new Date(date);
    const today = new Date();

    // get diff in milliseconds
    const diff = today.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "today";
    }

    if (days === 1) {
      return "yesterday";
    }

    return `${days} days ago`;
  }

  async function toggleStripeWebhook() {
    "use server";
    const supa = createClient();

    await supa
      .from("projects")
      .update({
        webhook_endpoint_added: !project?.webhook_endpoint_added,
      })
      .eq("id", project_id);

    revalidatePath(`/projects/${project_id}`);
  }

  return (
    <section className="section mt-4">
      <h1 className="section-title">{project.name}</h1>
      <p className="section-desc">Created {formatDate(project.created_at)}</p>

      <h2 className="font-bold font-mono tracking-tighter text-sm mt-6 mb-2">
        Project setup
      </h2>
      <ul className="grid gap-2">
        <SetupListItem isChecked={project.stripe_secret_key}>
          Stripe secret key
          <Link
            className="group-hover:opacity-100 opacity-0 transition-all"
            href={`/app/projects/${project_id}/settings`}
          >
            <Button size="xs" variant={"ghost"}>
              Update
            </Button>
          </Link>
        </SetupListItem>
        <SetupListItem isChecked={project.stripe_webhook_secret}>
          Stripe webhook secret
          <Link
            className="group-hover:opacity-100 opacity-0 transition-all"
            href={`/app/projects/${project_id}/settings`}
          >
            <Button size="xs" variant={"ghost"}>
              Update
            </Button>
          </Link>
        </SetupListItem>
        <SetupListItem isChecked={project.webhook_endpoint_added}>
          Stripe webhook endpoint
          <form action={toggleStripeWebhook}>
            <Button
              className="group-hover:opacity-100 opacity-0 transition-all"
              size="xs"
              variant={"ghost"}
            >
              {project.webhook_endpoint_added ? "Not done" : "Done"}
            </Button>
          </form>
        </SetupListItem>
      </ul>

      <h2 className="font-bold font-mono tracking-tighter text-sm mt-6 mb-0.5">
        Resync with Stripe
      </h2>
      <p className="section-desc">
        Caution, if you already have data in Zenpay, this will overwrite it.
      </p>
      <div className="flex gap-2 mt-4">
        <form
          action={async () => {
            "use server";
            syncCustomers({ project_id });
          }}
        >
          <Button variant={"secondary"}>
            <Smile className="mr-2" />
            Sync customers
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            syncProducts({ project_id });
          }}
        >
          <Button variant={"secondary"}>
            <ShoppingCart className="mr-2" />
            Sync products
          </Button>
        </form>
        <Button variant={"secondary"}>
          <CreditCard className="mr-2" />
          Sync subscriptions
        </Button>
      </div>
    </section>
  );
};

function SetupListItem({
  children,
  isChecked,
}: {
  children: React.ReactNode;
  isChecked: boolean;
}) {
  return (
    <li className="flex gap-2 items-center group">
      {isChecked ? (
        <Check size="18" className="text-green-500" />
      ) : (
        <X size="18" className="text-red-500" />
      )}
      {children}
    </li>
  );
}

export default Overview;
