import React from "react";
import Image from "next/image";
import styles from "./VideoCard.module.css"; // Assuming CSS module is in the same folder
import { IHighlight } from "@/lib/definitions";
import { FaPlay } from "react-icons/fa";

const VideoCard = ({ highlight }: { highlight: IHighlight }) => {
  return (
    <div className={styles.videoCard}>
      <div className={styles.thumbnailWrapper}>
        <Image
          src={highlight.thumbnail}
          alt={highlight.title}
          layout="responsive"
          width={100}
          height={150}
          unoptimized
          className={styles.thumbnail}
        />
        <div className={styles.buttonContainer}>
          <h4 className={styles.watchButton}>{highlight.title}</h4>
        </div>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={highlight.videoUrl}
        className={styles["video-card__link"]}
      >
        <FaPlay className={styles["play-icon"]} />
      </a>
    </div>
  );
};

export default VideoCard;
