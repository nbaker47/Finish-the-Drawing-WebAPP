"use client";

import React, { useState, useEffect } from "react";
import Title from "@/app/draw/Title";
import clsx from "clsx";
import { daily } from "@/types/daily";
import Canvas from "@/components/drawing/canvas/Canvas";
import { atom, useAtom } from "jotai";

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

// Create atoms
export const submitUrlAtom = atom(`${process.env.NEXT_PUBLIC_API_URL}/drawing`);
export const redirectUrlAtom = atom("/view-today");
export const dailyAtom = atom<daily | null>(null);

export default function Page() {
  const [daily, setDaily] = useAtom(dailyAtom);

  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await fetchDaily();
      setDaily(dailyData);
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
          "mt-0",
          "bg-blue-zigzag",
          "border-2",
          "border-gray-700",
          "rounded-3xl",
          "pt-2",
          "pb-5",
          "px-1",
          "sm:px-12",
          "md:pb-10",
          "mx-auto",
          "h-[fit]",
          "w-[100vw]",
          "sm:w-[90vw]",
          "flex",
          "flex-col",
          "w-full",
          "xl:w-[50vw]"
        )}
        style={{
          boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)",
        }}
      >
        <Title word={daily.word} className="mt-2 mb-2" wordClassName="" />
        <Canvas pencilMan={true} shareBar={true} lines={true} />
      </div>
    </div>
  );
}
