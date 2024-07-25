"use client";

import React from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  XIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

export default function Sharebar({ className }: { className?: string }) {
  const url = window.location.href;

  return (
    <div className={`flex flex-row gap-2 justify-center ${className}`}>
      <TwitterShareButton url={url}>
        <XIcon
          borderRadius={20}
          round={false}
          className="w-8 h-8 sm:w-11 sm:h-11"
        />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon
          borderRadius={20}
          round={false}
          className="w-8  h-8 sm:w-11 sm:h-11"
        />
      </FacebookShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon
          borderRadius={20}
          round={false}
          className="w-8  h-8 sm:w-11 sm:h-11"
        />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon
          borderRadius={20}
          round={false}
          className="w-8  h-8 sm:w-11 sm:h-11"
        />
      </WhatsappShareButton>
    </div>
  );
}
