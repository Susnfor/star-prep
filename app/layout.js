import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InterviewProvider } from "./context/InterviewContext";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Star Prep ",
  description: "Preparation for Situation, Task, Action, Result (STAR) Styled Interviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <InterviewProvider>{children}</InterviewProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
