import { IArticle } from "./definitions";
import { match } from "./placeholder-data";

const populateArticles = (articles: IArticle[]) => {
  const updatedArticles = articles.map((el) => {
    if (el.match) {
      el.match = match;
      return el;
    }
    return el;
  });
  return updatedArticles;
};

export default populateArticles;
