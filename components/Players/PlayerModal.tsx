import React from "react";
import styles from "./PlayerModal.module.css"; // import the module

const PlayerModal = ({ player, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalImage}>
          <img src={player.imageUrl}alt={`${player.firstName} ${player.lastName}`} />
        </div>
        <div className={styles.modalInfo}>
          <div className={styles.playerName}>
            <h3>{player.firstName} </h3>
            <h1>{player.lastName} </h1>
          </div>
          <div className={styles.playerDeets}>
            <ul>
              <li>
                <h3>{player.position}</h3>
                <h3>{player.pos}</h3>
              </li>
              <li>
                <h3>Number</h3>
                <h3>{player.jerseyNumber}</h3>
              </li>
              <li>
                <h3>DOB</h3>
                <h3>{new Date(player.dateOfBirth).toLocaleDateString()}</h3>
              </li>
              <li>
                <h3>Foot</h3>
                <h3>{player.preferredFoot}</h3>
              </li>
               <li>
                <h3>Height</h3>
                <h3>{player.height}CM</h3>
              </li>
               <li>
                <h3>Weight</h3>
                <h3>{player.weight} KG</h3>
              </li>
            </ul>
          </div>
        </div>
         <button className={styles.closeButton} onClick={onClose}>&times;</button>
      </div>
      {/* <button className={styles.closeButton} onClick={onClose}>Close</button> */}
    </div>
  );
};

export default PlayerModal;