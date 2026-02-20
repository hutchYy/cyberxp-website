import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberXP - Cybersecurity for SMEs",
  description:
    "Get up to speed with Cybersecurity for SMEs. Be inspired by thought-provoking keynotes, workshops, and networking opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
