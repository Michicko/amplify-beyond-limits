import Heading from "../Typography/Heading";
import PageLink from "../Typography/PageLink";
import styles from "./Section.module.css";
import clsx from "clsx";

const SectionHeader = ({
  heading,
  link,
  no_link,
  center,
  letterCase,
}: {
  heading: string;
  link?: { href: string; name: string };
  no_link?: boolean;
  center?: boolean;
  letterCase?: "upper" | "lower" | "capitalize";
}) => {
  return (
    <div className={clsx(styles.section__header, center && styles.center)}>
      <Heading level={2} text={heading} letterCase={letterCase} />
      {!no_link && link && <PageLink link={link} />}
    </div>
  );
};

export default SectionHeader;
