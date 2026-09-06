import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Quick Solutions | IT Infrastructure Support & Managed Services",
  description:
    "End-to-end IT infrastructure support for businesses across India and 100+ countries — powered by 24x7x365 operations, 500+ engineers and multi-vendor expertise.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
