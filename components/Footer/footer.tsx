import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css"; // Assuming this CSS module file exists
import Link from "next/link";
import Socials from "../Social/Socials";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/images/footerlogo.png"
          alt="Beyond Limits FA Logo"
          width={100}
          height={100}
          unoptimized
        />
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link href="/contact">Contact Us</Link>
        <Link href="/legal">Legal</Link>
        <Link href="/terms-conditions">Terms & Conditions</Link>
        <Link href="/confidentiality">Confidentiality</Link>
      </div>

      {/* Social Icons */}
      <Socials />

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>Beyond Limits FA © 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
