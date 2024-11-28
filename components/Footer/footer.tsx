import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css'; // Assuming this CSS module file exists

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image src="/images/footerlogo.png" alt="Beyond Limits FA Logo" width={100} height={100} unoptimized/>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <a href="/contact">Contact Us</a>
        <a href="#">Legal</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Confidentiality</a>
      </div>

      {/* Social Icons */}
      <div className={styles.socials}>
              <a href='https://x.com/beyond_limitsfa?s=11&t=a_AA_bkBcHWDpD2WBldopQ' target='_blank'>
              <Image
                src="/images/pajamas_twitter.svg"
                alt="Twitter"
                width={30}
                height={30}
              /></a>
                <a href='https://www.instagram.com/beyondlimits_fa?igsh=MXdiM3gwaTBkNGd5Yg==' target='_blank'>
              <Image
                src="/images/bi_instagram.svg"
                alt="Instagram"
                width={30}
                height={30}
              /></a>
                <a href='' target='_blank'>
              <Image
                 src="/images/ph_tiktok-logo.svg"
                alt="TikTok"
                width={30}
                height={30}
              /></a>
                <a href='https://youtube.com/@beyondlimitsfootballacadem7276?si=UrDiLOAy9c6j8jDM' target='_blank'>
              <Image
                 src="/images/ant-design_youtube-outlined.svg"
                alt="YouTube"
                width={30}
                height={30}
              /></a>
             
            </div>


      {/* Copyright */}
      <div className={styles.copyright}>
        <p>Beyond Limits FA © 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;