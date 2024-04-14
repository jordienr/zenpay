"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const supa = createClient();

  const user = await supa.auth.getUser();

  if (!user.data.user) {
    return redirect("/login");
  }
}
