import Link from "next/link";
import { cn } from "@/lib/utils";

interface HomeTitleProps {
  className?: string;
}

function HomeTitle({ className }: HomeTitleProps) {
  return (
    <div className="flex flex-col pb-4">
      <Link href="/" className="relative w-fit">
        <h1
          className={cn(
            "font-medium font-uhbeehyeki text-[calc(44/640*100svw)] sm:text-[calc(50/1920*100svw)]",
            className
          )}
        >
          gnyang.homes
        </h1>
      </Link>
    </div>
  );
}

export default HomeTitle;
