"use client";

import { useEffect } from "react";
import { IMAGE_SIZES, PRELOAD_COUNT } from "@/constants/allrecords.consts";
import { preloadImages } from "@/lib/preload-image";
import { Category } from "@/types/allrecords.types";
import type { RecordImage } from "../model/record.type";
import GnyangImage from "./gnyang-image";

interface GnyangImagesProps {
  recordImages: RecordImage[] | null;
  type: Category;
  isNeedObjectCover: boolean;
  shouldPreload?: boolean;
  loadedImageUrls: Set<string>;
  requestedImageUrls: Set<string>;
}

function GnyangImages({
  recordImages,
  type,
  isNeedObjectCover,
  shouldPreload = false,
  loadedImageUrls,
  requestedImageUrls,
}: GnyangImagesProps) {
  useEffect(() => {
    if (!shouldPreload || !recordImages?.length) return;

    // 이미 로드했거나 프리로드를 요청한 이미지는 제외
    const srcs = recordImages
      .slice(0, PRELOAD_COUNT)
      .filter(
        (image) =>
          image?.url &&
          !loadedImageUrls.has(image.url) &&
          !requestedImageUrls.has(image.url)
      )
      .map((image) => image.url);

    if (srcs.length === 0) return;

    // 프리로드 요청 여부를 따로 기록해 중복 요청을 막는다.
    for (const src of srcs) {
      requestedImageUrls.add(src);
    }

    // 실제 NextImage sizes와 동일하게 맞춰서 프리로드 폭 계산
    preloadImages(srcs, { sizes: IMAGE_SIZES });
  }, [recordImages, shouldPreload, loadedImageUrls, requestedImageUrls]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      {recordImages?.map((image, index) =>
        image && typeof image === "object" ? (
          <div
            className="relative w-full flex-1 items-center justify-center"
            key={(image as RecordImage).id}
          >
            <GnyangImage
              image={image as RecordImage}
              type={type}
              isNeedObjectCover={isNeedObjectCover}
              isPriority={index === 0}
              loadedImageUrls={loadedImageUrls}
            />
          </div>
        ) : null
      )}
    </div>
  );
}

export default GnyangImages;
