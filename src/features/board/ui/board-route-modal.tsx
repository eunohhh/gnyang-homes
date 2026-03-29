"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BoardRouteModalProps {
  children: React.ReactNode;
  closeMode?: "back" | "replace";
  fallbackHref?: string;
}

function BoardRouteModal({
  children,
  closeMode = "back",
  fallbackHref = "/",
}: BoardRouteModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (closeMode === "replace") {
      router.replace(fallbackHref);
      return;
    }

    router.back();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-w-[95%] flex-col justify-start rounded-lg border bg-[#DBFD00] p-4 sm:w-fit sm:max-w-fit"
        overlayClassName="bg-white/90"
      >
        <DialogClose className="absolute top-4 right-4 cursor-pointer">
          <Image src="/loading.webp" alt="Close" width={36} height={36} />
        </DialogClose>
        <DialogHeader className="hidden">
          <DialogTitle>문의하기</DialogTitle>
          <DialogDescription>문의 게시판 모달</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default BoardRouteModal;
