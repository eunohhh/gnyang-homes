"use client";

import { useCallback } from "react";
import GnyangUnderline from "@/features/common/ui/gnyang-underline";
import { cn } from "@/lib/utils";
import { useHomeStore } from "../model/home.store";

interface HomeCheckboxProps {
  label: string;
  id: "poolsoop" | "ilsang" | "grim";
}

const ALL_CATEGORIES: HomeCheckboxProps["id"][] = [
  "poolsoop",
  "ilsang",
  "grim",
];

function HomeCheckbox({ label, id }: HomeCheckboxProps) {
  const { category, setCategory } = useHomeStore();
  const checked = category.includes(id);
  const allSelected = category.length === 3;

  const handleClick = useCallback(() => {
    if (allSelected) {
      setCategory([id]);
      return;
    }
    if (checked) {
      if (category.length === 1) {
        setCategory(ALL_CATEGORIES);
        return;
      }
      setCategory(category.filter((c) => c !== id));
      return;
    }
    setCategory([...category, id]);
  }, [allSelected, checked, category, id, setCategory]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative flex min-w-12 cursor-pointer flex-col items-center justify-center font-medium text-sm sm:text-xl",
        checked && "text-black"
      )}
      aria-pressed={checked}
      aria-label={`${label} 카테고리 ${checked ? "선택됨" : "선택 안됨"}`}
    >
      <span className="relative z-10">{label}</span>
      {checked ? (
        <GnyangUnderline />
      ) : (
        <div className="relative h-2 w-8 overflow-hidden sm:w-12" />
      )}
    </button>
  );
}

export default HomeCheckbox;
