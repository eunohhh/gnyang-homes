import BoardRouteModal from "@/features/board/ui/board-route-modal";
import BoardTemplate from "@/templates/board-template";

function InterceptedBoardPage() {
  return (
    <BoardRouteModal closeMode="back">
      <BoardTemplate />
    </BoardRouteModal>
  );
}

export default InterceptedBoardPage;
