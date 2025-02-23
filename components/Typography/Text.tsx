import clsx from "clsx";
import styles from "./Typography.module.css";

const Text = ({
  text,
  color,
  upper,
  size,
  center,
}: {
  text: string | number;
  color: string;
  upper?: boolean;
  center?: boolean;
  size?: "md" | "lg" | "sm" | "xs" | "tiny";
}) => {
  return (
    <p
      className={clsx(
        styles.text,
        styles[color],
        size && styles[size],
        center && styles.center,
        {
          [styles.upper]: upper,
        }
      )}
    >
      {text}
    </p>
  );
};

export default Text;
