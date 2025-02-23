import Switch from "./Switch";
import styles from "./Switcher.module.css";
import clsx from "clsx";

const Switcher = ({
  links,
  theme,
  bg,
}: {
  links: { href: string; name: string }[];
  theme: "theme-1" | "theme-2";
  bg: "trans" | "white";
}) => {
  return (
    <div className={clsx(styles.switcher, styles[bg], styles[theme])}>
      {links.map((link) => {
        return <Switch link={link} theme={theme} />;
      })}
    </div>
  );
};

export default Switcher;
