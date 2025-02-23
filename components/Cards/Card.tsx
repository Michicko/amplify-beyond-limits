import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

const Card = ({
  children,
  radius,
  theme,
}: {
  children: React.ReactElement;
  radius?: boolean;
  theme: "dark" | "light" | "trans";
}) => {
  return (
    <div
      className={clsx(styles.card, styles[theme], {
        [styles.radius]: radius,
      })}
    >
      {children}
    </div>
  );
};

export default Card;
