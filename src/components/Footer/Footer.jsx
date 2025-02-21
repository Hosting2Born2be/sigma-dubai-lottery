import Logo from "@/icons/Logo";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
import Website from "@/icons/Website";
import Privacy from "@/icons/Privacy";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.col1}>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
            <p>Smart electronic moneysolution in your pocket.</p>
          </div>
          <div className={styles.col2}>
            <Link href="https://clarityglobalinc.com">
              <Website />
              Our Website
            </Link>
            <Link href="https://clarityglobalinc.com/privacy-policy.html">
              <Privacy />
              Our Privacy
            </Link>
          </div>
        </div>
        <div className={styles.copyright}>
          © {currentYear} Clarity Global Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
