import GuestLayout from '@/components/GuestLayout/GuestLayout';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './News.module.css';
import { ReactElement } from 'react';
import Image from 'next/image';

const News = ({ academyNews, tvNews }) => {
  const [activeTab, setActiveTab] = useState('academy');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate current news items to display based on pagination
  const currentNews = activeTab === 'academy'
    ? academyNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : tvNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate total pages
  const totalPages = activeTab === 'academy'
    ? Math.ceil(academyNews.length / itemsPerPage)
    : Math.ceil(tvNews.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='mainContainer'>
      <div className={styles.newsPage}>
        <div className={styles.Tabs}>
          <button
            className={activeTab === 'academy' ? styles.active : ''}
            onClick={() => {
              setActiveTab('academy');
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            Academy News
          </button>
          <button
            className={activeTab === 'tv' ? styles.active : ''}
            onClick={() => {
              setActiveTab('tv');
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            Beyond TV
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'academy' ? (
            <div className={styles.academyNews}>
              {currentNews.map(news => (
                <Link href={`/news/${news.id}`} key={news.id}>
                  
                    <div className={styles.newsItem} style={{
                      background: `linear-gradient(0deg, rgba(4, 48, 91, 1), rgba(64, 84, 102, 0.03)), url(${news.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '22px',
                      overflow: 'hidden'
                    }}>
                      <div className={styles.newsSpace}></div>
                      <div className={styles.newsContent}>
                        <h3 className={styles.newsTitle}>{news.title}</h3>
                        <hr />
                        <div className={styles.newsFooter}>
                          <p className={styles.newsDate}> {new Date(news.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                          <Link href={`/news/${news.id}`} className={styles.newsLink}>Go →</Link>
                        </div>
                      </div>
                    </div>
                 
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.tvNews}>
              {currentNews.map(tv => (
                <Link href={tv.videoUrl} target="_blank" rel="noopener noreferrer" key={tv.id}>
                 
                    <div className={styles.tvItem}>
                      <Image
                        src={tv.thumbnail}
                        alt={tv.title}
                        layout="responsive" 
                        width={100}
                        height={150}
                        objectFit="cover"
                        unoptimized     
                        className={styles.thumbnail}
                      />
                      <h3>{tv.title}</h3>
                    </div>
                  
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? styles.activePage : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

News.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

// Sample data fetching
export async function getServerSideProps() {
  const academyNews = [
  { id: '1', title: 'Beyond Limits FA Earns Promotion to NNL After 4-0 Victory Over First Bank FC', date: '2024-06-15', image: "/images/winners.jpg" },
  { id: '2', title: 'Beyond Limits FA Stuns Imperial FC with Dramatic 2-1 Comeback in Season Opener', date: '2024-06-01', image: "/images/trophy-boy.jpg" },
  { id: '3', title: 'Academy Breaks Records with 10-Game Unbeaten Streak, Securing Place in NNL', date: '2024-05-28', image: "/images/results.jpg" },
  { id: '4', title: 'End of Season Gala: Beyond Limits FA Celebrates Success with Players and Coaches', date: '2024-05-20', image: "/images/teamstats.jpg" },
  { id: '5', title: 'Beyond Limits Academy Wins Thrilling Cup Final Against Local Rivals in 3-2 Victory', date: '2024-05-15', image: "/images/honors.jpg" },
  { id: '6', title: 'Tense Semi-Final Sees Beyond Limits FA Edge Past Rivals on Penalties to Reach Cup Final', date: '2024-05-10', image: "/images/beyondtv.jpg" },
];

  const tvNews = [
    { id: '1', title: 'TCC 24|25 MD1 : BEYOND LIMITS FA VS IGANMU TIGERS', date: '2024-09-29', videoUrl: 'https://www.youtube.com/watch?v=oVy2zUmq1DA', thumbnail: '/images/trials.png' },
    { id: '2', title: 'TV Post 2', date: '2024-09-27', videoUrl: 'https://www.youtube.com/watch?v=oVy2zUmq1DA', thumbnail: '/images/keep.png' },
    { id: '3', title: 'TV Post 3', date: '2024-09-27', videoUrl: 'https://www.youtube.com/watch?v=oVy2zUmq1DA', thumbnail: '/images/ongame.png' },
  ];

  return { props: { academyNews, tvNews } };
}

export default News;