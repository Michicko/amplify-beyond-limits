import styles from "./Article.module.css";
import clsx from "clsx";
import slugify from "slugify";

const ArticleCategory = ({ category }: { category: string }) => {
  return (
    <div className={clsx(styles.article__category, styles[slugify(category)])}>
      <p>{category}</p>
    </div>
  );
};

export default ArticleCategory;
