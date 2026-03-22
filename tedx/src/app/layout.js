import { Inter, Archivo } from "next/font/google"; // TEDx Brand Fonts (Inter as Helvetica substitute)
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TEDxBMU 2026",
    template: "%s | TEDxBMU 2026",
  },
  description: "Independently organized TED event at BML Munjal University", 
  applicationName: "TEDxBMU 2026",
  keywords: [
    "TEDxBMU",
    "TEDx",
    "BML Munjal University",
    "TED Talks",
    "Innovation",
    "Ideas Worth Spreading",
    "Conference",
    "Speakers",
    "Gurugram",
    "2026",
  ],
  authors: [{ name: "TEDxBMU" }],
  creator: "TEDxBMU",
  publisher: "TEDxBMU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TEDxBMU 2026",
    description: "Independently organized TED event at BML Munjal University",
    url: "/",
    siteName: "TEDxBMU 2026",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "TEDxBMU logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxBMU 2026",
    description: "Independently organized TED event at BML Munjal University",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivo.variable}`}>
      <body suppressHydrationWarning className="bg-black antialiased">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}