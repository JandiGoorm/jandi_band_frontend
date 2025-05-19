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
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        groupMode="grouped"
        axisBottom={{
          legendOffset: 32,
        }}
        axisLeft={{
          legend: "투표 수",
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
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
