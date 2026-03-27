import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_POOLSOOP } from "@/constants/allrecords.consts";
import { Record } from "@/types/allrecords.types";
import { getPoolsoopRecords } from "../apis/poolsoop.apis";

export const usePoolsoopRecordsQuery = () => {
  return useQuery<Record[], Error>({
    queryKey: [QUERY_KEY_POOLSOOP],
    queryFn: () => getPoolsoopRecords(),
  });
};
