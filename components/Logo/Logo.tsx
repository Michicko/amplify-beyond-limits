import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";
import clsx from "clsx";
import imageLoader from "@/lib/imageLoader";
import ImageComp from "../ImageComp/ImageComp";

const Logo = ({
  image,
  size,
}: {
  image: string;
  size: "sm" | "base" | "md";
}) => {
  return (
    <Link href={"/"} className={clsx(styles.logo, styles[size])} as={"image"}>
      <ImageComp
        image={image}
        alt={"Logo for Beyond the limits"}
        priority={true}
      />
    </Link>
  );
};

export default Logo;
