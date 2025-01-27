import React from "react";
import styles from "./PlayerModal.module.css"; // import the module

const PlayerModal = ({ player, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalImage}>
          <img
            src={
              "https://backend.liverpoolfc.com/sites/default/files/styles/lg/public/2024-08/mohamed-salah-alternative-body-v2-2024.png?itok=VMLtOKVH"
            }
            alt={`${player.firstName} ${player.lastName}`}
          />
        </div>
        <div className={styles.modalInfo}>
          <div className={styles.playerName}>
            <h3>{player.firstName} </h3>
            <h1>{player.lastName} </h1>
          </div>
          <div className={styles.playerDeets}>
            <ul>
              <li>
                <h3>{player.position.label}</h3>
                <h3>{player.position.value}</h3>
              </li>
              <li>
                <h3>Number</h3>
                <h3>{player.playerNumber}</h3>
              </li>
              <li>
                <h3>DOB</h3>
                <h3>{new Date(player.dob).toLocaleDateString()}</h3>
              </li>
              <li>
                <h3>Foot</h3>
                <h3>{player.dominantFoot}</h3>
              </li>
              <li>
                <h3>Height</h3>
                <h3>{player.height}</h3>
              </li>
              <li>
                <h3>Weight</h3>
                <h3>{player.weight} </h3>
              </li>
            </ul>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
      {/* <button className={styles.closeButton} onClick={onClose}>Close</button> */}
    </div>
  );
};

export default PlayerModal;
