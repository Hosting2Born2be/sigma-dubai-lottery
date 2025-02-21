"use client";
import React from "react";
import styles from "./Raffle.module.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";

const Raffle = () => {
  return (
    <section className={styles.raffle}>
      <div className="container">
        <div className={styles.body}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Enter the Raffle – It's Simple!
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Your chance to win an exclusive prize! Just fill out the form below
            and you're in!
          </motion.p>
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Winners will be announced digitally at our booth
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default Raffle;
