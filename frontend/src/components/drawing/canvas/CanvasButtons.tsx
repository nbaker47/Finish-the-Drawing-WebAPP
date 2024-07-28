"use client";

import { FaUndo } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { undoLastStroke } from "./drawing";
import { submitDrawing } from "./submitDrawing";
import { daily } from "@/types/daily";
import { CanvasContext } from "@/app/draw/CanvasContext";

interface CanvasButtonsProps {
  className?: string;
  description?: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  randomLines: { x: number; y: number }[][];
  daily: daily;
  submitUrl: string;
  redirectUrl: string;
}

export default function CanvasButtons({
  className,
  description,
  canvasRef,
  randomLines,
  daily,
  submitUrl,
  redirectUrl,
}: CanvasButtonsProps) {
  // const { canvasRef, randomLines, daily, submitUrl, redirectUrl } =
  //   useContext(CanvasContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const handleUndo = () => {
    if (canvas && context && randomLines) {
      undoLastStroke(canvas, context, randomLines);
    } else {
      // alert(`canvas: ${canvas} context:${context} randomLines:${randomLines}`);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (canvas && context) {
      if (daily && description) {
        try {
          submitDrawing(
            submitUrl,
            canvas,
            redirectUrl,
            daily,
            description,
            "NULL_USER"
          );
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div className={`${className} flex justify-between pt-3`}>
      <button
        id="back-button"
        className="text-lg w-full flex justify-center items-center xs:text-2xl text-black"
        onClick={handleUndo}
      >
        <FaUndo />
      </button>
      <button
        id="submit-button"
        className="text-lg w-full xs:text-2xl text-black"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
