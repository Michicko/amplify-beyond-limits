import React from "react";
import Image from "next/image";
import styles from "./VideoCard.module.css"; // Assuming CSS module is in the same folder
import { IHighlight } from "@/lib/definitions";
import { FaPlay } from "react-icons/fa";
import loaderProp from "@/lib/imageLoader";
import ImageComp from "../ImageComp/ImageComp";

const VideoCard = ({ highlight }: { highlight: IHighlight }) => {
  return (
    <div className={styles.videoCard}>
      <div className={styles.thumbnailWrapper}>
        <ImageComp
          alt={highlight.title}
          image={highlight.thumbnail}
          placeholder={highlight.thumbnail}
          priority={false}
        />
      </div>
      <div className={styles.buttonContainer}>
        <h4 className={styles.watchButton}>{highlight.title}</h4>
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
