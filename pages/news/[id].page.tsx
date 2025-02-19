import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import styles from "./News.module.css";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import { useGetOneNewsQuery } from "@/store/api/news.api";

const NewsArticle = ({ article }) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const { data, refetch, isFetching } = useGetOneNewsQuery({
    id: router.query.id as string,
  });

  useEffect(() => {
    refetch();
  }, [data?.data]);

  if (isFetching) {
    return (
      <div className="mainContainer">
        <p>Loading...</p>
      </div>
    );
  }

  // Create the share URLs
  const shareText = `Check out this article: ${data?.data?.head_line}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}&text=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText + " " + currentUrl
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="mainContainer">
      <div className={styles.newsArticle}>
        <div
          className={styles.newsArticleHead}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(${data?.data?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <h1>{data?.data?.head_line}</h1>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.newsArticleBody}>
          <div dangerouslySetInnerHTML={{ __html: data?.data?.news }} />
          {/* Share buttons */}
          <div className={styles.shareButtons}>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareButton}
            >
              Twitter
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareButton}
            >
              WhatsApp
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareButton}
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsArticle.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default NewsArticle;
