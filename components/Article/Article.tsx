import Link from "next/link";
import styles from "./Article.module.css";
import { IArticle } from "@/lib/definitions";
import Image from "next/image";
import loaderProp from "@/lib/imageLoader";

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
        <Image
          src={article.image}
          fill={true}
          alt="Picture of the author"
          className={styles["article__img"]}
          style={{ objectFit: "cover" }}
          loader={loaderProp}
          unoptimized
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <hr />
        <div className={styles.article__footer}>
          <p className={styles.newsDate}>
            {new Date(article.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h4 className={styles.link}>Go →</h4>
        </div>
      </div>
    </Link>
  );
};

export default Article;
