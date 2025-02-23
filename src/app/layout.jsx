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
  title: "Sigma Dubai",
  description: "",
  openGraph: {
    title: "Sigma Dubai",
    description: "",
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
