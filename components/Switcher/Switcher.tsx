import styles from "./Switcher.module.css";
import clsx from "clsx";

const Switcher = ({
  theme,
  bg,
  children,
}: {
  theme: "theme-1" | "theme-2";
  bg: "trans" | "white";
  children: React.ReactElement;
}) => {
  return (
    <div className={clsx(styles.switcher__container)}>
      <div className={clsx(styles.switcher, styles[bg], styles[theme])}>
        {children}
      </div>
    </div>
  );
};

export default Switcher;
