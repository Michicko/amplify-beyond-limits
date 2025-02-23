import Link from "next/link";
import clsx from "clsx";
import styles from "./Typography.module.css";

const PageLink = ({ link }: { link: { name: string; href: string } }) => {
  return (
    <Link href={link.href} className={clsx(styles.link)}>
      {link.name}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 404.39"
      >
        <path
          fillRule="nonzero"
          d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
        />
      </svg>
    </Link>
  );
};

export default PageLink;
