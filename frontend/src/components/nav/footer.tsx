import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Footer() {
  return (
    <>
      <div
        className={clsx(
          "text-center",
          "flex",
          "justify-center",
          "bg-pokadot",
          "sticky",
          "bottom-1",
          //   "top-[95vh]",
          "z-50",
          "border-gray-700",
          "rounded-3xl",
          "border-2",
          "w-fit",
          "mx-auto",
          "px-5"
        )}
      >
        <div className="row justify-content-center flex p-2 gap-3">
          {/* HOME */}
          <div className={clsx("icon-round-border", "mr-2", "bg-white")}>
            <Link href="/draw">
              <Image src="/pencil-tip.png" alt="Home" width={40} height={40} />
            </Link>
          </div>
          {/* VIEW */}
          <div className={clsx("icon-round-border", "bg-white")}>
            <Link href="/view-today">
              <Image src="/visible.png" alt="View" width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
