import { type Range } from "@/types/timeTable";
import { range } from "@/components/scheduler/constants";
import cloneDeep from "lodash-es/cloneDeep";

const initialTimeTableData: Record<Range, string[]> = Object.freeze(
  range.reduce(
    (acc, day) => {
      acc[day] = [];
      return acc;
    },
    {} as Record<Range, string[]>
  )
);

export const convertTimeTable = (schedule: Map<string, boolean>) => {
  const timetableData: Record<Range, string[]> =
    cloneDeep(initialTimeTableData);

  schedule.forEach((isSelected, id) => {
    const [day, time] = id.split("-");
    if (isSelected) {
      timetableData[day as Range].push(time);
    }
  });
  return timetableData;
};
