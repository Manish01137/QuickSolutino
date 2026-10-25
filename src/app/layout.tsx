import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { BackToTop } from "@/components/BackToTop";
import { MotionProvider } from "@/components/MotionProvider";
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

export const viewport: Viewport = {
  themeColor: "#0b1b3a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-white text-[var(--color-ink)]">
        {/* Runs during HTML parsing, before the loader below paints, so repeat visits skip the intro without a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("qs-intro"))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`,
          }}
        />
        <MotionProvider>
          <Preloader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
