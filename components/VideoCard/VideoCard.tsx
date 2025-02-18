import React from "react";
import Image from "next/image";
import styles from "./VideoCard.module.css"; // Assuming CSS module is in the same folder
import { IHighlight } from "@/lib/definitions";
import { FaPlay } from "react-icons/fa";

const VideoCard = ({ highlight }: IHighlight) => {
  return (
    <div className={styles.videoCard}>
      <a
        className={styles.thumbnailWrapper}
        target="_blank"
        rel="noopener noreferrer"
        href={highlight.videoUrl}
      >
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
      </a>
      <FaPlay className={styles["play-icon"]} />
    </div>
  );
};

export default VideoCard;
