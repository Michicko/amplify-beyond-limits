import GuestLayout from "@/components/GuestLayout/GuestLayout";
import React from "react";
import { ReactElement } from "react";
import { IArticle } from "@/lib/definitions";
import { articles } from "@/lib/placeholder-data";
import ArticleList from "@/components/Article/ArticleList";
import populateArticles from "@/lib/populateArticle";
import ArticleLayout from "@/components/Layouts/ArticleLayout";

const News = ({ articles }: { articles: IArticle[] }) => {
  const links = [
    { name: "Academy news", href: "/news" },
    { name: "Beyon limits tv", href: "/beyond-tv" },
  ];

  return (
    <ArticleLayout links={links} theme="theme-1" bg="trans">
      <div className="main-container">
        <ArticleList articles={populateArticles(articles)} />
        {/* pagination */}
      </div>
    </ArticleLayout>
  );
};

News.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

// Sample data fetching
export async function getServerSideProps() {
  const res_articles = articles;

  return { props: { articles: res_articles } };
}

export default News;
