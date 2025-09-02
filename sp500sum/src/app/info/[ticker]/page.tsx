"use client";

import MainChart from "../../components/mainchart";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Info({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = React.use(params);   // ✅ unwraps params Promise
  const router = useRouter();

  const [info, setInfo] = useState<any>(null);

  async function showInfo() {
    const res = await fetch(`http://127.0.0.1:8000/ticker/${ticker}`);
    const data = await res.json();
    setInfo(data);
  }

  useEffect(() => {
    showInfo();
  }, [ticker]);

  if (!info) return <div>Loading...</div>;

  return (
    <div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl">
        <button onClick={() => router.push(`/`)}>Home</button>
      </h1>

      <main className="font-mono flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-200">
        <h1 className="font-mono mb-10 tracking-[-.01em]">
          Showing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
            {ticker.toUpperCase()}
          </code>
          .
        </h1>

        <div>{info[0]}</div>

        <div className="font-mono text-2xl font-bold">
          Open: {info[1]} <br />
          Latest Close: {info[2]} <br />
          Short Ratio: {info[3]} <br />
        </div>

        <div className="font-mono">
          <MainChart ticker={ticker} />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rydsundj.github.io/rydsundj/"
          target="_blank"
          rel="noopener noreferrer"
        >
          made by rydsundj →
        </a>
      </footer>
    </div>
  );
}
