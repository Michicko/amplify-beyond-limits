import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

const CardBody = ({
  children,
  type,
  theme
}: {
  children: React.ReactElement;
  type: "tbody" | "div";
  theme: "dark" | "light" | "trans"
}) => {
  return type === "div" ? (
    <div className={clsx(styles.card__body, styles[theme])}>{children}</div>
  ) : (
    <tbody className={clsx(styles.card__body, styles[theme])}>{children}</tbody>
  );
};

export default CardBody;
