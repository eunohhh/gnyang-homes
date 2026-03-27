"use client";

import { Options } from "nuqs";
import PoolsoopDrawer from "./poolsoop-drawer";

interface PoolsoopHeaderProps {
  descriptions: string[] | undefined;
  setNumber: (
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
}

function PoolsoopHeader({ descriptions, setNumber }: PoolsoopHeaderProps) {
  return (
    <div className="flex h-[12%] items-center justify-center">
      <PoolsoopDrawer descriptions={descriptions} setNumber={setNumber} />
    </div>
  );
}

export default PoolsoopHeader;
