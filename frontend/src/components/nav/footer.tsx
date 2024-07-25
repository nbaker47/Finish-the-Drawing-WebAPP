import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import View from "./view.png";
import Draw from "./draw.png";
import Trophy from "./trophy.png";
import User from "./user.svg";

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
          "w-full",
          "max-w-screen-md",
          "mx-auto",
          "p-4"
          // "xs:w-3/12"
        )}
      >
        <div className="flex items-center justify-between">
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
                    className="w-12 h-12 md:w-14 md:h-14"
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
                    className="w-12 h-12 md:w-14 md:h-14"
                  />
                </Link>
              </div>
              {/* Hall of Fame */}
              <div className={clsx("icon-round-border", "bg-white")}>
                <Link href="/hall-of-fame">
                  <Image
                    src={Trophy}
                    alt="trophy"
                    width={40}
                    height={40}
                    className="w-12 h-12 md:w-14 md:h-14"
                  />
                </Link>
              </div>
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
            <div className="text-xs ml-0 xs:ml-36 sm:text-2xl  flex-row items-center justify-center hidden sm:flex">
              <div className="flex flex-row items-center justify-center">
                <Image
                  src={"/beaumont_studios_logo_transparent.png"}
                  alt="user"
                  width={40}
                  height={40}
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="w-min justify-center align-middle ">
                  <p className="font-exo text-black text-xs">
                    Beaumont Studios
                  </p>
                </div>
              </div>
              {/* vertical line */}
              <div className="h-10 w-[1px] bg-black mx-2"></div>
              <div className="flex flex-row items-center justify-center ">
                <p className="text-gray-800 font-extralight">
                  &copy; 2024 Finish the Drawing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
