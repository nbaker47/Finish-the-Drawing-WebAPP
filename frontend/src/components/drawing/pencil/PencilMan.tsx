import React, { useEffect, useState } from "react";
import Image from "next/image";
import PencilHappy from "./pencil_happy.png";
import PencilSad from "./pencil_sad.png";
import PencilNeutral from "./pencil_neutral.png";
import clsx from "clsx";
import words from "./words";

export default function PencilMan({
  className,
  speech,
  clickCount,
  randomWord,
  setRandomWord,
  canvasLoaded,
}: {
  className?: string;
  speech?: string;
  clickCount: number;
  randomWord: string;
  setRandomWord: (word: string) => void;
  canvasLoaded: boolean;
}) {
  const images = [PencilNeutral, PencilHappy]; // Array of images
  const [imageIndex, setImageIndex] = useState(0); // New state variable
  const [bubbleAnimation, setBubbleAnimation] = useState(false); // New state variable

  useEffect(() => {
    console.log("PencilMan.tsx: clickCount: ", clickCount);
  }, [clickCount]);

  useEffect(() => {
    console.log("PencilMan.tsx: clickCount", clickCount);

    if ((clickCount > 0 && clickCount % 3 === 0) || clickCount === 1) {
      let randint = Math.floor(Math.random() * (words.length - 1)) + 1;
      setRandomWord(words[randint]);
      setBubbleAnimation(true); // Start animation

      setTimeout(() => {
        setBubbleAnimation(false); // End animation after 1 second
      }, 1000);
    }
    if (clickCount > 0 && clickCount % 6 === 0) {
      setImageIndex((index) => 1); // Update imageIndex
    }
  }, [clickCount]);

  return (
    <div
      className={clsx(
        "flex",
        "flex-row",
        "gap-0",
        "ftd-border",
        "rounded-md",
        "shadow-inner",
        "bg-lined-faint",
        "items-center",
        "justify-center", // Add this line
        "text-center", // Add this line\
        className
      )}
    >
      <div
        className={clsx(
          "p-2",
          "w-1/5",
          // "border-r-2",
          // "border-gray-700",
          "flex",
          "items-center",
          "justify-center",
          // "bg-diagonal",
          bubbleAnimation && "ani-bubble",
          "rounded-md"
        )}
      >
        <Image src={images[imageIndex]} alt="Pencil" width={40} height={40} />
      </div>
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-center", // Add this line
          "text-center", // Add this line\
          "mx-auto",
          "w-4/5",
          "text-[0.6rem]",
          "sm:text-[0.8rem]",
          "text-black",
          "w-[400px]",
          "h-[50px]",
          "rounded-md",
          "p-2",
          "font-exo",
          bubbleAnimation && "ani-bubble"
        )}
      >
        {canvasLoaded && (
          <span className="">{speech ? speech : randomWord}</span>
        )}
      </div>
    </div>
  );
}
