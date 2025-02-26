import { IPlayer } from "@/lib/definitions";
import styles from "./Player.module.css";
import clsx from "clsx";
import Player from "./Player";
import { useState } from "react";
import Modal from "../Modal/Modal";
import PlayerModal from "./PlayerModal";
import Button from "../Button/Button";

const PlayerList = ({ players }: { players: IPlayer[] }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [isModalShown, setIsModalShown] = useState(false);

  const selectPlayer = (id: number) => {
    const player = players.find((player) => player.id === id);

    if (player) {
      setSelectedPlayer(player);
      setIsModalShown(true);
    }
  };

  const closeModal = () => {
    setIsModalShown(false);
  };

  return (
    <>
      {selectedPlayer && (
        <Modal isModalShown={isModalShown} setIsModalShown={setIsModalShown}>
          <div className={clsx(styles["player-modal"])}>
            <Button
              isLink={false}
              text="close"
              type="secondary"
              handleOnClick={closeModal}
            />
            <PlayerModal player={selectedPlayer} />
          </div>
        </Modal>
      )}
      <div className={clsx(styles.players)}>
        {players.map((player) => {
          return (
            <Player
              player={player}
              key={player.id}
              handleOnClick={selectPlayer}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlayerList;
