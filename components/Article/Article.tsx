import Link from "next/link";
import styles from "./Article.module.css";
import { IArticle } from "@/lib/definitions";
import ImageComp from "../ImageComp/ImageComp";
import formatDate from "@/lib/formatDate";
import Text from "../Typography/Text";

const Article = ({
  article,
  responsive,
}: {
  article: IArticle;
  responsive?: boolean;
}) => {
  return (
    <Link
      href={`/news/${article.id}`}
      className={`${
        responsive ? `${styles.article} ${styles.responsive}` : styles.article
      }`}
    >
      <div className={styles["img-wrapper"]}>
        <ImageComp image={article.image} alt={article.title} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <hr />
        <div className={styles.article__footer}>
          <Text
            upper={false}
            text={formatDate(article.createdAt)}
            color="light"
            size="tiny"
            center={false}
          />
          <h4 className={styles.link}>Go →</h4>
        </div>
      </div>
    </Link>
  );
};

export default Article;
