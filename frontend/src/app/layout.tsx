import type { Metadata } from "next";
import { Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import "./backgrounds.css";
import "./animations.css";
import Footer from "@/components/nav/footer";

const font = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finish the Drawing!",
  description: "Daily competitions to finish the drawing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-lined min-h-screen flex flex-col h-screen justify-between`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
