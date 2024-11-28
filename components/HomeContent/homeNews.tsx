import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeNews.module.css';
import { INews } from '@/types/auth';


interface INewsData {
  news: INews[]
}

const HomeNews = ({news}: INewsData) => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    // Fetching news data (you can replace this with an API call)
    const allNews = [
      { id: '1', title: 'Beyond Limits FA Earns Promotion to NNL After 4-0 Victory Over First Bank FC', date: '2024-06-15', image: "/images/winners.jpg" },
      { id: '2', title: 'Beyond Limits FA Stuns Imperial FC with Dramatic 2-1 Comeback in Season Opener', date: '2024-06-01', image: "/images/trophy-boy.jpg" },
      { id: '3', title: 'Academy Breaks Records with 10-Game Unbeaten Streak, Securing Place in NNL', date: '2024-05-28', image: "/images/results.jpg" },
      { id: '4', title: 'End of Season Gala: Beyond Limits FA Celebrates Success with Players and Coaches', date: '2024-05-20', image: "/images/teamstats.jpg" },
      { id: '5', title: 'Beyond Limits Academy Wins Thrilling Cup Final Against Local Rivals in 3-2 Victory', date: '2024-05-15', image: "/images/honors.jpg" },
    ];

    // Get the latest 4 news items
    setLatestNews(allNews.slice(0, 4));
  }, []);

  return (
    <div className={styles.latestNewsSection}>
      <div className={styles.newsRow}>
        {news.map(news => (
           <Link href={`/news/${news._id}`} key={news._id}>
                  
                    <div className={styles.newsItem} style={{
                      background: `linear-gradient(0deg, rgba(4, 48, 91, 1), rgba(64, 84, 102, 0.03)), url(${news.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '22px',
                      overflow: 'hidden'
                    }}>
                      <div className={styles.newsSpace}></div>
                      <div className={styles.newsContent}>
                        <h3 className={styles.newsTitle}>{news.head_line}</h3>
                        <hr />
                        <div className={styles.newsFooter}>
                          <p className={styles.newsDate}> {new Date(news.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                          <Link href={`/news/${news._id}`} className={styles.newsLink}>Go →</Link>
                        </div>
                      </div>
                    </div>
                 
                </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeNews;