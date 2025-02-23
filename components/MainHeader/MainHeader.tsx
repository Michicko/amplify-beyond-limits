import Image from "next/image";
import styles from "./Header.module.css";
import clsx from "clsx";
import React from "react";
import ImageComp from "../ImageComp/ImageComp";

const MainHeader = ({
  bg,
  alt,
  children,
}: {
  bg: string;
  alt: string;
  children: React.ReactElement;
}) => {
  return (
    <header className={styles.header}>
      <ImageComp image={bg} alt={alt} priority={true} />
      <div className={clsx(styles.header__content)}>{children}</div>
    </header>
  );
};

export default MainHeader;
