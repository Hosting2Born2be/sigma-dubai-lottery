"use client";
import React from "react";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import styles from "./Features.module.scss";

const Features = () => {
  return (
    <section className={styles.features} id="features">
      <div className={"container"}>
        <div className={styles.body}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.item}
          >
            <img src="/images/feature1.svg" alt="Fast & Efficient" />
            <h3>Fast & Efficient</h3>
            <p>Seamless transactions in 180+ regions.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.item}
          >
            <img src="/images/feature2.svg" alt="Multi-currency support" />
            <h3>Multi-currency support</h3>
            <p>Manage payments in 30+ currencies.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.item}
          >
            <img src="/images/feature3.svg" alt="Transparent pricing" />
            <h3>Transparent pricing</h3>
            <p>No hidden fees, only competitive rates.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.item}
          >
            <img src="/images/feature4.svg" alt="Secure & compliant" />
            <h3>Secure & compliant</h3>
            <p>Fully regulated for peace of mind.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.item}
          >
            <img src="/images/feature5.svg" alt="Business-focused" />
            <h3>Business-focused</h3>
            <p>Tailored accounts, optimized flows.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
