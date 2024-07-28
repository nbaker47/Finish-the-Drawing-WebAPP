import React from "react";
import Image from "next/image";
import TitlePNG from "./todays_submissions.png";

function Title({ className }: { className?: string }) {
  return (
    <div className={`text-center px-2 ${className}`}>
      <Image
        src={TitlePNG}
        alt="logo"
        width={500}
        height={500}
        className="mx-auto mb-2"
      />
    </div>
  );
}

export default Title;
