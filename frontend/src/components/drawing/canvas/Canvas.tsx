"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, pencilMan, shareBar }, ref) => {
    return (
      <div
        className={clsx(
          "flex", // Change this
          "flex-col", // Add this
          "bg-pokadot",
          // "sm:px-12",
          "border-[1.1px]",
          "border-gray-700",
          "rounded-3xl",
          "px-2",
          "pt-3",
          "pb-2",
          "w-full",
          "h-fit",
          className,
          `${pencilMan && "mt-5 sm:mt-0"}`
        )}
        style={{ boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)" }}
        id="main-drawing-interface"
      >
        {pencilMan && (
          <div
            style={{ left: "-12px", top: "-32px" }}
            className="relative mb-3"
          >
            <PencilMan className="z-50 absolute" />
          </div>
        )}
        {shareBar && <Sharebar className="mb-3" />}
        <div
          className={clsx(
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            //   "relative",
            "aspect-[1/1]",
            "w-full",
            "h-full",
            "mx-auto",
            "screen-height-grow"
          )}
        >
          <div
            className={clsx(
              "bg-white",
              "border-dashed",
              "border-2",
              "border-gray-700",
              "rounded-3xl",
              // "relative",
              // "aspect-[1/1]",
              "w-full",
              "h-full"
              // "mx-auto",
              // "big-screen"
            )}
          >
            {/* Below div maintains aspect ratio of canvas */}
            {/* <div style={{ paddingTop: "100%" }} /> */}
            <canvas
              id="drawing-canvas"
              className="fade-in w-full h-full"
              ref={ref}
            ></canvas>
          </div>
          <div className="w-full">
            <CanvasButtons className="your-optional-classes" />
          </div>
        </div>
      </div>
    );
  }
);

export default Canvas;
