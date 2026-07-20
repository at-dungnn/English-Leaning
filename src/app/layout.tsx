import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Body: clean, readable (full Vietnamese support).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// Heading: friendly, designed for Vietnamese.
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EnglishLeaning — Học từ vựng tiếng Anh thông minh",
    template: "%s | EnglishLeaning",
  },
  description:
    "Nền tảng học từ vựng tiếng Anh cho người Việt: flashcard, ôn tập giãn cách (SRS), luyện TOEIC & IELTS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${jakarta.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
