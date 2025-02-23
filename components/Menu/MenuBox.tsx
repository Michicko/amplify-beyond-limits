import { useEffect } from "react";
import Menu from "./Menu";
import styles from "./Menu.module.css";
import clsx from "clsx";

const MenuBox = ({
  closeMenu,
  isOpened,
}: {
  closeMenu: () => void;
  isOpened: boolean;
}) => {
  const closeMenuOnMenuBoxClicked = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLDivElement;
    if (target === currentTarget) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened]);

  return (
    <div
      className={clsx(styles.menu__box, {
        [styles.open]: isOpened,
      })}
      onClick={closeMenuOnMenuBoxClicked}
    >
      <Menu closeMenu={closeMenu} />
    </div>
  );
};

export default MenuBox;
