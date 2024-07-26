"use client";

import React, { useEffect } from "react";
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
  const [url, setUrl] = React.useState("5");

  useEffect(() => {
    console.log("Sharebar mounted");
    const url = window.location.href;
    setUrl(url);
    return () => {
      console.log("Sharebar unmounted");
    };
  }, []);

  return (
    <div className={`flex flex-row gap-2 justify-center ${className}`}>
      <TwitterShareButton url={url}>
        <XIcon borderRadius={20} round={false} className="w-8 h-8 " />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon borderRadius={20} round={false} className="w-8 h-8 " />
      </FacebookShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon borderRadius={20} round={false} className="w-8 h-8 " />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon borderRadius={20} round={false} className="w-8 h-8 " />
      </WhatsappShareButton>
    </div>
  );
}
