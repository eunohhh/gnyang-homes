"use client";

import { cn } from "@/lib/utils";

interface GnyangUnderlineProps {
  className?: string;
}

function GnyangUnderline({ className }: GnyangUnderlineProps) {
  return (
    <div className={cn("relative h-2 w-8 overflow-hidden sm:w-12", className)}>
      <svg
        className="relative h-2 w-full"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="선택된 카테고리 표시"
      >
        <path
          d="M0 4C8.33 2 16.67 6 25 4C33.33 2 41.67 6 50 4C58.33 2 66.67 6 75 4C83.33 2 91.67 6 100 4"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-black"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default GnyangUnderline;
