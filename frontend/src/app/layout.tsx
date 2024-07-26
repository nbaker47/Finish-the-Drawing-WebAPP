import type { Metadata } from "next";
import { Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import "./backgrounds.css";
import "./animations.css";
import Footer from "@/components/nav/footer/Footer";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import clsx from "clsx";

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
      <body className={`${font.className}`}>
        <AnimatedBackground>
          <div className="min-h-screen flex flex-col h-screen justify-between">
            <main
              className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "w-screen",
                "flex-grow",
                "pt-1"
              )}
              // style={{ maxHeight: "calc(100vh - 1rem)" }}
            >
              {children}
            </main>

            <Footer />
          </div>
        </AnimatedBackground>
      </body>
    </html>
  );
}
