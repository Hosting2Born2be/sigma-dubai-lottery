import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import Logo from "@/icons/Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={"container"}>
        <div className={styles.body}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <nav className={styles.nav}>
            <Link href={"#features"}>Features</Link>
            <Link href={"#raffle"}>Raffle</Link>
          </nav>
          <Link href={"#raffle"} className={styles.button}>
            Join
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
