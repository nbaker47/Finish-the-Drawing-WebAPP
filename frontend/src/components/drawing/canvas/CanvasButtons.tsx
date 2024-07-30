"use client";

import { FaUndo } from "react-icons/fa";
import React, { useState } from "react";
import { submitDrawing } from "./submitDrawing";
import { daily } from "@/types/daily";
import { useAtom } from "jotai";
import { submitUrlAtom, redirectUrlAtom, dailyAtom } from "@/app/draw/page";
import { undo } from "./Canvas";

interface CanvasButtonsProps {
  className?: string;
  description?: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  randomLinesRef: React.MutableRefObject<{ x: number; y: number }[][]>;
  userDrawnLinesRef: React.MutableRefObject<{ x: number; y: number }[][]>;
  setUserDrawnLines: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[][]>
  >;
}

export default function CanvasButtons({
  className,
  description,
  canvasRef,
  randomLinesRef,
  userDrawnLinesRef,
  setUserDrawnLines,
}: CanvasButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const [submitUrl] = useAtom(submitUrlAtom);
  const [redirectUrl] = useAtom(redirectUrlAtom);
  const [daily] = useAtom(dailyAtom);

  const handleUndo = () => {
    undo(canvasRef, userDrawnLinesRef, setUserDrawnLines, randomLinesRef);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (canvas && context && daily && description && !isSubmitting) {
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
