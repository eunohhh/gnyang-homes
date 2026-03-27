import { AboutText } from "@/features/about";
import HomeTitle from "@/features/home/ui/home-title";

function AboutTemplate() {
  return (
    <div className="flex flex-col overflow-hidden sm:min-h-[calc(100svh-80px)]">
      <HomeTitle />
      <AboutText />
    </div>
  );
}

export default AboutTemplate;
