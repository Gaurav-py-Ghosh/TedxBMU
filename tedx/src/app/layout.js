import { Barlow } from "next/font/google";
import { Raleway } from "next/font/google";
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
});

export const metadata = {
  title: "TEDxBMU 2026",
  description: "Independently organized TED event at BML Munjal University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${raleway.variable}`}>
      <body suppressHydrationWarning className="bg-black antialiased">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}