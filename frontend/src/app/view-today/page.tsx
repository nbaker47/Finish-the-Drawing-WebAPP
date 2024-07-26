"use client";

import { drawingResponse } from "@/types/drawing";
import React, { useEffect, useState } from "react";
import Title from "./_components/title/Title";
import Sharebar from "@/components/Sharebar";
import Card from "./_components/card/Card";

async function fetchTodaysDrawings() {
  try {
    let url = process.env.NEXT_PUBLIC_API_URL + "/drawing/today";
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

  return (
    <>
      <div className="flex flex-col items-center mt-3 mb-10">
        <Title />
        <Sharebar className="mb-6 sm:mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:max-w-[80%] ani-bounce-in ">
          {drawings.map((drawing, i) => (
            <Card key={i} submission={drawing} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
