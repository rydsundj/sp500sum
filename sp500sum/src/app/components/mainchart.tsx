"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import React, { useEffect, useState } from "react";




export default function MainChart({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = React.use(params);
  const [info, setInfo] = useState<string>("Loading...");


  async function showInitialChart() {
    const res = await fetch(`http://127.0.0.1:8000/ticker/${ticker}/chart`);
    const data = await res.json();
    setInfo(data);
  }
  useEffect(() => {
    showInitialChart();
  }, []);

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