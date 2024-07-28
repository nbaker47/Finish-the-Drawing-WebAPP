"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import View from "./view.png";
import Draw from "./draw.png";
import Trophy from "./trophy.png";
// import User from "./user.svg";

export default function Footer() {
  const [drawClicked, setDrawClicked] = React.useState(false);
  const [viewClicked, setViewClicked] = React.useState(false);

  return (
    <>
      <div
        className={clsx(
          "text-center",
          "flex",
          "justify-center",
          "bg-pokadot",
          "sticky",
          "bottom-2",
          //   "top-[95vh]",
          "z-50",
          "border-gray-700",
          "rounded-3xl",
          "border-2",
          "mx-auto",
          "py-4",
          "px-4",
          "w-[95%]",
          "h-[10vh]",
          "sm:w-[78vw]",
          "sm:px-12",
          // "md:w-[40%]",
          // "w-[50vw]",
          "lg:w-[50vw]"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* HOME */}
            <div className={clsx("icon-round-border", "bg-white")}>
              <Link href="/draw">
                <Image
                  src={Draw}
                  alt="Home"
                  width={40}
                  height={40}
                  id="draw"
                  className={`w-12 h-12 md:w-14 md:h-14 ${
                    drawClicked ? "ani-bubble" : ""
                  }`}
                  onClick={() => setDrawClicked(!drawClicked)}
                />
              </Link>
            </div>
            {/* VIEW */}
            <div className={clsx("icon-round-border", "bg-white")}>
              <Link href="/view-today">
                <Image
                  src={View}
                  alt="View"
                  width={40}
                  height={40}
                  id="view"
                  className={`w-12 h-12 md:w-14 md:h-14 ${
                    viewClicked ? "ani-bubble" : ""
                  }`}
                  onClick={() => setViewClicked(!viewClicked)}
                />
              </Link>
            </div>
            {/* Hall of Fame */}
            {/* <div className={clsx("icon-round-border", "bg-white")}>
                <Link href="/hall-of-fame">
                  <Image
                    src={Trophy}
                    alt="trophy"
                    width={40}
                    height={40}
                    className="w-12 h-12 md:w-14 md:h-14"
                  />
                </Link>
              </div> */}
            {/* User */}
            {/* <div className={clsx("icon-round-border", "bg-white")}>
              <Link href="/user">
                <Image
                  src={User}
                  alt="user"
                  width={40}
                  height={40}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg"
                />
              </Link>
            </div> */}
          </div>

          {/* Copyright marker */}
          <div className="text-xs ml-3 sm:ml-14  sm:text-2xl  flex-row items-center justify-center flex">
            <div className="flex flex-row items-center justify-center">
              <img
                src={"/beaumont_studios_logo_transparent.png"}
                alt="user"
                className="w-[40px] h-[40px] rounded-lg object-cover"
              />
              <div className="w-min justify-center align-middle ml-1 mr-2">
                <p className="font-exo text-black text-xs">Beaumont Studios</p>
              </div>
            </div>
            {/* vertical line */}
            <div className="h-10 w-[1px] bg-black mx-2 hidden sm:flex"></div>
            <div className="flex-row items-center justify-center hidden sm:flex ">
              <p className="text-neutral-800 font-extralight ml-2">
                Finish the Drawing &copy;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
