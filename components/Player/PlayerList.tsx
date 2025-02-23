import { IPlayer } from "@/lib/definitions";
import styles from "./Player.module.css";
import clsx from "clsx";
import Player from "./Player";

const PlayerList = ({ players }: { players: IPlayer[] }) => {
  return (
    <div className={clsx(styles.players)}>
      {players.map((player) => {
        return <Player player={player} key={player.id} />;
      })}
    </div>
  );
};

export default PlayerList;
