import { cn } from "@/lib/utils";

const SpinnerCircle = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "h-7 w-7 animate-spin rounded-full border-[3px] border-secondary border-t-primary",
      className,
    )}
  />
);

export default SpinnerCircle;
