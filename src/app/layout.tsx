import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cyberxp.be"),
  title: "CyberXP",
  description: "CyberXP | Live a real Cyber Experience",
  openGraph: {
    type: "website",
    title: "CyberXP",
    description: "CyberXP | Live a real Cyber Experience",
    siteName: "CyberXP",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberXP",
    description: "CyberXP | Live a real Cyber Experience",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
