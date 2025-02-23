import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

const CardHeader = ({
  children,
  theme,
  border,
  type,
}: {
  children: React.ReactElement;
  theme: "dark" | "light" | "trans";
  border: boolean;
  type: "thead" | "div";
}) => {
  return type === "div" ? (
    <div
      className={clsx(styles.card__header, styles[theme], {
        [styles.border]: border,
      })}
    >
      {children}
    </div>
  ) : (
    <thead
      className={clsx(styles.card__header, styles[theme], {
        [styles.border]: border,
      })}
    >
      {children}
    </thead>
  );
};

export default CardHeader;
