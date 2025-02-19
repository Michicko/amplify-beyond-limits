import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import Menu from "../Menu/Menu";

export default function Header() {
  const [scrollingUp, setScrollingUp] = useState(true); // Track scrolling direction
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // UseEffect to track global window scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // If scrolled up
        setScrollingUp(false);
      } else {
        // If scrolled down
        setScrollingUp(true);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Toggle menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuLinkClick = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 200); // Close the menu after 0.2 seconds
  };

  return (
    <div
      className={`${styles.headerContainer} ${
        menuOpen ? styles.Bopen : styles.Bclosed
      } ${scrollingUp ? styles.scrollingUp : ""}`}
    >
      <header className={styles.header}>
        {/* Top Bar */}
        <div className={`${styles.topheader}`}>
          <div className={styles.lefthead}>
            <div className={`${styles.navlinks} ${styles.odd}`}>
              <Link href="/gallery">GALLERY</Link>
            </div>
            <div className={`${styles.navlinks} ${styles.odd}`}>
              <Link href="/fixtures">FIXTURES</Link>
            </div>
          </div>
          <div className={styles.middlehead}>
            <h3>No LIMITS</h3>
          </div>
          <div className={styles.righthead}>
            <div className={styles.navlinks}>
              <Link href="/contact">CONTACT US</Link>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className={styles.navheader}>
          <div className={styles.lefthead}>
            <div className={styles.navicons}>
              <a onClick={toggleMenu}>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.747803"
                    y="3.05176e-05"
                    width="40.2092"
                    height="40"
                    rx="7"
                    fill="#F8F7F7"
                  />
                  <path
                    d="M8.53833 11.25V14.75H33.1665V11.25H8.53833ZM8.53833 18.25V21.75H33.1665V18.25H8.53833ZM8.53833 25.25V28.75H33.1665V25.25H8.53833Z"
                    fill="#327BC0"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.middlehead}>
            <Link href="/">
              <Image
                src="/images/beondimitslogo.png"
                alt="Logo"
                width={70}
                height={70}
                unoptimized
              />
            </Link>
          </div>
          <div className={styles.righthead}>
            <div className={styles.navicons}>
              <Link href="#">
                <Image
                  src="/images/search.svg"
                  alt="Search Icon"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Menu */}
      <div
        ref={menuRef}
        className={`${styles.menuContainer} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
        {/* Pass the closeMenu function to Menu */}
        <Menu closeMenu={handleMenuLinkClick} />
      </div>
    </div>
  );
}
