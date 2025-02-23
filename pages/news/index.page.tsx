import GuestLayout from "@/components/GuestLayout/GuestLayout";
import React, { useState } from "react";
import { ReactElement } from "react";
import { IArticle } from "@/lib/definitions";
import PageTitle from "@/components/PageHeader/PageTitle";
import { articles, match } from "@/lib/placeholder-data";
import ArticleList from "@/components/Article/ArticleList";
import populateArticles from "@/lib/populateArticle";

const News = ({ articles }: { articles: IArticle[] }) => {
  return (
    <>
      <PageTitle text={"Articles"} />
      <div className="main-container">
        <ArticleList articles={populateArticles(articles)} />
        {/* pagination */}
      </div>
    </>
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
