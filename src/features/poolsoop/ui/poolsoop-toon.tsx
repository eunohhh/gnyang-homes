"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import GnyangImage from "@/features/common/ui/gnyang-image";
import { RecordImage } from "@/types/allrecords.types";

interface PoolsoopToonProps {
  contents: RecordImage[] | undefined;
}

function PoolsoopToon({ contents }: PoolsoopToonProps) {
  return (
    <ScrollArea
      className="h-[84%] w-[95%] whitespace-nowrap rounded-none border border-[#00924f] bg-white sm:h-[80%]"
      viewportClassName="flex items-center"
    >
      <div className="flex h-full w-max items-center justify-center space-x-4 p-4">
        {contents?.map((image) => (
          <figure key={image.url} className="shrink-0">
            <div className="overflow-hidden">
              <GnyangImage
                image={image}
                type="poolsoop"
                isNeedObjectCover={false}
                isPriority={true}
                loadedImageUrls={new Set()}
                className="w-[768px] sm:aspect-[12/9] sm:min-h-[400px] sm:w-[900px]"
              />
            </div>
            <figcaption className="hidden">{image.desc}</figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default PoolsoopToon;
