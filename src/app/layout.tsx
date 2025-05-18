import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/sections/theme-provider";
import { APP_NAME } from "@/constant";
import { MainSidebar } from "@/components/sections/MainSidebar";
import { ModeToggle } from "@/components/sections/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
