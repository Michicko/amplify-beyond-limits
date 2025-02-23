import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

const CardBody = ({
  children,
  type,
}: {
  children: React.ReactElement;
  type: "tbody" | "div";
}) => {
  return type === "div" ? (
    <div className={clsx(styles.card__body)}>{children}</div>
  ) : (
    <tbody className={clsx(styles.card__body)}>{children}</tbody>
  );
};

export default CardBody;
