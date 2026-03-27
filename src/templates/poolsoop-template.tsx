"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import {
  PoolsoopFooter,
  PoolsoopHeader,
  PoolsoopToon,
} from "@/features/poolsoop";
import { usePoolsoopRecordsQuery } from "@/features/poolsoop/hooks/poolsoop.hooks";
import { RecordImage } from "@/types/allrecords.types";

function PoolsoopTemplate() {
  const [number, setNumber] = useQueryState(
    "number",
    parseAsInteger.withDefault(1)
  );
  const { data: poolsoopRecords, isPending, error } = usePoolsoopRecordsQuery();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (poolsoopRecords) {
      console.log(poolsoopRecords);
    }
  }, [poolsoopRecords]);

  const descriptions = useMemo(() => {
    return poolsoopRecords?.map((record) => record.description);
  }, [poolsoopRecords]);

  const contents = useMemo(() => {
    const filteredRecords = poolsoopRecords?.filter((record) => {
      const replacedNumber = Number(record.title.replace("풀숲-", ""));
      return replacedNumber === number;
    });
    const mappedImages = filteredRecords?.flatMap((record) => record.images);
    return mappedImages;
  }, [poolsoopRecords, number]);

  return (
    <section className="flex h-svh flex-col items-center justify-center">
      <PoolsoopHeader descriptions={descriptions} setNumber={setNumber} />
      <PoolsoopToon contents={contents as unknown as RecordImage[]} />
      <PoolsoopFooter />
    </section>
  );
}

export default PoolsoopTemplate;
