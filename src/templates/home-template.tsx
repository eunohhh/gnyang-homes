"use client";

import { HomeFloating, HomeGrid } from "@/features/home";
import HomeTitle from "@/features/home/ui/home-title";

function HomeTemplate() {
  return (
    <section className="flex flex-col">
      <HomeTitle />
      <HomeGrid />
      <HomeFloating />
    </section>
  );
}

export default HomeTemplate;
