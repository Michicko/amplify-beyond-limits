import styles from "./page_header.module.css";

const PageHeader = ({
  image,
  title,
  lead,
}: {
  image: string;
  title: string;
  lead: string;
}) => {
  return (
    <div
      className={styles["page__header"]}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <h1>{title}</h1>
      <p>{lead}</p>
    </div>
  );
};

export default PageHeader;
