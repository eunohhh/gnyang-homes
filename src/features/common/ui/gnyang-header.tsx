"use client";

import Link from "next/link";
import type { Record } from "@/types/allrecords.types";
import GnyangUnderline from "./gnyang-underline";

interface GnyangHeaderProps {
  record: Record;
}

function GnyangHeader({ record }: GnyangHeaderProps) {
  const poolsoopNumber = record?.slug.replace("poolsoop-", "");

  return (
    <div className="flex h-full gap-4">
      <div className="flex h-full flex-col gap-4">
        {record.title.length > 0 && (
          <h1 className="font-bold text-md sm:text-2xl">{record.title}</h1>
        )}
        {record.description.length > 0 && (
          <p className="hidden text-gray-500 text-xs sm:text-sm">
            {record.description}
          </p>
        )}
      </div>
      {record?.category === "poolsoop" && (
        <Link
          href={`/poolsoop?content=${poolsoopNumber}`}
          className="flex h-fit w-40 cursor-pointer flex-col items-center justify-center gap-0"
        >
          풀숲이 이야기 보러가기
          <div className="flex h-fit flex-row gap-0">
            <GnyangUnderline />
            <GnyangUnderline />
            <GnyangUnderline />
          </div>
        </Link>
      )}
    </div>
  );
}

export default GnyangHeader;
