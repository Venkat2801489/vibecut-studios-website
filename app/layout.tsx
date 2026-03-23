import type { Metadata } from "next";
import "./globals.css";
import WhatsAppChat from "@/components/WhatsAppChat";

export const metadata: Metadata = {
  title: "Vibecut Studios | Premium Instagram Reels Agency",
  description: "Vibecut Studios — India's leading video-first content creation agency. We craft viral Instagram Reels for boutiques, bridal brands, real estate, healthcare, and more.",
  keywords: "Instagram Reels, video content agency, Vibecut Studios, social media marketing, reel production",
  openGraph: {
    title: "Vibecut Studios | Premium Instagram Reels Agency",
    description: "Video-first content creation that drives real business growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
          id="google-fonts-syne"
        />
      </head>
      <body>
        {children}
        <WhatsAppChat />
      </body>
    </html>
  );
}
