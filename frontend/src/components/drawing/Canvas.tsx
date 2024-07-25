"use client";

import React from "react";
import clsx from "clsx";
import { FaUndo } from "react-icons/fa";

export default function Canvas({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "bg-pokadot",
        "border-2",
        "border-gray-700",
        "rounded-3xl",
        "px-4",
        "pt-4",
        "pb-2",
        className
      )}
      id="main-drawing-interface"
    >
      <div
        className={clsx(
          "bg-white",
          "border-dashed",
          "border-2",
          "border-gray-700",
          "rounded-3xl",
          "relative",
          "max-w-[300px]",
          "max-h-[300px]",
          "mx-auto"
        )}
      >
        {/* Below div maintains aspect ratio of canvas */}
        <div style={{ paddingTop: "100%" }} />
        <canvas
          id="drawing-canvas"
          className="fade-in absolute top-0 left-0 w-full h-full"
        ></canvas>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center mt-3">
        <div>
          <button
            id="back-button"
            className=""
            //   onClick={undoLastStroke}
          >
            <FaUndo />
          </button>
        </div>
        <div>
          <button
            id="submit-button"
            className=""
            //   onClick={submitDrawing}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
