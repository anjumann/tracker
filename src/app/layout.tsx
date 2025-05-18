import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/sections/theme-provider";
import { APP_NAME } from "@/constant";
import { MainSidebar } from "@/components/sections/MainSidebar";
import { ModeToggle } from "@/components/sections/mode-toggle";

const fredoka = localFont({
  src: [
    {
      path: "../fonts/Fredoka-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fredoka",
  display: "swap",
});

const walterTurncoat = localFont({
  src: [
    {
      path: "../fonts/WalterTurncoat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-walter-turncoat",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A comprehensive task manager application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${walterTurncoat.variable} antialiased font-walter-turncoat font-fredoka`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MainSidebar>
            <div className="flex flex-col w-full">
              <div className="flex justify-end py-2">
                <ModeToggle />
              </div>
              <div className="w-full">
                {children}
              </div>
            </div>
          </MainSidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
