import { ReactNode } from "react";
import { MainWrapper } from "@/features/home";

interface PublicLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

function PublicLayout({ children, modal }: PublicLayoutProps) {
  return (
    <>
      <MainWrapper>{children}</MainWrapper>
      {modal}
    </>
  );
}

export default PublicLayout;
