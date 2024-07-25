import React from "react";
import Image from "next/image";
import TitlePNG from "./title.png";

export default function Title({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  return (
    <div className={`text-center custom-title ${className}`}>
      <Image
        src={TitlePNG}
        alt="logo"
        width={500}
        height={500}
        className="mx-auto mb-2"
      />
      <div className="ani-bounce-in">
        <span className="text-5xl">"{word}"</span>
      </div>
    </div>
  );
}
