import React from "react";
import styles from "./Section.module.css";
import clsx from "clsx";

const Section = ({
  cols,
  children,
}: {
  cols: number;
  children: React.ReactElement;
}) => {
  return (
    <section className={clsx(styles.section, styles[`section-${cols}`])}>
      {children}
    </section>
  );
};

export default Section;
