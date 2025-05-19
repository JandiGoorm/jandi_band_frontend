// 바 형식 import
import { ResponsiveBar } from "@nivo/bar";

export interface VoteResultType {
  song: string;
  좋아요: number;
  별로예요: number;
  실력부족: number;
  하않존중: number;
  [key: string]: string | number;
}

interface BarChartProps {
  data: VoteResultType[];
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    // div안에 스타일 지정해놓아야 출력됨.
    <div style={{ height: 550 }}>
      <ResponsiveBar<VoteResultType>
        data={data}
        keys={["좋아요", "별로예요", "실력부족", "하않존중"]}
        indexBy="song"
        margin={{ top: 50, right: 10, bottom: 50, left: 40 }}
        groupMode="grouped"
        axisBottom={{
          legendOffset: 32,
        }}
        axisLeft={{
          //   legend: "투표 수",
          legendOffset: -40,
        }}
        totalsOffset={9}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelPosition="end"
        labelOffset={-8}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom",
            direction: "row",
            translateY: 55,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 10,
            itemDirection: "left-to-right",
            symbolShape: "circle",
          },
        ]}
        layout="vertical"
        colors={({ id }) => {
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
      />
    </div>
  );
};

export default BarChart;
