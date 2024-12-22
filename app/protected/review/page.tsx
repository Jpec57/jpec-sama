"use client";
import RelayEnvironment from "@/relay/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";

import ReviewPage from "@/components/review/ReviewPage";

const ReviewPageLayout = () => { 
    return (
                    <RelayEnvironmentProvider environment={RelayEnvironment}>

                        <ReviewPage />
          </RelayEnvironmentProvider>
    )
}
export default ReviewPageLayout