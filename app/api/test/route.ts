import supabaseAdmin from "@/supabase/supabaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function GET(_: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabaseAdmin.from("flashcard").select("*");
  console.error(error);
  if (error) return res.status(500).json({ error: error.message });
  return NextResponse.json(data);
}

export { GET };
