import Link from "next/link";
import styles from "./Switcher.module.css";
import clsx from "clsx";
import { ILink } from "@/lib/definitions";
import { useRouter } from "next/router";

const LinkSwitch = ({
  link,
  theme,
}: {
  link: ILink;
  theme: "theme-1" | "theme-2";
}) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Link
      href={link.href}
      className={clsx(styles.switch, styles[theme], {
        [styles.current]: pathname === link.href,
      })}
    >
      {link.name}
    </Link>
  );
};

export default LinkSwitch;
