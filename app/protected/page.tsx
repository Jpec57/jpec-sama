import FlashcardGraph from "@/components/home/FlashcardGraph";
import { Button } from "@/components/ui/button";
import { getFlashcardReviewData } from "@/lib/mockData";
import { createClientFromCookies } from "@/supabase/clients/serverClient";
import getFlashcardsPerInterval from "@/supabase/queries/getFlashcardsPerInterval";
import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClientFromCookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const data = await getFlashcardsPerInterval(user.id, dayjs().startOf("day").toISOString(), dayjs().endOf("day").toISOString(), 1);
  return (
    <div className="flex-1 w-full flex flex-col gap-12">


      <FlashcardGraph data={data} />
            <div className="flex justify-center">
        <Button
          asChild
          className="bg-[#8e354a] hover:bg-[#b4555a] text-[#f7f3e9]"
        >
          <Link href="/protected/review">復習を始める</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

    </div>
  );
}
