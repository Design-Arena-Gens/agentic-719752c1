import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Stock Analyzer - Strong Buy Stocks Under ₹50",
  description: "AI-powered stock analysis for Indian market stocks under ₹50 with 2-day growth potential",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
