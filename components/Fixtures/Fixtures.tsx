import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Fixtures.module.css";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";

const client = generateClient<Schema>();

const MatchTabs = () => {
  const [selectedMonth, setSelectedMonth] = useState("October");

  const [allMatches, setAllMatches] = useState<Array<Schema["Match"]["type"]>>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (month: string) => {
    setSelectedMonth(month);
  };

  const getMonth = (dt: string) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(dt);
    let name = month[d.getMonth()]; // June

    return name;
  };
  const matchesForMonth =
    allMatches.length > 0
      ? allMatches.filter((m) =>
          m.date ? getMonth(m.date) === selectedMonth : null
        )
      : [];

  const upcomingMatches =
    matchesForMonth.length > 0
      ? matchesForMonth.filter((match) => !match.isPlayed)
      : [];
  const playedMatches =
    matchesForMonth.length > 0
      ? matchesForMonth.filter((match) => match.isPlayed)
      : [];

  function listMatches() {
    setIsLoading(true);
    client.models.Match.observeQuery().subscribe({
      next: (data) => {
        setAllMatches([...data.items]);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listMatches();
    // listPlayers();
  }, []);

  return (
    <div className={styles.tabsContainer}>
      {/* Tabs */}
      <div className={styles.tabs}>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month) => (
          <button
            key={month}
            onClick={() => handleTabClick(month)}
            className={selectedMonth === month ? `${styles.active}` : ""}
          >
            {month}
          </button>
        ))}
      </div>

      <div className={styles.fixTitle}>
        <hr className={styles.horizontalRule} />
        <h2>UPCOMING MATCHES</h2>
        <hr className={styles.horizontalRule} />
      </div>

      {/* Matches */}
      <div className={styles.matches}>
        {upcomingMatches.length > 0 ? (
          upcomingMatches.map((match, index) => (
            <div key={index} className={styles.match}>
              <div className={styles.matchContainer}>
                <div className={styles.leftContent}>
                  <div className={styles.leagueContainer}>
                    <StorageImage
                      alt={match?.league?.name || ""}
                      path={match?.league?.logo || ""}
                    />
                    <p>{match?.league?.name}</p>
                  </div>
                  <div>
                    {new Date(match?.date || "").toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className={styles.middleContent}>
                  <div className={styles.teamLogoContainer}>

                    <StorageImage
                      alt={match?.home?.name || ""}
                      path={match?.home?.logo || ""}
                    />
                  </div>
                  <div>
                    <p className={styles.matchDate}>
                      {new Date(match?.date || "").toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className={styles.matchStadium}>{match.venue}</p>
                  </div>
                  <div className={styles.teamLogoContainer}>
                    <StorageImage
                      alt={match?.away?.name || ""}
                      path={match?.away?.logo || ""}
                    />
                  </div>
                </div>
                <div className={styles.rightContent}>
                  {/* Use Link with the match id */}
                  <Link
                    href={`/season/match/${match.id}`}
                    passHref
                    className={styles.shareButton}
                  >
                    View Match
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matches scheduled for {selectedMonth}.</p>
        )}
      </div>

      {/* Played Matches */}
      <div className={styles.fixTitle}>
        <hr className={styles.horizontalRule} />
        <h2>PLAYED MATCHES</h2>
        <hr className={styles.horizontalRule} />
      </div>
      <div className={styles.matches}>
        {playedMatches.length > 0 ? (
          playedMatches.map((match, index) => (
            <div key={index} className={styles.match}>
              <div className={styles.matchContainer}>
                <div className={styles.leftContent}>
                  <div className={styles.leagueContainer}>
                    <StorageImage
                      alt={match?.league?.name || ""}
                      path={match?.league?.logo || ""}
                    />
                    <p>{match?.league?.name}</p>
                  </div>
                  <div>
                    {new Date(match?.date || "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className={styles.middleContent}>
                  <div className={styles.teamLogoContainer}>
                    <StorageImage
                      alt={match?.home?.name || ""}
                      path={match?.home?.logo || ""}
                    />
                  </div>
                  <div>
                    <p className={styles.scoreline}>
                      {match?.home?.goals} - {match?.away?.goals}
                    </p>
                  </div>
                  <div className={styles.teamLogoContainer}>
                    <StorageImage
                      alt={match?.away?.name || ""}
                      path={match?.away?.logo || ""}
                    />
                  </div>
                </div>
                <div className={styles.rightContent}>
                  {/* Use Link with the match id */}
                  <Link
                    href={`/season/match/${match.id}`}
                    passHref
                    className={styles.shareButton}
                  >
                    View Match
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matches have been played in {selectedMonth}.</p>
        )}
      </div>
    </div>
  );
};

export default MatchTabs;
