"use client"

import { PropType } from "@/types/props";

const FeedbackLayout = (props: PropType) => {
  const { children } = props;

  return (
    <div className="w-full min-h-screen">
      <section>{children}</section>
    </div>
  );
};

export default FeedbackLayout;