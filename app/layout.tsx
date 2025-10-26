import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WearEver - Fairytale Clothing Exchange",
  description: "A magical platform for cashless clothing trades on campus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
