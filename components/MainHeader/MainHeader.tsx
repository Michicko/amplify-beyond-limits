import styles from "./Header.module.css";
import clsx from "clsx";
import React from "react";
import ImageComp from "../ImageComp/ImageComp";

const MainHeader = ({
  bg,
  alt,
  children,
  overlay,
}: {
  bg: string;
  alt: string;
  children: React.ReactElement;
  overlay?: boolean;
}) => {
  return (
    <header className={clsx(styles.header, overlay && styles.overlay)}>
      <ImageComp image={bg} alt={alt} priority={true} />
      <div className={clsx(styles.header__content)}>{children}</div>
    </header>
  );
};

export default MainHeader;
