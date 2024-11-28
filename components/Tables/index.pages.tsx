import { useState } from 'react';
import styles from './Tables.module.css';

type Team = {
  position: number;
  logo: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

const leagueTables: { [key: string]: Team[] } = {
   TCCL: [
  { position: 1, logo: '/images/sporting-lagos.png', name: 'Sporting Lagos', played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 11, goalsAgainst: 6, goalDifference: 5, points: 9 },
  { position: 2, logo: '/images/beyond-match.png', name: 'Beyond Limits FA', played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 10, goalsAgainst: 5, goalDifference: 5, points: 9 },
  { position: 3, logo: '/images/broad-city.png', name: 'Broadcity FC', played: 4, won: 2, drawn: 2, lost: 0, goalsFor: 8, goalsAgainst: 3, goalDifference: 5, points: 8 },
  { position: 4, logo: '/images/real-sapphire.png', name: 'Real Sapphire', played: 4, won: 2, drawn: 2, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 8 },
  { position: 5, logo: '/images/atlantic-business.png', name: 'Atlantic FC', played: 4, won: 2, drawn: 1, lost: 1, goalsFor: 8, goalsAgainst: 6, goalDifference: 2, points: 7 },
  { position: 6, logo: '/images/voe.png', name: 'VOE Football Academy', played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 9, goalsAgainst: 9, goalDifference: 0, points: 6 },
  { position: 7, logo: '/images/imperial-match.png', name: 'Imperial FC', played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 6 },
  { position: 8, logo: '/images/gbagada.png', name: 'Gbagada FC', played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 6 },
 { position: 9, logo: '/images/dino-sporting.png', name: 'Dino Sporting', played: 4, won: 1, drawn: 2, lost: 1, goalsFor: 6, goalsAgainst: 4, goalDifference: 2, points: 5 },
   { position: 10, logo: '/images/dannaz.png', name: 'Dannaz FC', played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 10, goalDifference: -7, points: 3 },
  { position: 11, logo: '/images/iganmufc.png', name: 'Iganmu FC', played: 4, won: 0, drawn: 1, lost: 3, goalsFor: 1, goalsAgainst: 10, goalDifference: -9, points: 1 },
   { position: 12, logo: '/images/valiantfc.png', name: 'Valiant FC', played: 4, won: 0, drawn: 0, lost: 4, goalsFor: 3, goalsAgainst: 8, goalDifference: -5, points: 0 },
 
 ],
  TCCC: [
    // More teams...
  ],
  NNL: [], // No data for this league as an example
};

function Tables() {
  const [selectedLeague, setSelectedLeague] = useState('TCCL');

  const handleTabClick = (league: string) => {
    setSelectedLeague(league);
  };

  const selectedTable = leagueTables[selectedLeague];

  return (
    <div className={styles.tabsContainer}>
      {/* Tabs */}
      <div className={styles.tabs}>
        {['TCCL', 'TCCC', 'NNL'].map(league => (
          <button
            key={league}
            onClick={() => handleTabClick(league)}
            className={selectedLeague === league ? `${styles.active}` : ''}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Display Table or No Data Message */}
      <div className={styles.tableContainer}>
        {selectedTable.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>POS</th>
                <th>CLUB</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>F</th>
                <th>A</th>
                <th>GD</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {selectedTable.map((team, index) => (
                <tr key={index} className={team.name === "Beyond Limits FA" ? "highlight-row" : ""}>
                  <td>{team.position}</td>
                  <td className={styles.club}>
                    <img src={team.logo} alt={team.name} className={styles.clubLogo} />
                    {team.name}
                  </td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.drawn}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No table data available for {selectedLeague}.</p>
        )}
      </div>
    </div>
  );
}

export default Tables;