"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import React, { useEffect, useState } from "react";

interface ChartData {
  name: string;
  price: number;
}

export default function MainChart({ ticker }: { ticker: string }) {
  const [data, setData] = useState<ChartData[]>([]);

  async function showInitialChart() {
    const res = await fetch(`http://127.0.0.1:8000/ticker/${ticker}/chart`);
    const chartData = await res.json();
    setData(chartData);
  }

  useEffect(() => {
    showInitialChart();
  }, [ticker]);

  if (!data.length) return <div>Loading chart...</div>;

  return (
    <div className="flex justify-center">
      <LineChart width={750} height={450} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="price" stroke="#22543d" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}
