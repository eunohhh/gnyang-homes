"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGE_SIZES } from "@/constants/allrecords.consts";
import LoadingStar from "@/features/home/ui/loading-star";
import { cn } from "@/lib/utils";
import { Category } from "@/types/allrecords.types";
import type { RecordImage } from "../model/record.type";

interface GnyangImageProps {
  image: RecordImage;
  type: Category;
  isNeedObjectCover: boolean;
  isPriority?: boolean;
  loadedImageUrls: Set<string>;
  className?: string;
  style?: React.CSSProperties;
}

function GnyangImage({
  image,
  type,
  isNeedObjectCover,
  isPriority = false,
  loadedImageUrls,
  className,
  style,
}: GnyangImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
      loadedImageUrls.add(image.url);
      return;
    }
    setIsLoaded(false);
  }, [image.url, loadedImageUrls]);

  useEffect(() => {
    if (isLoaded) {
      setShowLoader(false);
      return;
    }

    const timer = setTimeout(() => setShowLoader(true), 100);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleLoad = () => {
    setIsLoaded(true);
    loadedImageUrls.add(image.url);
  };

  const handleError = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[480px]",
        {
          "h-[480px] min-h-[480px] sm:h-[520px] sm:max-h-[520px]":
            type === "grim",
          "h-[300px] min-h-[300px] sm:h-[682px] sm:max-h-[682px] sm:min-h-[400px]":
            type === "ilsang",
          "h-[228px] min-h-[228px] sm:h-[500px] sm:min-h-[300px]":
            isNeedObjectCover,
        },
        className
      )}
      style={style}
    >
      <Image
        ref={imgRef}
        src={image.url}
        alt={image.desc}
        className={cn(
          "h-full w-full object-contain transition-opacity duration-200",
          isLoaded ? "opacity-100" : "opacity-0",
          isNeedObjectCover && "object-cover"
        )}
        onLoad={handleLoad}
        fill
        sizes={IMAGE_SIZES}
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
        placeholder="empty"
        quality={75}
        onError={handleError}
      />

      {showLoader && (
        <LoadingStar className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-6 w-6" />
      )}
    </div>
  );
}

export default GnyangImage;
