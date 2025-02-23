import Link from "next/link";
import styles from "./Nav.module.css";
import clsx from "clsx";
import { useRouter } from "next/router";

const NavLink = ({ link }: { link: { href: string; name: string } }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Link
      href={link.href}
      className={clsx(styles.nav__link, {
        [styles.active]: pathname === link.href,
      })}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;
