import React, { useEffect, useState } from "react";
import Image from "next/image";
import PencilHappy from "./pencil_happy.png";
import PencilSad from "./pencil_sad.png";
import PencilNeutral from "./pencil_neutral.png";
import clsx from "clsx";

export default function PencilMan({
  className,
  speech,
  clickCount,
}: {
  className?: string;
  speech?: string;
  clickCount: number;
}) {
  const words = [
    "Use your creativity to finish the scribbles to draw the word of the day!",
    "This drawing is a visual haiku, where every stroke speaks a thousand words in elegant brevity.",
    "In a world full of noise, this drawing whispers profound beauty in the simplest of lines.",
    "This drawing is like a delicate dance of graphite on paper, weaving a tale with each graceful movement.",
    "Who needs a grand novel when this drawing tells a captivating story in the space of a single page?",
    "Behold, the artistry that proves the adage 'less is more'—a masterpiece born from minimalism.",
    "This drawing harnesses the power of simplicity, leaving an indelible mark on the canvas of our imagination.",
    "In a single sketch, this drawing manages to capture the essence of a thousand fleeting moments.",
    "I'm convinced this artist has mastered the art of eloquent silence—this drawing speaks volumes in its quiet elegance.",
    "This drawing is a poetic composition, where each stroke plays its part, harmonizing into a masterpiece of visual verse.",
    "Sometimes, the greatest beauty lies in the space between lines, and this drawing is a masterful testament to that.",
    "Meh...",
  ]; // Array of words

  const [randomWord, setRandomWord] = useState(words[0]);
  const images = [PencilNeutral, PencilHappy]; // Array of images
  const [imageIndex, setImageIndex] = useState(0); // New state variable
  const [bubbleAnimation, setBubbleAnimation] = useState(false); // New state variable

  useEffect(() => {
    if (clickCount > 0 && clickCount % 3 === 0) {
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
          "text-xs",
          "sm:text-lg",
          "text-black",
          "w-fit",
          "rounded-md",
          "p-2",
          bubbleAnimation && "ani-bubble"
        )}
      >
        <span className="">{speech ? speech : randomWord}</span>
      </div>
    </div>
  );
}
