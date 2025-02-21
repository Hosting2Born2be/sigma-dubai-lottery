import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import Raffle from "@/components/Raffle/Raffle";
import StayConnected from "@/components/StayConnected/StayConnected";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Raffle />
      <StayConnected />
    </>
  );
}
