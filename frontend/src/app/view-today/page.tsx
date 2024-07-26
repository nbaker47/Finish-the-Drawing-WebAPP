"use client";

import { drawingResponse } from "@/types/drawing";
import React, { useEffect, useState } from "react";

async function fetchTodaysDrawings() {
  try {
    let url = process.env.NEXT_PUBLIC_API_URL + "/drawings/today";
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
  const [daily, setData] = useState<drawingResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await fetchTodaysDrawings();
      setData(dailyData);
    };
    fetchData();
  }, []);

  if (!daily) {
    return <div>Loading...</div>;
  }
}
