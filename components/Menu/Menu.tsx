import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import Link from "next/link";
import MenuLinks from "./MenuLinks";
import MenuBtn from "./MenuBtn";
import CloseBtn from "./CloseBtn";
import { useRouter } from "next/router";
import Socials from "../Social/Socials";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";

export default function Menu({ closeMenu }: { closeMenu: () => void }) {
  const router = useRouter();
  const { pathname } = router;
  const getIndex = () => {
    return MenuLinks.findIndex((el) => el.innerLinks.includes(pathname));
  };
  const [activeTab, setActiveTab] = useState(getIndex() < 0 ? 0 : getIndex());
  const currentMenu = MenuLinks[activeTab];

  // Function to change the active tab
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={clsx(styles.menu)}>
      <div className={styles.menuContainer}>
        <div className={styles.menuItem}>
          {/* Close button now calls closeMenu */}
          <CloseBtn closeMenu={closeMenu} />
          {/* links */}
          <div className={styles.menuTab}>
            <div className={styles.menuLinks}>
              {MenuLinks.map((el, i) => {
                const link = {
                  name: el.name,
                  icon: el.icon,
                };
                return (
                  <MenuBtn
                    link={link}
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                    index={i}
                    key={el.id}
                  />
                );
              })}
            </div>
            {/* sub menus */}
            <div className={styles.menuSubLinks}>
              <div
                className={`${styles.menuSubLink} ${
                  styles["menu-" + currentMenu.subMenu.length]
                }`}
              >
                {currentMenu.subMenu.map((el) => {
                  return (
                    <Link
                      href={el.link}
                      className={
                        pathname === el.link
                          ? `${styles.menuSubLinkBody} ${styles.current}`
                          : styles.menuSubLinkBody
                      }
                      style={{
                        background: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url('${el.image}')`,
                      }}
                      onClick={closeMenu}
                      key={el.id}
                      as={el.link}
                    >
                      <p>{el.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.menuText}>
          <div className={styles.logo}>
            <ImageComp
              alt="Beyond Limits FA Logo"
              image="/images/bright-logo.png"
              placeholder="/images/bright-logo.png"
              priority={true}
            />
          </div>
          <section className={styles.menuInterlude}>
            <p>
              At Beyond Limits Football Academy, we believe in more than just
              developing exceptional football talent; we strive to shape
              responsible, empowered individuals who contribute positively to
              society. As the juniors of the esteemed Remo Stars in the Nigerian
              Professional Football League, we take pride in our commitment to
              community development.
            </p>
          </section>
          <div className={styles.menuTextBottom}>
            {/* socials */}
            <Socials />
            {/* Copyright */}
            <div className={styles.menuCopyright}>
              <p>Beyond Limits FA © 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
