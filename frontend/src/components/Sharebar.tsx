"use client";

import React from "react";
// import {
//   TwitterShareButton,
//   FacebookShareButton,
//   TelegramShareButton,
//   WhatsappShareButton,
//   XIcon,
//   FacebookIcon,
//   TelegramIcon,
//   WhatsappIcon,
// } from "react-share";

export default function Sharebar({ className }: { className?: string }) {
  const url = window.location.href;

  return (
    <div className={`flex flex-row gap-2 justify-center ${className}`}>
      {/* <TwitterShareButton url={url}>
        <XIcon borderRadius={20} size={25} round={false} />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon borderRadius={20} size={25} round={false} />
      </FacebookShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon borderRadius={20} size={25} round={false} />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon borderRadius={20} size={25} round={false} />
      </WhatsappShareButton> */}
      <div className="a2a_kit a2a_kit_size_20 a2a_default_style">
        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
        <a className="a2a_button_facebook icon-shrink"></a>
        <a className="a2a_button_x icon-shrink"></a>
        <a className="a2a_button_whatsapp icon-shrink"></a>
        <a className="a2a_button_snapchat icon-shrink"></a>
        <a className="a2a_button_copy_link icon-shrink"></a>
        <a className="a2a_button_sms icon-shrink"></a>
      </div>
      <script async src="https://static.addtoany.com/menu/page.js"></script>
    </div>
  );
}
