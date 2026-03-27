// scripts/warmup-images.ts

import { createClient } from "@supabase/supabase-js";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface RecordImage {
  id: number;
  url: string;
  desc: string;
}

// allrecords 테이블에서 모든 이미지 URL 가져오기
async function getImageUrls(): Promise<string[]> {
  const { data, error } = await supabase.from("allrecords").select("images");

  if (error) {
    throw new Error(`Failed to fetch records: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  // images 컬럼에서 url 추출
  const urls: string[] = [];
  for (const record of data) {
    if (record.images && Array.isArray(record.images)) {
      for (const image of record.images as RecordImage[]) {
        if (image.url) {
          urls.push(image.url);
        }
      }
    }
  }

  return urls;
}

// Next.js 기본 deviceSizes (fill prop 사용 시 전체 적용)
const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const QUALITY = 75;

async function warmupImage(
  src: string,
  width: number,
  retries = 2
): Promise<void> {
  const url = `${BASE_URL}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✓ Warmed: ${src} @ ${width}w`);
        return;
      }
      console.error(`✗ Failed: ${src} @ ${width}w - ${response.status}`);
      return;
    } catch (error) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      console.error(`✗ Error: ${src} @ ${width}w -`, error);
    }
  }
}

async function warmup(): Promise<void> {
  console.log("🔥 Starting image cache warmup...\n");

  // Supabase에서 이미지 URL 가져오기
  const IMAGES_TO_WARM = await getImageUrls();

  console.log(`📦 Found ${IMAGES_TO_WARM.length} images to warm up\n`);

  if (IMAGES_TO_WARM.length === 0) {
    console.log("No images found to warm up.");
    return;
  }

  // 동시 요청 제한 (서버 부하 방지)
  const CONCURRENCY = 5;
  const queue: (() => Promise<void>)[] = [];

  for (const src of IMAGES_TO_WARM) {
    for (const width of WIDTHS) {
      queue.push(() => warmupImage(src, width));
    }
  }

  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    await Promise.all(queue.slice(i, i + CONCURRENCY).map((fn) => fn()));
  }

  console.log("\n✅ Warmup complete!");
}

warmup();
