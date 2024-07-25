"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/draw/Title";
import clsx from "clsx";
import CanvasContainer from "./CanvasContainer";
import { daily } from "@/types/daily";

async function fetchDaily() {
  try {
    let url = process.env.NEXT_PUBLIC_API_URL + "/daily";
    console.log("Fetching daily data from:", url);
    let response = await fetch(url, { cache: "no-store" });
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily data:", error);
    // Provide fallback data
    return { date: "fallback", id: "fallback", word: "fallback", seed: 511 };
  }
}

export default function Page() {
  const [data, setData] = useState<daily | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await fetchDaily();
      setData(dailyData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "w-screen",
          "flex-grow",
          "pt-1"
        )}
        // style={{ maxHeight: "calc(100vh - 1rem)" }}
      >
        <div
          className={clsx(
            //
            "w-full",
            //
            "xs:w-11/12",
            "max-w-screen-md",
            //
            "bg-blue-zigzag",
            "border-2",
            "border-gray-700",
            "rounded-3xl",
            "py-3",
            "px-1",
            "sm:px-12",
            "flex", // Add this
            "flex-col", // Add this
            "items-center", // Add this
            "justify-center" // Add this
          )}
          style={{
            boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)",
            maxHeight: "calc(100vh - 5rem)",
          }}
        >
          <Title word={data.word} className="mt-2 mb-2" wordClassName="" />
          <CanvasContainer seed={data.seed} />
        </div>
      </main>
    </>
  );
}
