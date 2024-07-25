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
          //   "sticky",
          //   "bottom-0",
          "sticky top-[100vh]",
          "z-50",
          "border-t-2",
          "border-gray-700",
          "rounded-t-xl"
        )}
      >
        <div className="row justify-content-center flex p-2">
          {/* HOME */}
          <div className={clsx("icon-round-border", "mr-2")}>
            <Link href="/draw">
              <Image src="/pencil-tip.png" alt="Home" width={40} height={40} />
            </Link>
          </div>
          {/* VIEW */}
          <div className={clsx("icon-round-border")}>
            <Link href="/view-today">
              <Image src="/visible.png" alt="View" width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
