import { createClient } from "@/utils/supabase/server";

type GetProject = {
  params: {
    project_id: string;
  };
};
export const getProject = async ({ params: { project_id } }: GetProject) => {
  const supa = createClient();

  const project = await supa
    .from("projects")
    .select(
      "name, stripe_secret_key, stripe_webhook_secret, created_at, webhook_endpoint_added"
    )
    .eq("id", project_id)
    .single();

  return project;
};
