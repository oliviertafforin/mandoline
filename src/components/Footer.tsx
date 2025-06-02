import React from "react";
import styles from "./../styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} - Mandoline</p>
      <a href="/about">À propos</a>
    </footer>
  );
};

export default Footer;