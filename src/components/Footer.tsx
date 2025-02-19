import React from "react";
import "./../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} - Mandoline</p>
      <a href="/about">À propos</a>
    </footer>
  );
};

export default Footer;