import { IArticle } from "@/lib/definitions";
import NewsArticle from "./NewsArticle";
import styles from "./Article.module.css";
import clsx from "clsx";

const ArticleList = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div className={clsx(styles.articles)}>
      {articles.map((article) => {
        return <NewsArticle article={article} key={article.id} />;
      })}
    </div>
  );
};

export default ArticleList;
