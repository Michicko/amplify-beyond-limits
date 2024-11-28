import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './VideoCard.module.css'; // Assuming CSS module is in the same folder

const videoData = [
  {
    title: "TCC 24|25 MD1 : BEYOND LIMITS FA VS IGANMU TIGERS",
    date: "2024-01-10",
    thumbnail: "/images/blvsig.png",
    videoUrl: "https://www.youtube.com/watch?v=oVy2zUmq1DA&t=2s",
  },
  {
    title: "PRESEASON FRIENDLY MATCH: BLFA 2-1 BENDEL INSURANCE",
    date: "2024-01-05",
    thumbnail: "/images/keep.png",
    videoUrl: "https://www.youtube.com/watch?v=RvyFQolhGUg",
  },
  {
    title: "GOTHIA CUP 2024: BEYOND LIMITS U17 Vs ROSENBORG U17",
    date: "2024-01-03",
    thumbnail: "/images/trials.png",
    videoUrl: "https://www.youtube.com/watch?v=xxfZcnZx5h0",
  },
];

const VideoCard = () => {
  return (
    <div className={styles.videoList}>
      {videoData.map((video, index) => (
        <div key={index} className={styles.videoCard}>
          <div className={styles.thumbnailWrapper}>
            <Image
              src={video.thumbnail}
              alt={video.title}
              layout="responsive" 
              width={100}
              height={150}
              unoptimized     
              className={styles.thumbnail}
            />
          <div className={styles.buttonContainer}>
          <Link href={video.videoUrl} legacyBehavior>
            <a className={styles.watchButton} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          </Link>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCard;