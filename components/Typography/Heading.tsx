import clsx from "clsx";
import styles from "./Typography.module.css";

const Heading = ({
  level,
  text,
  letterCase,
  color,
  center,
}: {
  level: number;
  text: string;
  letterCase?: "upper" | "lower" | "capitalize";
  color?: string;
  center?: boolean;
}) => {
  const classNames = clsx(
    styles.heading,
    `${styles["heading-" + level]}`,
    letterCase && styles[letterCase],
    center && styles.center,
  );
  return level === 1 ? (
    <h1 className={classNames}>{text}</h1>
  ) : level === 2 ? (
    <h2 className={classNames}>{text}</h2>
  ) : level === 3 ? (
    <h3 className={classNames}>{text}</h3>
  ) : (
    <h4 className={classNames}>{text}</h4>
  );
};

export default Heading;
