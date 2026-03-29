"use client";

import Image from "next/image";
import Link from "next/link";
import { Options } from "nuqs";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { yUniverse } from "@/fonts/font";

interface PoolsoopDrawerProps {
  descriptions: string[] | undefined;
  setNumber: (
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
}

function PoolsoopDrawer({ descriptions, setNumber }: PoolsoopDrawerProps) {
  const [open, setOpen] = useState(false);

  const handleSetNumber = (number: number) => {
    setOpen(false);
    setNumber(number);
  };

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="z-0 cursor-pointer">
        <p
          className={`${yUniverse.variable} font-yuniverse text-[#00924f] text-[30px] sm:text-[40px]`}
        >
          웑
        </p>
      </DrawerTrigger>
      <DrawerContent
        topClassName="rounded-none border-none hidden group-data-[vaul-drawer-direction=bottom]/drawer-content:hidden"
        className="z-50 rounded-none border-none bg-transparent p-4 data-[vaul-drawer-direction=bottom]:rounded-t-none data-[vaul-drawer-direction=bottom]:border-t-0"
        overlayClassName="bg-transparent"
      >
        <div className="flex h-full flex-col border border-[#00924f] bg-white/90 text-[#00924f]">
          <DrawerHeader>
            <div className="flex items-center justify-between text-[#00924f]">
              <DrawerTitle className="text-[#00924f]">목차</DrawerTitle>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex cursor-pointer items-center pb-0.5"
                >
                  <div className="relative aspect-[360/210] w-6">
                    <Image
                      src="/house.webp"
                      alt="home"
                      fill
                      sizes="(max-width: 640px) 50vw, 90vw"
                      priority
                    />
                  </div>
                </Link>
                <DrawerClose className="flex cursor-pointer items-center">
                  <span className="text-center leading-none">X</span>
                </DrawerClose>
              </div>
            </div>
            <DrawerDescription className="hidden">
              poolsoop-drawer
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden p-4">
            <ScrollArea
              className="h-full"
              scrollBarClassName="bg-transparent"
              thumbClassName="bg-[#00924f] rounded-none"
            >
              <div className="flex flex-col gap-2">
                {descriptions?.map((description, index) => (
                  <button
                    type="button"
                    key={description}
                    className="w-full cursor-pointer text-left"
                    onClick={() => handleSetNumber(index + 1)}
                  >
                    {description}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PoolsoopDrawer;
