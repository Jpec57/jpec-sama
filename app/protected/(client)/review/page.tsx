"use client";
import ReviewPage from "@/components/review/ReviewPage";
import { Suspense } from "react";

const ReviewPageLayout = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <ReviewPage />
    </Suspense>
  );
};
export default ReviewPageLayout;
