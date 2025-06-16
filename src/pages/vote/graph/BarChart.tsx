// 바 형식 import
import { ResponsiveBar } from "@nivo/bar";
import styles from "@/pages/vote/graph/BarChart.module.css";

export interface VoteResultType {
  song: string;
  좋아요: number;
  별로예요: number;
  실력부족: number;
  하않존중: number;
  [key: string]: string | number;
}

interface BarChartProps {
  data: { song: string; [key: string]: number | string }[];
  keys: string[];
  filter: string;
}

interface CustomTickProps {
  x: number;
  y: number;
  value: string;
  textAnchor: string;
}

const CustomTick = ({ x, y, value, textAnchor }: CustomTickProps) => {
  // 화면 너비 체크
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;

  // 화면 너비 조건별 최대 글자수 설정
  const maxLength = width <= 400 ? 5 : width <= 768 ? 8 : 20;

  const truncate = (str: string, len: number) =>
    str.length > len ? str.slice(0, len) + "…" : str;

  const [artist = "", title = ""] = value.split("-");

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor={textAnchor}>
        <title>{value}</title> {/* 전체 텍스트 툴팁 */}
        <tspan x="0" dy="1rem" style={{ fontSize: 8, fill: "#555" }}>
          {truncate(artist.trim(), maxLength)}
        </tspan>
        <tspan
          x="0"
          dy="1.2em"
          style={{ fontSize: 10, fontWeight: "bold", fill: "#222" }}
        >
          {truncate(title.trim(), maxLength)}
        </tspan>
      </text>
    </g>
  );
};

const BarChart = ({ data, keys, filter }: BarChartProps) => {
  return (
    // div안에 스타일 지정해놓아야 출력됨.
    <section className={styles.chart_wrapper}>
      <div className={styles.chart_inner}>
        <ResponsiveBar
          data={data}
          keys={keys}
          // indexBy="song"
          indexBy="id"
          margin={{ top: 50, right: 10, bottom: 50, left: 40 }}
          groupMode="grouped"
          axisBottom={{
            renderTick: CustomTick,
            legendOffset: 36,
          }}
          axisLeft={{
            legendOffset: -40,
          }}
          totalsOffset={9}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelPosition="end"
          labelOffset={8}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              translateY: 55,
              itemsSpacing: 3,
              itemWidth: 70,
              itemHeight: 20,
              symbolSize: 10,
              itemDirection: "left-to-right",
              symbolShape: "circle",
            },
          ]}
          layout="vertical"
          colors={({ id }) => {
            if (filter === "묶기") return id === "긍정" ? "#FF9EAA" : "#a4c7dd";
            switch (id) {
              case "좋아요":
                return "#FF9EAA";
              case "별로예요":
                return "#a4c7dd";
              case "실력부족":
                return "#97E3D5";
              case "하않존중":
                return "#60CDBA";
              default:
                return "#ccc";
            }
          }}
          motionConfig="stiff"
        />
      </div>
    </section>
  );
};

export default BarChart;
