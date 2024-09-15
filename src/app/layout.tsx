import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Color2Color - The Ultimate Color Converter", // More descriptive title
  description:
    "Effortlessly convert colors between Hex, RGB, HSL, CMYK, and more. Perfect for web developers, designers, and anyone working with colors.", // Expanded description with target audience
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl to rgb",
    "cmyk to rgb",
    "color conversion",
    "web development",
    "graphic design",
    "color tools",
  ], // Add relevant keywords for SEO
  openGraph: {
    // Enhance social media sharing
    title: "Color2Color - The Ultimate Color Converter",
    description:
      "Effortlessly convert colors between Hex, RGB, HSL, CMYK, and more. Perfect for web developers, designers, and anyone working with colors.",
    url: "https://yourwebsite.com/color2color", // Replace with your actual URL
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/color2color/og-image.png", // Replace with your actual image URL
        alt: "Color2Color - The Ultimate Color Converter",
      },
    ],
  },
  twitter: {
    // Optimize for Twitter cards
    card: "summary_large_image",
    title: "Color2Color - The Ultimate Color Converter",
    description:
      "Effortlessly convert colors between Hex, RGB, HSL, CMYK, and more. Perfect for web developers, designers, and anyone working with colors.",
    images: [
      "https://yourwebsite.com/color2color/twitter-image.png", // Replace with your actual image URL
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
