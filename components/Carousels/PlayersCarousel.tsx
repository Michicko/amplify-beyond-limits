import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import styles from './PlayersCarousel.module.css'; // Create this file for the styles
import { IPlayer } from '@/types/auth';

interface IPlayerData {
  players: IPlayer[]
}
// Sample players data
const playersData = [
  {
    firstName: "Aputaziem",
    lastName: "Favour Oluebube",
    position: "GK",
    number: 49,
    image: "/images/favour-gk.png",
    profileLink: "#",
  },
  {
    firstName: "Ogungbe",
    lastName: "Ayomide",
    position: "M",
    number: 14,
    image: "/images/ayomide-m.png",
    profileLink: "#",
  },
  {
    firstName: "Ogundana",
    lastName: "Elijah Shola",
    position: "WF",
    number: 7,
    image: "/images/elijah-wf.png",
    profileLink: "#",
  },
];

const PlayersCarousel = ({players}: IPlayerData) => {
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
          {players.map((player, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.playerCard}  style={{
                background: `linear-gradient(0deg, rgba(64, 84, 102, 0.3), rgba(64, 84, 102, 0.3)), url('/images/playerback.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div className={styles.playerBackground}>
                  <div className={styles.playerPosition}>{player.position}</div>
                  <div className={styles.playerDetails}>
                    <div className={styles.playerTop}>
                        <div className={styles.playerName}>
                            <p className={styles.playerFirstName}>{player.first_name}</p>
                            <p className={styles.playerLastName}>{player.last_name}</p>
                        </div>
                        <div>
                            <div className={styles.playerNumber}>{player.number}</div>
                        </div>
                    </div>
                    <div className={styles.ProfileLink}>
                    <Link href={player._id}>
                      <p className={styles.playerProfileLink}>View Profile →</p>
                    </Link>
                    </div>
                  </div>
                  <img src={player.image} alt={`${player.first_name} ${player.last_name}`} className={styles.playerImage} />
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersCarousel;