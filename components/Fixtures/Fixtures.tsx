import { useState } from 'react';
import Link from 'next/link';
import styles from './Fixtures.module.css';

type Match = {
  league: string;
  leagueLogo: string;
  date: string;
  stadium: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  homeGoals?: number;
  awayGoals?: number;
  id: string; // Changed from url to id
};

const matchesData : { month: string; matches: Match[] }[] = [
  {
    month: 'September',
    matches: [
      {
        league: 'TCC LEAGUE',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-09-28',
        stadium: 'Remo Stars Stadium',
        homeTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
        awayTeam: { name: 'Iganmu FC', logo: '/images/iganmufc.png' },
        homeGoals: 2,
        awayGoals: 1,
        id: '1'  // Changed from url to id
      },
    ]
  },
  {
    month: 'October',
    matches: [
      {
        league: 'TCC LEAGUE',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-10-04',
        stadium: 'Mobolaji Johnson Arena (Onikan Stadium), Lagos.',
        homeTeam: { name: 'Dannaz FC', logo: '/images/Dannaz.png' },
        awayTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
         homeGoals: 1,
        awayGoals: 4,
        id: '2'  // Changed from url to id
      },
      {
        league: 'TCC CUP',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-10-09',
        stadium: 'Remo Stars Stadium',
        homeTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
        awayTeam: { name: 'Valiant FC', logo: '/images/valiantfc.png' },
        homeGoals: 1,
        awayGoals: 0,
        id: '3'  // Changed from url to id
      },
      {
        league: 'TCC LEAGUE',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-10-11',
        stadium: 'Legacy Pitch, Surulere',
        homeTeam: { name: 'Beyond Limits ', logo: '/images/beyond-match.png' },
        awayTeam: { name: 'VOE Football', logo: '/images/voe.png' },
         homeGoals: 3,
        awayGoals: 2,
        id: '4'  // Changed from url to id
      },
      {
        league: 'TCC LEAGUE',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-10-19',
        stadium: 'Mobolaji Johnson Arena (Onikan Stadium), Lagos.',
        homeTeam: { name: 'Beyond Limits ', logo: '/images/beyond-match.png' },
        awayTeam: { name: 'Sporting Lagos', logo: '/images/sporting-lagos.png' },
         homeGoals: 1,
        awayGoals: 2,
        id: '5'  // Changed from url to id
      },
      {
        league: 'TCC LEAGUE',
        leagueLogo: '/images/league-tcc-icon.png',
        date: '2024-10-27',
        stadium: 'Remo Stars Stadium',
        homeTeam: { name: 'Beyond Limits ', logo: '/images/beyond-match.png' },
        awayTeam: { name: 'Real Sapphire', logo: '/images/real-sapphire.png' },
         homeGoals: 1,
        awayGoals: 2,
        id: '6'  // Changed from url to id
      },
    ]
  }
];

const MatchTabs = () => {
 const [selectedMonth, setSelectedMonth] = useState('October');

  const handleTabClick = (month: string) => {
    setSelectedMonth(month);
  };

  const matchesForMonth = matchesData.find(m => m.month === selectedMonth)?.matches || [];

  const upcomingMatches = matchesForMonth.filter(match => !match.homeGoals && !match.awayGoals);
  const playedMatches = matchesForMonth.filter(match => match.homeGoals !== undefined && match.awayGoals !== undefined);

  return (
    <div className={styles.tabsContainer}>
      {/* Tabs */}
      <div className={styles.tabs}>
         {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
          <button 
            key={month}
            onClick={() => handleTabClick(month)}
            className={selectedMonth === month ? `${styles.active}` : ''}
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
                    <img src={match.leagueLogo} alt={match.league} />
                    <p>{match.league}</p>
                  </div>
                  <div>
                    {new Date(match.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className={styles.middleContent}>
                  <div className={styles.teamLogoContainer}>
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                  </div>
                  <div>
                    <p className={styles.matchDate}>
                      {new Date(match.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className={styles.matchStadium}>{match.stadium}</p>
                  </div>
                  <div className={styles.teamLogoContainer}>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  </div>
                </div>
                <div className={styles.rightContent}>
                  {/* Use Link with the match id */}
                  <Link href={`/season/match/${match.id}`} passHref className={styles.shareButton}>
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
                    <img src={match.leagueLogo} alt={match.league} />
                    <p>{match.league}</p>
                  </div>
                  <div>
                    {new Date(match.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className={styles.middleContent}>
                  <div className={styles.teamLogoContainer}>
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
                  </div>
                  <div>
                    <p className={styles.scoreline}>{match.homeGoals} - {match.awayGoals}</p>
                  </div>
                  <div className={styles.teamLogoContainer}>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                  </div>
                </div>
                <div className={styles.rightContent}>
                  {/* Use Link with the match id */}
                  <Link href={`/season/match/${match.id}`} passHref className={styles.shareButton}>
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