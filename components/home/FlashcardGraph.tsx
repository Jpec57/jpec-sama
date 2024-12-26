"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface FlashcardGraphProps {
  data: { date: string; count: number }[];
}

export default function FlashcardGraph({ data }: FlashcardGraphProps) {
  const formattedData = data.map((item) => ({
    ...item,
    hour: dayjs(item.date).format("HH:mm"),
  }));
  const maxY = formattedData
    .map((item) => item.count)
    .reduce((a, b) => Math.max(a, b), 0);

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="">復習カード</CardTitle>
        <CardDescription>1時間ごとの復習予定カード数</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formattedData}>
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
              ticks={
                maxY < 4
                  ? Array.from({ length: 4 }, (_, i) => i)
                  : Array.from({ length: Math.max(maxY, 4) }, (_, i) =>
                      i === 0 ? 0 : Math.floor(maxY / i),
                    ).concat(maxY)
              }
            />
            <Tooltip
              contentStyle={{
                background: "#f7f3e9",
                color: "#8e354a",
                border: "1px solid #8e354a",
                borderRadius: "4px",
              }}
            />
            <Bar dataKey="count" fill="#8e354a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
