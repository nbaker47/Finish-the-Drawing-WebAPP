"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";
import words from "@/components/drawing/pencil/words";
import { daily } from "@/types/daily";
import { drawLines } from "./drawingReworked";
import { pushRandomLines } from "./randomLines";

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
  // canvasRef: RefObject<HTMLCanvasElement>;
  // randomLines?: { x: number; y: number }[][];
  lines: boolean;
  daily: daily;
  submitUrl: string;
  redirectUrl: string;
}

async function fetchRandomLines(
  containerWidth: number,
  containerHeight: number
) {
  try {
    let url =
      process.env.NEXT_PUBLIC_API_URL +
      "/daily/random-lines?canvas-width=" +
      containerWidth +
      "&canvas-height=" +
      containerHeight;
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

export default function Canvas({
  className,
  pencilMan,
  shareBar,
  // canvasRef,
  // randomLines,
  lines,
  daily,
  submitUrl,
  redirectUrl,
}: CanvasProps) {
  // Refs for canvas and container
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // State for container dimensions
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerLoaded, setContainerLoaded] = useState(false);
  // State for drawing
  const [randomLines, setRandomLines] = useState<{ x: number; y: number }[][]>(
    []
  );
  // State for pencil text
  const [randomWord, setRandomWord] = useState(words[0]);
  const [clickCount, setClickCount] = useState(0);

  // When the canvas container is loaded capture its dimensions
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
      setContainerLoaded(true);
    }
  }, [containerRef.current]);

  // Fetch random lines on component mount
  useEffect(() => {
    console.log(
      "containerWidth",
      containerWidth,
      "containerHeight",
      containerHeight
    );
    if (lines) {
      fetchRandomLines(containerWidth, containerHeight).then((lines) => {
        const transformedLines = lines.map((line: any[]) =>
          line.map((point) => ({ x: point[0], y: point[1] }))
        );
        setRandomLines(transformedLines);
      });
    }
    // if (canvasRef.current) {
    //   for (var i = 0; i < 7; i++) {
    //     pushRandomLines(
    //       i,
    //       randomLines,
    //       canvasRef,
    //       canvasRef.current.getContext("2d"),
    //       daily.seed
    //     );
    //   }
    // }
  }, [containerWidth, containerHeight]);

  // Draw random lines on canvas
  useEffect(() => {
    console.log("Canvas.tsx: randomLines", randomLines);
    if (canvasRef.current && randomLines) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        drawLines(context, randomLines);
      }
    }
  }, [randomLines]);

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "bg-pokadot",
        "border-[1.1px]",
        "border-gray-700",
        "rounded-3xl",
        "px-2",
        "pt-3",
        "pb-2",
        "w-[100%]",
        "xs:w-[100%]",
        "sm:w-[90%]",
        "h-fit",
        "mx-auto",
        className
      )}
      style={{ boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)" }}
    >
      {shareBar && <Sharebar className="mb-3" />}
      <div
        className={clsx(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "w-[100%]",
          "max-w-[98vw]",
          "sm:max-w-[90%]"
        )}
      >
        {pencilMan && (
          <div className="w-11/12">
            <PencilMan
              className="mb-3 w-full"
              clickCount={clickCount}
              randomWord={randomWord}
              setRandomWord={setRandomWord}
            />
          </div>
        )}
        <div
          ref={containerRef}
          className={clsx(
            "bg-white",
            "rounded-3xl",
            "flex",
            "flex-grow",
            "border-dashed",
            "border-gray-700",
            "border-2",
            "w-[100%]",
            "max-h-[40vh]",
            "min-h-[40vh]"
          )}
        >
          <div className="flex flex-grow">
            {containerLoaded && (
              <canvas
                className="static fade-in cursor-crosshair ani-fade-in w-[100%] h-[100%]"
                ref={canvasRef as RefObject<HTMLCanvasElement>}
                onClick={() => {
                  setClickCount((prevCount) => prevCount + 1);
                }}
                width={containerWidth}
                height={containerHeight}
              ></canvas>
            )}
          </div>
        </div>
        <div className="w-full">
          <CanvasButtons
            description={randomWord}
            canvasRef={canvasRef}
            randomLines={randomLines}
            daily={daily}
            submitUrl={submitUrl}
            redirectUrl={redirectUrl}
          />
        </div>
      </div>
    </div>
  );
}
