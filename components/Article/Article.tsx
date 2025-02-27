import { IArticle } from "@/lib/definitions";
import styles from "./Article.module.css";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";
import ArticleCategory from "./ArticleCategory";
import Link from "next/link";
import formatDate from "@/lib/formatDate";

const Article = ({ article }: { article: IArticle }) => {
  const bg = `linear-gradient(
    to top,
    rgba(4, 48, 91, 0.75),
    rgba(64, 84, 102, 0.02)
  ), url(${article.image})`;

  const cardStyles =
    article.category === "match preview"
      ? {
          background: "#30353B",
        }
      : article.category === "match report"
      ? {
          background: "#01305b",
        }
      : {
          background: bg,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  const selected_categories = ["match preview", "match report"];

  return (
    <article
      className={clsx(styles.news__article, {
        [styles["with-bg"]]: !selected_categories.includes(article.category),
      })}
      style={cardStyles}
    >
      {article.match && selected_categories.includes(article.category) && (
        <div className={styles.match__teams}>
          <div className={styles["team__img-box"]}>
            <ImageComp
              image={article.match.home.logo}
              alt={article.match.home.name}
            />
          </div>
          <div className={styles["team__img-box"]}>
            <ImageComp
              image={article.match.away.logo}
              alt={article.match.away.name}
            />
          </div>
        </div>
      )}
      <div className={clsx(styles.article__body)}>
        <ArticleCategory category={article.category} />
        <h3>{article.title}</h3>
        <div className={clsx(styles["news__article-footer"])}>
          <p>{formatDate(article.createdAt)}</p>
          <Link
            href={`/news/${article.id}`}
            className={clsx(styles.article__link)}
          >
            Go
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
        </div>
      </div>
    </article>
  );
};

export default Article;
