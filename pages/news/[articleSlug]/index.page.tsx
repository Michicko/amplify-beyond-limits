import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import styles from "../News.module.css";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import SocialShareLinks from "@/components/Social/SocialShareLinks";
import MainHeader from "@/components/MainHeader/MainHeader";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import Heading from "@/components/Typography/Heading";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import clsx from "clsx";
import { articles } from "@/lib/placeholder-data";
import Text from "@/components/Typography/Text";
import populateArticles from "@/lib/populateArticle";
import Article from "@/components/Article/Article";

const NewsArticle = ({ article }) => {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {}, []);

  if (isFetching) {
    return (
      <>
        <MainHeader
          bg={"/images/under-19-bg.png"}
          alt="2024 / 2025 ongoing campaign"
          overlay={true}
          loadingScreen={true}
        >
          <LayoutHeader>
            <>
              <Heading
                text={"Skeleton"}
                color="white"
                level={1}
                letterCase="upper"
              />
              <Text color="white" text={"Date"} center={true} size="md" />
            </>
          </LayoutHeader>
        </MainHeader>
        <LayoutMain>
          <div className={clsx(styles["article-container"], styles.article)}>
            <div className={clsx(styles["article-content__box"])}>
              loading screen...
            </div>
          </div>
        </LayoutMain>
      </>
    );
  }

  if (isError) {
    return (
      <LayoutMain>
        <div className={clsx(styles["article-container"], styles.error)}>
          <p>
            The article you're looking for does not exist or has been deleted.
          </p>
        </div>
      </LayoutMain>
    );
  }

  return (
    <>
      <MainHeader
        bg={"/images/under-19-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={article.title}
              color="white"
              level={1}
              letterCase="upper"
              center={true}
            />
            <Text
              color="white"
              text={"December 15, 2025"}
              center={true}
              size="md"
            />
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <div className={clsx(styles["article-container"], styles.article)}>
          <div className={clsx(styles["article-content__box"])}>
            {article && (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            )}
            <SocialShareLinks
              text={`Check out this article: ${article.title}`}
              url={currentUrl}
            />
          </div>
          <div className={clsx(styles["articles__box"])}>
            <Heading level={2} text={"Other Articles"} />
            <div className={clsx(styles["col-3"])}>
              {populateArticles(articles.slice(0, 3)).map((article) => {
                return <Article article={article} key={article.id} />;
              })}
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

NewsArticle.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default NewsArticle;

export async function getServerSideProps(context) {
  const article = articles.find((el) => el.id === context.query.articleSlug);

  return { props: { article } };
}
