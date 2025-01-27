import { ReactElement, useEffect, useState } from "react";
import PlayerModal from "@/components/Players/PlayerModal";
import styles from "./Team.module.css";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = generateClient<Schema>();

const Under19Team = () => {
  const [allPlayers, setPlayers] = useState<Array<Schema["Player"]["type"]>>(
    []
  );

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getSignedImageUrl = async (key: string): Promise<string> => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: "AKIA2NK3YLEW6XCPIL7X",
        secretAccessKey: "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",
      },
      region: "us-east-2",
    });

    const command = new GetObjectCommand({
      Bucket: "amplify-amplifynextpagest-beyondlstorebucket51a4c0-drhbkhgztuad",
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command);

    return signedUrl;
  };

  const updateImagesurl = async (data: Schema["Player"]["type"][]) => {
    const updatedData = await Promise.all(
      data.map(async (item) => {
        let fullUrl = "";
        if (item.photo) fullUrl = await getSignedImageUrl(item.photo);
        return {
          ...item,
          photo: fullUrl,
        };
      })
    );

    return updatedData;
  };

  function listPlayers() {
    setIsLoading(true);
    client.models.Player.observeQuery().subscribe({
      next: (data) => {
        setPlayers([...data.items]);

        // Call the function and update the photo URLs
        updateImagesurl([...data.items]).then((updatedData) => {
          // console.log("Updated Data:", updatedData);

          setPlayers([...updatedData]);
        });

        setIsLoading(false);
      },
    });
  }

  const openModal = (player: any) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  useEffect(() => {
    listPlayers();
  }, []);

  return (
    <div className="mainContainer">
      <div
        className={styles.teamHead}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/under19-cover.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h1>UNDER 19 PLAYERS</h1>
      </div>

      <div className={styles.teamInfo}>
        <div className={styles.teamPosition}>
          <h2>Goalkeepers</h2>
          <ul className={styles.playerList}>
            {allPlayers
              .filter((player) => player?.position?.label === "Goalkeeper")
              .map((player) => (
                <li
                  key={player.id}
                  className={styles.playerCard}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                >
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>
                      <p className={styles.playerFirstName}>
                        {player.firstName}
                      </p>
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
            {allPlayers
              .filter((player) => player?.position?.label === "Defender")
              .map((player) => (
                <li
                  key={player.id}
                  className={styles.playerCard}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                >
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>
                      <p className={styles.playerFirstName}>
                        {player.firstName}
                      </p>
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
            {allPlayers
              .filter((player) => player?.position?.label === "Midfielder")
              .map((player) => (
                <li
                  key={player.id}
                  className={styles.playerCard}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                >
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>
                      <p className={styles.playerFirstName}>
                        {player.firstName}
                      </p>
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
            {allPlayers
              .filter((player) => player?.position?.label === "Forward")
              .map((player) => (
                <li
                  key={player.id}
                  className={styles.playerCard}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 4%), rgba(64, 84, 102, 2%)), url(${player.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                >
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>
                      <p className={styles.playerFirstName}>
                        {player.firstName}
                      </p>
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
