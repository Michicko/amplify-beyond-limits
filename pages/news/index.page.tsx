import GuestLayout from "@/components/GuestLayout/GuestLayout";
import React, { useState } from "react";
import { ReactElement } from "react";
import { articles } from "@/lib/placeholder-data";
import PageHeader from "@/components/PageHeader/PageHeader";
import Article from "@/components/Article/Article";
import { IArticle } from "@/lib/definitions";
import PageTitle from "@/components/PageHeader/PageTitle";

const News = ({ articles }: { articles: IArticle[] }) => {
  return (
    <>
      <PageHeader
        title={"News & Blog"}
        lead={"Get the latest news about us"}
        image={"/images/academy-news.jpg"}
      />
      <PageTitle text={"Articles"} />
      <div className="main-container">
        <div className="articles">
          {articles.map((article) => {
            return (
              <Article article={article} responsive={true} key={article.id} />
            );
          })}
        </div>
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
