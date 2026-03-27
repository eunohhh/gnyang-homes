import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { prefetchPoolsoopRecords } from "@/lib/supabase/prefetch";
import { createClient } from "@/lib/supabase/server";
import PoolsoopTemplate from "@/templates/poolsoop-template";

export const metadata: Metadata = {
  title: "Poolsoop",
  description: "고양이 관찰일기",
};

async function PoolSoopPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  await prefetchPoolsoopRecords(queryClient, supabase);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PoolsoopTemplate />
    </HydrationBoundary>
  );
}

export default PoolSoopPage;
