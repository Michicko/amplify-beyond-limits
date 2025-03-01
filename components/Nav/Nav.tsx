import styles from "./Nav.module.css";
import clsx from "clsx";
import NavLink from "./NavLink";
import Logo from "../Logo/Logo";
import NavMenuBtn from "./NavMenuBtn";
import NavSearchBtn from "./NavSearchBtn";
import Text from "../Typography/Text";
import MenuBox from "../Menu/MenuBox";
import { useState } from "react";
import Search from "../Search/Search";

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const closeMenu = () => {
    setIsMenuOpened(false);
  };
  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);

  const openSearchBar = () => {
    setIsSearchBarOpened(true);
  };

  return (
    <>
      <Search isOpened={isSearchBarOpened} setIsOpened={setIsSearchBarOpened} />
      <MenuBox closeMenu={closeMenu} isOpened={isMenuOpened} />
      <div className={clsx(styles["nav__sm"])}>
        <div className={clsx(styles.left)}>
          <NavLink link={{ href: "/gallery", name: "gallery" }} />
          <NavLink link={{ href: "/fixtures", name: "fixtures" }} />
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
        <NavSearchBtn handleOnClick={openSearchBar} />
      </div>
    </>
  );
};

export default Nav;
