import React from "react";
import Image from "next/image";
import PencilHappy from "./pencil_happy.png";
import clsx from "clsx";

export default function PencilMan({ className }: { className?: string }) {
  return (
    <div className={clsx(className)}>
      <div className="flex flex-row gap-0">
        <div className="p-0 text-left">
          <Image src={PencilHappy} alt="Pencil" width={40} height={40} />
        </div>
        <div className="w-11/12 text-left pl-2">
          <div
            className={clsx(
              "border-2",
              "border-black",
              "text-left",
              "p-1.5",
              "bg-white",
              "rounded-t-3xl",
              "rounded-r-3xl",
              "text-xs",
              "text-black",
              "bubble-animation",
              "max-w-fit"
            )}
          >
            <span className="">Be Creative!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
