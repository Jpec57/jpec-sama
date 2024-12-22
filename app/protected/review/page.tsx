"use client";
import { RelayEnvironmentProvider } from "react-relay";

import ReviewPage from "@/components/review/ReviewPage";
import { Suspense } from "react";
import { relayEnvironment } from "@/relay/RelayEnvironment";

const ReviewPageLayout = () => { 
    return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
              <Suspense fallback={'Loading...'}>

            <ReviewPage />
</Suspense>
        </RelayEnvironmentProvider>
    )
}
export default ReviewPageLayout