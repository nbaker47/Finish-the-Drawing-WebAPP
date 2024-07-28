"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/draw/Title";
import clsx from "clsx";
import { daily } from "@/types/daily";
import Canvas from "@/components/drawing/canvas/Canvas";

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
  const [daily, setData] = useState<daily | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await fetchDaily();
      setData(dailyData);
    };
    fetchData();
  }, []);

  if (!daily) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={clsx(
          //
          // "sm:w-min",
          // "h-min",
          "mt-0",
          // //
          // "w-11/12",
          //
          "bg-blue-zigzag",
          "border-2",
          "border-gray-700",
          "rounded-3xl",
          "pt-2",
          "pb-5",
          "px-1",
          "sm:px-12",
          "md:pb-3",
          "mx-auto",
          "h-[85vh]",
          "sm:h-[85vh]",
          "flex",
          "flex-col",
          "w-full",
          "lg:w-[50vw]"
          // "items-center"
          // "mt-1"
        )}
        style={{
          boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)",
          // maxHeight: "calc(100vh - 10rem)",
        }}
      >
        <Title word={daily.word} className="mt-2 mb-2" wordClassName="" />
        <Canvas
          pencilMan={true}
          shareBar={true}
          // canvasRef={canvasRef}
          // randomLines={randomLines}
          lines={true}
          daily={daily}
          submitUrl={`${process.env.NEXT_PUBLIC_API_URL}/drawing`}
          redirectUrl="/view-today"
        />
      </div>
    </div>
  );
}
