"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FlashcardGraphProps {
  data: { hour: string; cards: number }[];
}

export default function FlashcardGraph({ data }: FlashcardGraphProps) {
  return (
    // <Card className="bg-[#f7f3e9] border-[#8e354a] border">
    <Card className="border">
      <CardHeader>
        {/* <CardTitle className="text-[#8e354a]">復習カード</CardTitle> */}
        <CardTitle className="">復習カード</CardTitle>
        <CardDescription>1時間ごとの復習予定カード数</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="hour"
              stroke="#8e354a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8e354a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "#f7f3e9",
                border: "1px solid #8e354a",
                borderRadius: "4px"
              }}
            />
            <Bar dataKey="cards" fill="#8e354a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
