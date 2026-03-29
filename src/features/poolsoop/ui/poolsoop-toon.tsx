"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMAGE_SIZES, PRELOAD_COUNT } from "@/constants/allrecords.consts";
import GnyangImage from "@/features/common/ui/gnyang-image";
import { useIsMobile } from "@/hooks/use-mobile";
import { preloadImages } from "@/lib/preload-image";
import { cn } from "@/lib/utils";
import { RecordImage } from "@/types/allrecords.types";

interface PoolsoopToonProps {
  contents: RecordImage[] | undefined;
  loadedImageUrls: Set<string>;
  requestedImageUrls: Set<string>;
}

function PoolsoopToon({
  contents,
  loadedImageUrls,
  requestedImageUrls,
}: PoolsoopToonProps) {
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [imageDivHeight, setImageDivHeight] = useState<number | string>(
    "auto  "
  );
  const [imageDivWidth, setImageDivWidth] = useState<number | string>("auto");

  useEffect(() => {
    if (!contents?.length) return;

    const srcs = contents
      .slice(0, PRELOAD_COUNT)
      .filter(
        (image) =>
          image?.url &&
          !loadedImageUrls.has(image.url) &&
          !requestedImageUrls.has(image.url)
      )
      .map((image) => image.url);

    if (srcs.length === 0) return;

    for (const src of srcs) {
      requestedImageUrls.add(src);
    }

    preloadImages(srcs, { sizes: IMAGE_SIZES });
  }, [contents, loadedImageUrls, requestedImageUrls]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const boundingClientRect = scrollAreaRef.current.getBoundingClientRect();
      const height = boundingClientRect.height;
      if (isMobile) {
        const calculatedWidth = boundingClientRect.width * 0.93;
        setImageDivWidth(calculatedWidth);
        setImageDivHeight("auto");
      } else {
        const calculatedHeight = height - 32;
        setImageDivHeight(calculatedHeight);
        setImageDivWidth("auto");
      }
    }
  }, [isMobile]);

  return (
    <ScrollArea
      className="h-[84%] w-[95%] whitespace-nowrap rounded-none border border-[#00924f] bg-white sm:h-[80%]"
      viewportClassName="flex justify-start"
      scrollbarOrientation={isMobile ? "vertical" : "horizontal"}
      ref={scrollAreaRef}
    >
      <div
        className={cn(
          "flex",
          isMobile
            ? "h-max w-full flex-col items-center justify-start space-y-4 py-3"
            : "w-max flex-row items-center justify-center space-x-4 p-4"
        )}
      >
        {contents?.map((image, index) => (
          <figure key={image.url} className="shrink-0">
            <div className="overflow-hidden">
              <GnyangImage
                image={image}
                type="poolsoop"
                isNeedObjectCover={false}
                isPriority={index === 0}
                loadedImageUrls={loadedImageUrls}
                className="aspect-[12/9]"
                style={{
                  height: imageDivHeight,
                  minHeight: imageDivHeight,
                  width: imageDivWidth,
                  minWidth: imageDivWidth,
                }}
              />
            </div>
            <figcaption className="hidden">{image.desc}</figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
}

export default PoolsoopToon;
