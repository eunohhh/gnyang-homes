import { Metadata } from "next";
import BoardRouteModal from "@/features/board/ui/board-route-modal";
import BoardTemplate from "@/templates/board-template";

export const metadata: Metadata = {
  title: "Board",
  description: "연락 게시판",
};

function BoardPage() {
  return (
    <BoardRouteModal closeMode="replace" fallbackHref="/">
      <BoardTemplate />
    </BoardRouteModal>
  );
}

export default BoardPage;
