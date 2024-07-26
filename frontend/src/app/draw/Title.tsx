"use client";

import React, { useState } from "react";
import Image from "next/image";
import TitlePNG from "./title.png";
// @ts-ignore
import MovingText from "react-moving-text";

const AnimationsForChaining = [
  "swing",
  "bounce",
  "swing",
  "bounce",
  "swing",
  "bounce",
  "swing",
  "bounce",
];

export default function Title({
  word,
  wordClassName,
  className,
}: {
  word: string;
  wordClassName?: string;
  className?: string;
}) {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationType, setAnimationType] = useState(AnimationsForChaining[0]);

  const handleChainAnimation = () => {
    setAnimationIndex(animationIndex + 1);
    setAnimationType(AnimationsForChaining[animationIndex + 1]);
  };

  return (
    <div className={`text-center ${className}`}>
      <Image
        src={TitlePNG}
        alt="logo"
        width={500}
        height={500}
        className="mx-auto mb-2"
      />
      <div className="ani-bounce-in">
        <span
          className={`text-5xl sm:text-6xl text-stroke font-bold ${wordClassName}`}
          style={{ color: "#FBFB04" }}
        >
          <MovingText
            onAnimationEnd={handleChainAnimation}
            type={animationType}
            duration="1000ms"
            delay="10s"
            direction="normal"
            timing="ease"
            iteration="2"
            fillMode="none"
          >
            &quot;{word}&quot;
          </MovingText>
        </span>
      </div>
    </div>
  );
}
