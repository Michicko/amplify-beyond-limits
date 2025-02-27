import styles from "./Header.module.css";
import clsx from "clsx";
import React from "react";
import ImageComp from "../ImageComp/ImageComp";

const MainHeader = ({
  bg,
  alt,
  children,
  overlay,
  loadingScreen,
}: {
  bg: string;
  alt: string;
  children: React.ReactElement;
  overlay?: boolean;
  loadingScreen?: boolean;
}) => {
  return (
    <header
      className={clsx(
        styles.header,
        overlay && styles.overlay,
        loadingScreen && styles.loading,
      )}
    >
      {!loadingScreen && <ImageComp image={bg} alt={alt} priority={true} />}
      <div className={clsx(styles.header__content)}>{children}</div>
    </header>
  );
};

export default MainHeader;
