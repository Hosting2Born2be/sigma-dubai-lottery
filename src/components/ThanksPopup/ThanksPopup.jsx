import ThanksIcon from "@/icons/ThanksIcon";
import WhiteArrow from "@/icons/WhiteArrow";
import React from "react";
import styles from "./ThanksPopup.module.scss";
import CloseIcon from "@/icons/CloseIcon";

const ThanksPopup = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.thanksPopup} ${isOpen ? styles.open : ""}`}>
      <div className={styles.thanksPopupContent}>
        <button onClick={onClose} className={styles.closeIcon}>
          <CloseIcon />
        </button>
        <ThanksIcon />
        <h2>You're in! </h2>
        <p>
          Your form has been successfully submitted. Stay tuned—winners will be
          announced soon!
          <br />
          Good luck!
        </p>
        <a href="/">
          Back to Homepage <WhiteArrow />
        </a>
      </div>
    </div>
  );
};

export default ThanksPopup;
