import Link from "next/link";
import styles from "./Switcher.module.css";
import clsx from "clsx";
import { ILink } from "@/lib/definitions";

const Switch = ({
  link,
  theme,
}: {
  link: ILink;
  theme: "theme-1" | "theme-2";
}) => {
  return (
    <Link href={link.href} className={clsx(styles.switch, styles[theme])}>
      {link.name}
    </Link>
  );
};

export default Switch;
