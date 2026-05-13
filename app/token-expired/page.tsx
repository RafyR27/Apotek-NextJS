"use client";

import FeedbackLayout from "@/components/layouts/FeedbackLayout/FeedbackLayout";
import ExpiredSection from "@/components/views/Auth/ExpiredSection/ExpiredSection";

export default function TokenExpired() {
    return (
      <FeedbackLayout>
        <ExpiredSection></ExpiredSection>
      </FeedbackLayout>
    );
}
