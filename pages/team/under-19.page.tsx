import { ReactElement, useState } from "react";
import { under19Players } from "./playersData"; // assuming data is in this path
import PlayerModal from "@/components/Players/PlayerModal";
import styles from './Team.module.css';
import GuestLayout from "@/components/GuestLayout/GuestLayout";

const Under19Team = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openModal = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="mainContainer">
      <div
        className={styles.teamHead}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/under19-cover.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1>UNDER 19 PLAYERS</h1>
      </div>

       <div className={styles.teamInfo}>
          <div className={styles.teamPosition}>      
            <h2>Goalkeepers</h2>
             <ul className={styles.playerList}>
              {under19Players
                .filter((player) => player.position === "Goalkeeper")
                .map((player) => (
                  <li
                    key={player.id}
                    className={styles.playerCard}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                    }}
                  >
                    <div className={styles.playerDetails}>
                      <div className={styles.playerName}>
                        <p className={styles.playerFirstName}>{player.firstName}</p>
                        <p className={styles.playerLastName}>{player.lastName}</p>
                      </div>
                      <div className={styles.ProfileLink}>
                        <button
                          className={styles.playerProfileLink}
                          onClick={() => openModal(player)}
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          
           <div className={styles.teamPosition}>      
            <h2>Defenders</h2>
             <ul className={styles.playerList}>
              {under19Players
                .filter((player) => player.position === "Defender")
                .map((player) => (
                  <li
                    key={player.id}
                    className={styles.playerCard}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                    }}
                  >
                    <div className={styles.playerDetails}>
                      <div className={styles.playerName}>
                        <p className={styles.playerFirstName}>{player.firstName}</p>
                        <p className={styles.playerLastName}>{player.lastName}</p>
                      </div>
                      <div className={styles.ProfileLink}>
                        <button
                          className={styles.playerProfileLink}
                          onClick={() => openModal(player)}
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

           <div className={styles.teamPosition}>      
            <h2>Midfielders</h2>
             <ul className={styles.playerList}>
              {under19Players
                .filter((player) => player.position === "Midfielder")
                .map((player) => (
                  <li
                    key={player.id}
                    className={styles.playerCard}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                    }}
                  >
                    <div className={styles.playerDetails}>
                      <div className={styles.playerName}>
                        <p className={styles.playerFirstName}>{player.firstName}</p>
                        <p className={styles.playerLastName}>{player.lastName}</p>
                      </div>
                      <div className={styles.ProfileLink}>
                        <button
                          className={styles.playerProfileLink}
                          onClick={() => openModal(player)}
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

           <div className={styles.teamPosition}>      
            <h2>Forwards</h2>
             <ul className={styles.playerList}>
              {under19Players
                .filter((player) => player.position === "Forward")
                .map((player) => (
                  <li
                    key={player.id}
                    className={styles.playerCard}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                    }}
                  >
                    <div className={styles.playerDetails}>
                      <div className={styles.playerName}>
                        <p className={styles.playerFirstName}>{player.firstName}</p>
                        <p className={styles.playerLastName}>{player.lastName}</p>
                      </div>
                      <div className={styles.ProfileLink}>
                        <button
                          className={styles.playerProfileLink}
                          onClick={() => openModal(player)}
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
       </div>
     

      {/* Add similar sections for other positions */}

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={closeModal} />
      )}
    </div>
  );
};

Under19Team.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Under19Team;