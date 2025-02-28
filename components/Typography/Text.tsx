import clsx from "clsx";
import styles from "./Typography.module.css";

const Text = ({
  text,
  color,
  upper,
  size,
  center,
  hide_on_sm,
  thin,
  mb,
}: {
  text: string | number;
  color: string;
  upper?: boolean;
  center?: boolean;
  size?: "md" | "lg" | "sm" | "xs" | "tiny" | "base";
  hide_on_sm?: boolean;
  thin?: boolean;
  mb?: "md" | "lg" | "sm" | "xs";
}) => {
  return (
    <p
      className={clsx(
        styles.text,
        styles[color],
        size && styles[size],
        center && styles.center,
        hide_on_sm && styles["hide-on-sm"],
        thin && styles.thin,
        mb && styles[`mb-${mb}`],
        {
          [styles.upper]: upper,
        },
      )}
    >
      {text}
    </p>
  );
};

export default Text;
