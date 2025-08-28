"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
    { name: "Jan", price: 120 },
    { name: "Feb", price: 140 },
    { name: "Mar", price: 100 },
    { name: "Apr", price: 160 },
    { name: "May", price: 180 },
  ];


export default function MyChart() {
    return (
      <div className="flex justify-center">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  }