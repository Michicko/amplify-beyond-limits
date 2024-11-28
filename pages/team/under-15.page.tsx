import { ReactElement, useState } from "react";
import { under19Players } from "./playersData"; // assuming data is in this path
import PlayerModal from "@/components/Players/PlayerModal";
import styles from './Team.module.css';
import GuestLayout from "@/components/GuestLayout/GuestLayout";

const Under15Team = () => {
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
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/under-17.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1>UNDER 15 PLAYERS</h1>
      </div>


    </div>
  );
};

Under15Team.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Under15Team;