import React, { useEffect, useState, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './NewsCarousel.module.css'; // Add your styles in this file
import { INews } from '@/types/auth';
import Link from 'next/link';

// Sample news data

interface INewsData {
  news_: INews[]
}
const NewsCarousel = ({news_}:INewsData) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [viewportWidth, setViewportWidth] = useState(0);

  // Update viewport size on resize
  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth);
      if (emblaApi) {
        emblaApi.reInit(); // Re-initialize Embla on resize
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth); // Set initial viewport size in client
      window.addEventListener('resize', handleResize);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [emblaApi]);
  
  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {news_.map((news, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.newsCard} style={{
                background: `linear-gradient(0deg, rgba(4, 48, 91, 1), rgba(64, 84, 102, 0.03)), url(${news.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                 borderRadius: '22px',
                overflow: 'hidden'
              }}>
                <div className={styles.newsSpace}>
                    
                </div>
                <div className={styles.newsContent}>

                  <h3 className={styles.newsTitle}>{news.head_line}</h3>
                  <hr />
                  <div className={styles.newsFooter}>
                    <p className={styles.newsDate}>{news.createdAt}</p>
                    <Link href={`/news/${news._id}`} className={styles.newsLink}>Go →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;