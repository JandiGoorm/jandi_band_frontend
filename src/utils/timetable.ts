import { type Range } from "@/types/timeTable";
import { range, timeRange } from "@/components/scheduler/constants";
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

export const { startTime, endTime } = timeRange;

export const timeLineItems = Array.from(
  { length: endTime - startTime + 1 },
  (_, index) => (startTime + index).toString().padStart(2, "0")
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

export const convertTimeTableToMap = (
  timetableData: Record<Range, string[]>
) => {
  const schedule = new Map<string, boolean>();

  range.forEach((day) => {
    timeLineItems.forEach((item) => {
      const hourFirst = `${item}:00`;
      const hourSecond = `${item}:30`;

      // 00분 체크
      if (timetableData[day as Range].includes(hourFirst)) {
        schedule.set(`${day}-${hourFirst}`, true);
      } else {
        schedule.set(`${day}-${hourFirst}`, false);
      }

      // 30분 체크
      if (timetableData[day as Range].includes(hourSecond)) {
        schedule.set(`${day}-${hourSecond}`, true);
      } else {
        schedule.set(`${day}-${hourSecond}`, false);
      }
    });
  });
  return schedule;
};
