"use client";

import React, { useEffect, useState } from "react";

interface OptionsData {
  expirydate: string;
  type: string;
}

export default function MainChart({ ticker }: { ticker: string }) {
  const [data, setData] = useState<OptionsData[]>([]);

  async function showInitialChart() {
    const res = await fetch(`http://127.0.0.1:8000/ticker/${ticker}/options`);
    const optionsData = await res.json();
    setData(optionsData);
  }

  useEffect(() => {
    showInitialChart();
  }, [ticker]);

  if (!data.length) return <div>Loading chart...</div>;

  return (
    <div className="flex justify-center">
    </div>
  );
}
