import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
