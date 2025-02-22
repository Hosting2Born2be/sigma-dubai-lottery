"use client";
import React from "react";
import styles from "./StayConnected.module.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import WhiteArrow from "@/icons/WhiteArrow";
import Image from "next/image";

const StayConnected = () => {
  return (
    <>
      <section className={styles.stayConnected}>
        <div className="container">
          <div className={styles.body}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Stay connected!
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Join our Telegram channel for live raffle updates.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Link href="https://t.me/+O2DTGj6u8MY5Y2Jk" target="_blank">
                Join <WhiteArrow />
              </Link>
            </motion.div>
          </div>
          <Image src="/images/plane.png" alt="plane" width={546} height={400} />
        </div>
      </section>
      <section className={styles.banner}>
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Meet us at Sigma Dubai and explore how Clarity Global can power your
            business payments!
          </motion.h2>
        </div>
      </section>
    </>
  );
};

export default StayConnected;
