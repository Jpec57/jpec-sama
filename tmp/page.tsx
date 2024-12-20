import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlashcardGraph from "@/components/FlashcardGraph";
import { getFlashcardReviewData } from "@/lib/mockData";

export default function Home() {
  const reviewData = getFlashcardReviewData();

  return (
    <div className="space-y-6">
      <Card className="bg-[#f7f3e9] border-[#8e354a] border-2">
        <CardHeader>
          <CardTitle className="text-[#8e354a]">和風フラッシュカードへようこそ</CardTitle>
          <CardDescription>カードを復習して、進捗を追跡しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <FlashcardGraph data={reviewData} />
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button
          asChild
          className="bg-[#8e354a] hover:bg-[#b4555a] text-[#f7f3e9]"
        >
          <Link href="/review">復習を始める</Link>
        </Button>
      </div>
    </div>
  );
}
