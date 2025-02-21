"use client";
import React from "react";
import styles from "./Hero.module.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import WhiteArrow from "@/icons/WhiteArrow";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={"container"}>
        <div className={styles.body}>
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.label}
          >
            Sigma Dubai
          </motion.span>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.title}
          >
            Win Big with Clarity Global
            <br />
            at Sigma Dubai!
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Clarity Global: Smart, Secure, and Seamless Payments for Your
            Business
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link href="#raffle" className={styles.button}>
              Enter the Raffle <WhiteArrow />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
