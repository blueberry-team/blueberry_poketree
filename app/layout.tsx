import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Container from "@/features/shared/components/Container/Container";
import { Header } from "@/features/shared/components/Header/Header";
import { LanguageProvider } from "@/features/shared/utils/translate/useLanguage";
import { AuthInitializer } from "@/features/signup-or-go/stores/AuthInitializer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FirebaseAnalytics } from "./FirebaseAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const pfStardust = localFont({
  src: [
    {
      path: "../assets/fonts/PFStardust3.0.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PFStardust3.0Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/PFStardust3.0ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pf-stardust",
});

const pixelMplus = localFont({
  src: [
    {
      path: "../assets/fonts/PixelMplus/PixelMplus12-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PixelMplus/PixelMplus12-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/PixelMplus/PixelMplus12-Extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pixel-mplus",
});

export const metadata: Metadata = {
  title: "PokéTree",
  applicationName: "PokéTree",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  description: "Christmas Event with Pokémon",
  icons: {
    icon: "/icon.webp",
  },
  openGraph: {
    title: "PokéTree",
    description: "Christmas Event with Pokémon",
    images: [
      {
        url: "/og-image.webp", // 또는 원하는 이미지 경로
        width: 1200,
        height: 630,
        alt: "PokéTree",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéTree",
    description: "Christmas Event with Pokémon",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} ${pfStardust.variable} ${pixelMplus.variable} antialiased`}
      >
        <AuthInitializer />
        <LanguageProvider>
          <Container>
            <Header />
            {children}
          </Container>
        </LanguageProvider>
        <GoogleAnalytics gaId="G-XQ786LV8BS" />
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
