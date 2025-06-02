export interface Schedule {
  date: string; // ex) "2025-06-04"
  name: string;
  color: string; // ex) "#aaf4a2"
}

export const schedules: Schedule[] = [
  { date: "2025-06-04", name: "동아리일정", color: "#aaf4a2" },
  { date: "2025-06-04", name: "합주일정", color: "#f6baff" },
  { date: "2025-06-04", name: "합주일정", color: "#f6baff" },
  { date: "2025-06-04", name: "합주일정", color: "#f6baff" },
  { date: "2025-06-04", name: "합주일정", color: "#f6baff" },
  { date: "2025-06-05", name: "회의..감이들어 우하하", color: "pink" },
];
