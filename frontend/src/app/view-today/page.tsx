"use client";

import { drawingResponse } from "@/types/drawing";
import React, { useEffect, useState } from "react";
import Title from "./_components/title/Title";
import Sharebar from "@/components/Sharebar";
import Card from "./_components/card/Card";

async function fetchTodaysDrawings(): drawingResponse[] {
  try {
    let url = process.env.NEXT_PUBLIC_API_URL + "/drawing/today";
    console.log("Fetching daily data from:", url);
    let response = await fetch(url, { cache: "no-store" });
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily data:", error);
  }
}

export default function Page() {
  const [drawings, setdrawings] = useState<drawingResponse[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const drawingData = await fetchTodaysDrawings();
      setdrawings(drawingData);
    };
    fetchData();
  }, []);

  if (!drawings) {
    return <div>Loading...</div>;
  }

  console.log(drawings);

  // Sort by likes
  const sortedDrawings = drawings.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <div className="flex flex-col items-center mt-3 mb-10">
        <Title />
        <Sharebar className="mb-6 sm:mb-8" />
        <div
          className={`grid gap-10 sm:max-w-[80%] ani-bounce-in ${
            sortedDrawings.length >= 3
              ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2"
              : sortedDrawings.length >= 2
              ? "md:grid-cols-2 sm:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {sortedDrawings.map((drawing, i) => (
            <Card key={i} submission={drawing} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
