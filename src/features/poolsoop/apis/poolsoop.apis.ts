import api from "@/lib/utils";
import type { Record } from "@/types/allrecords.types";

export function getPoolsoopRecords() {
  return api.get<Record[], Record[]>("/api/poolsoop");
}
