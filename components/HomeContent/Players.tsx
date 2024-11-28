import { useEffect, useState } from 'react';
// import { under19Players as playersData } from "../pages/team/playersData"; // Import player data
import styles from './Players.module.css';
import { IPlayer } from '@/types/auth';

interface IPlayerData {
  players : IPlayer[]
}
function Players({players}: IPlayerData) {
  const [displayedPlayers, setDisplayedPlayers] = useState([]);

  useEffect(() => {
    // Get the latest 4 players from the imported data
    // setDisplayedPlayers(playersData.slice(0, 4));
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className={styles.teamPosition}>
      <ul className={styles.playerList}>
        {players.map((player) => (
          <li
            key={player._id}
            className={styles.playerCard}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 0.4), rgba(64, 84, 102, 0.2)), url(${player.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          >
            <div className={styles.playerDetails}>
              <div className={styles.playerName}>
                <p className={styles.playerFirstName}>{player.first_name}</p>
                <p className={styles.playerLastName}>{player.last_name}</p>
              </div>
              <div className={styles.number}>
                <h3>{player.number}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Players;