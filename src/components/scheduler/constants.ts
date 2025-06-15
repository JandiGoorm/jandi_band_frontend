import { type Range } from "@/types/timeTable";

export const range: Range[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const initialTimeSchedule: Record<Range, string[]> = {
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
  Sun: [],
};

export const timeRange = {
  startTime: 7,
  endTime: 23,
};
