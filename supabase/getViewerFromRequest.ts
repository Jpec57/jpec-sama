import { User } from "@supabase/supabase-js";
import { createClientFromCookies } from "./clients/serverClient";
import supabaseAdmin from "./supabaseAdmin";

export default async function getViewerFromCookies(): Promise<User | null> {
  const supabase = await createClientFromCookies();
  await supabase.auth.getSession();
  const { data } = await supabase.auth.getUser();
  if (!data?.user?.id) {
    return null;
  }

  const { data: user, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", data?.user?.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return user;
}
