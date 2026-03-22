import { Inter, Archivo } from "next/font/google"; // TEDx Brand Fonts (Inter as Helvetica substitute)
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

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
  title: "TEDxBMU 2026",
  description: "Independently organized TED event at BML Munjal University",
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