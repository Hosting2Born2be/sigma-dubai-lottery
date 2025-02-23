import { Montserrat } from "next/font/google";
import "./globals.scss";
import localFont from "next/font/local";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
const mont = localFont({
  src: [
    {
      path: "./fonts/Mont-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mont-Regular.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Mont-SemiBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Mont-Bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata = {
  title:
    "Clarity Global at Sigma Dubai: Smart, Secure & Seamless Payment Solutions",
  description:
    "Join our raffle at Sigma Dubai and discover how Clarity Global’s fast, efficient, and secure payment solutions can empower your business. Enjoy multi-currency support, transparent pricing, and full compliance - all designed for your success!",
  openGraph: {
    title:
      "Clarity Global at Sigma Dubai: Smart, Secure & Seamless Payment Solutions",
    description:
      "Join our raffle at Sigma Dubai and discover how Clarity Global’s fast, efficient, and secure payment solutions can empower your business. Enjoy multi-currency support, transparent pricing, and full compliance - all designed for your success!",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: mont.style.fontFamily }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
