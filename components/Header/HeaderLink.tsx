import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

const HeaderLink = ({ link }: { link: { href: string; name: string } }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Link
      href={link.href}
      className={pathname === link.href ? styles.current : ""}
    >
      {link.name}
    </Link>
  );
};

export default HeaderLink;
