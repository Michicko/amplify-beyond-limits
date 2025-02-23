import styles from "./Nav.module.css";
import clsx from "clsx";
import NavLink from "./NavLink";
import Logo from "../Logo/Logo";
import NavMenuBtn from "./NavMenuBtn";
import NavSearchBtn from "./NavSearchBtn";
import Text from "../Typography/Text";
import MenuBox from "../Menu/MenuBox";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const closeMenu = () => {
    setIsMenuOpened(false);
  };
  return (
    <>
      <MenuBox closeMenu={closeMenu} isOpened={isMenuOpened} />
      <div className={clsx(styles["nav__sm"])}>
        <div className={clsx(styles.left)}>
          <NavLink link={{ href: "/gallery", name: "gallery" }} />
          <NavLink link={{ href: "/fixture", name: "fixture" }} />
        </div>
        <Text
          text="Youth Development Program of Remo Stars FC"
          color="secondary"
        />
        <NavLink link={{ href: "/contact", name: "Contact us" }} />
      </div>
      <div className={clsx(styles["nav__main"])}>
        <NavMenuBtn setIsMenuOpened={setIsMenuOpened} />
        <Logo image="/images/nav-logo.svg" size="md" />
        <NavSearchBtn />
      </div>
    </>
  );
};

export default Nav;
