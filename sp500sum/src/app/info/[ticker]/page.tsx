"use client";

import MainChart from "../../components/mainchart";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Info({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = React.use(params);
  const router = useRouter();

  const [info, setInfo] = useState<any>(null);
  const [options, setOptions] = useState<any[] | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [sortKey, setSortKey] = useState<string>("expirydate");

  async function showInfo() {
    const res = await fetch(`https://ticker-fetch-backend-production.up.railway.app/ticker/${ticker}`);
    const data = await res.json();
    setInfo(data);
  }

  async function toggleOptionsList() {
    if (!showOptions && !options) {
      const res = await fetch(`https://ticker-fetch-backend-production.up.railway.app/ticker/${ticker}/options`);
      const data = await res.json();
      setOptions(data);
    }
    setShowOptions(!showOptions);
  }

  useEffect(() => {
    showInfo();
  }, [ticker]);

  const getSortedOptions = () => {
    if (!options) return [];
  
    return [...options].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
  
      if (aValue == null || bValue == null) return 0; 
  
      if (sortKey === "strike") {
        return parseFloat(aValue) - parseFloat(bValue);
      } else {
        return String(aValue).localeCompare(String(bValue));
      }
    });
  };
  

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

        <div className="w-full flex flex-col items-center">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={toggleOptionsList}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              {showOptions ? "Hide option contracts" : "View option contracts"}
            </span>
          </button>

          {showOptions && (
            <div className="mb-4 flex gap-4">
              <button onClick={() => setSortKey("expirydate")} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
                Sort by Expiry Date
              </button>
              <button onClick={() => setSortKey("type")} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
                Sort by Type
              </button>
              <button onClick={() => setSortKey("strike")} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">
                Sort by Strike
              </button>
            </div>
          )}

          {showOptions && options && (
            <ul className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              {getSortedOptions().map((opt, idx) => (
                <li key={idx} className="py-2 border-b border-gray-300 dark:border-gray-600">
                  <div className="grid grid-cols-3 gap-2 text-sm sm:text-base">
                    <span><strong>Expiry:</strong> {opt.expirydate}</span>
                    <span><strong>Type:</strong> {opt.type}</span>
                    <span><strong>Strike:</strong> {opt.strike}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
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
