"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [query, setQuery] = useState("");
  const [showNotFound, setNotFoundText] = useState(false);
  const router = useRouter();
  async function handleSearch (event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const res = await fetch(`http://127.0.0.1:8000/ticker/${query}`);
      const data = await res.json();
      if(data[0] == null && !showNotFound)
      {
        toggleText();
      }else if(data[0] == null)
      {
        //do nuttin
      }else if(data.detail == "Not Found" && !showNotFound)
      {
        toggleText();
      }else if(data.detail == "Not Found")
      {
        //do nuttin
      }else
      {
        toggleText();
        router.push(`/info/${query}`);
      }
      return data;
  };

  function toggleText()
  {
    setNotFoundText(!showNotFound);
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="font-mono mb-2 tracking-[-.01em]">
            Enter a ticker, for example{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              GME
            </code>
            .
          </h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-lg p-2 w-40"
          />

          <button className="w-32 h-12 rounded bg-green-900 text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
            <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all">

            </span>
            <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all">

            </span>
              Search
          </button>

          </form>

        </div>
        <div className="flex gap-4 items-center flex-row sm:flex-row">
          {showNotFound && (<p className="mt-4">No ticker found</p>)}
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
