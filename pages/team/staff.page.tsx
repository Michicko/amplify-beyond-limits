import { ReactElement, useState } from "react";
import { under19Players } from "./playersData"; // assuming data is in this path
import PlayerModal from "@/components/Players/PlayerModal";
import styles from './Team.module.css';
import GuestLayout from "@/components/GuestLayout/GuestLayout";

const Staff = () => {
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
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/staff.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1>OTHER STAFF</h1>
      </div>


    </div>
  );
};

Staff.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Staff;