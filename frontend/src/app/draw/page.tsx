import React from "react";
import Title from "@/app/draw/Title";
import clsx from "clsx";
import CanvasContainer from "./CanvasContainer";
import { daily } from "@/types/daily";

async function fetchDaily() {
  try {
    let url = process.env.NEXT_PUBLIC_API_URL + "/daily";
    let response = await fetch(url);
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily data:", error);
    // Provide fallback data
    data = { date: "fallback", id: "fallback", word: "fallback", seed: 511 };
    return data;
  }
}

export default async function Page() {
  const data: daily = await fetchDaily();
  const word = data.word;
  const seed = data.seed;

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
          <Title word={word} className="mt-2 mb-2" wordClassName="" />
          <CanvasContainer seed={seed} />
        </div>
      </main>
    </>
  );
}
