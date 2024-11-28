import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styles from './Match.module.css'; // Your CSS module
import GuestLayout from '@/components/GuestLayout/GuestLayout';
// import Preview from '@/components/MatchTabs/Preview'; // Assuming you created the tab components
// import Report from '@/components/MatchTabs/Report';
// import Lineup from '@/components/MatchTabs/Lineup';
// import Stats from '@/components/MatchTabs/Stats';

const matchesData = [
  {
    id: '1',
    league: 'TCC LEAGUE',
    leagueLogo: '/images/league-tcc-icon.png',
    date: '2024-09-28',
    stadium: 'Remo Stars Stadium',
    homeTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
    awayTeam: { name: 'Iganmu FC', logo: '/images/iganmufc.png' },
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    id: '2',
    league: 'TCC LEAGUE',
    leagueLogo: '/images/league-tcc-icon.png',
    date: '2024-10-05',
    stadium: 'Remo Stars Stadium',
    homeTeam: { name: 'Dannaz FC', logo: '/images/Dannaz.png' },
    awayTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
  },
  {
    id: '3',
    league: 'TCC CUP',
    leagueLogo: '/images/league-tcc-icon.png',
    date: '2024-10-09',
    stadium: 'Remo Stars Stadium',
    homeTeam: { name: 'Beyond Limits', logo: '/images/beyond-match.png' },
    awayTeam: { name: 'VOE Football', logo: '/images/voe.png' },
  }
];

const MatchDetails = () => {
  const router = useRouter();
  const { matchId } = router.query; // Get the matchId from the URL
  const [match, setMatch] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Preview');

  useEffect(() => {
    if (matchId) {
      // Simulate fetching the match data based on the matchId
      const foundMatch = matchesData.find((m) => m.id === matchId);
      setMatch(foundMatch);
    }
  }, [matchId]);

  if (!match) {
    return (
      <div className='mainContainer'>
        <div className={styles.tabContent}>

        <div >Loading...</div>
        </div>
      </div>
    )
  }

  // Handle tab switching
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='mainContainer'>
      <div className={styles.matchDetails}>
        <div className={styles.matchHead}>
          <div className={styles.matchHeadteamLogo}>
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
          </div>
          <div className={styles.matchHeadMiddle}>
            <div >
               <p>{new Date(match.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
            </div>
            <div className={styles.matchScore}>
                  {match.homeGoals !== undefined && match.awayGoals !== undefined && (
                    <p>{match.homeGoals} - {match.awayGoals}</p>
                  )}
             
            </div>
            <div className={styles.matchStadium}>
               <p>{match.stadium}</p>     
            </div>
          </div>
          <div className={styles.matchHeadteamLogo}>
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
          </div>
        </div>

        <div className={styles.matchTitle}>
            <h3><span>{match.homeTeam.name}</span> vs {match.awayTeam.name}</h3>       
            <div className={styles.matchLeague}>
              <img src={match.leagueLogo} alt={match.league} />
              <p>{match.league}</p>
            </div>
        </div>


    

        {/* Tabs for Preview, Report, Lineup, Stats */}
        <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button onClick={() => handleTabClick('Preview')} className={activeTab === 'Preview' ? styles.active : ''}>Preview</button>
          <button onClick={() => handleTabClick('Report')} className={activeTab === 'Report' ? styles.active : ''}>Report</button>
          <button onClick={() => handleTabClick('Lineup')} className={activeTab === 'Lineup' ? styles.active : ''}>Lineup</button>
          <button onClick={() => handleTabClick('Stats')} className={activeTab === 'Stats' ? styles.active : ''}>Stats</button>
        </div>

        </div>

        {/* Tab content */}
        {/* <div className={styles.tabContent}>
          {activeTab === 'Preview' && <Preview match={match} />}
          {activeTab === 'Report' && <Report match={match} />}
          {activeTab === 'Lineup' && <Lineup match={match} />}
          {activeTab === 'Stats' && <Stats match={match} />}
        </div> */}
        <div className={styles.tabContent}>
          {activeTab === 'Preview' && <>This information will be available shortly</>}
          {activeTab === 'Report' && <>This information will be available shortly</>}
          {activeTab === 'Lineup' && <>This information will be available shortly</>}
          {activeTab === 'Stats' && <>This information will be available shortly</>}
        </div>
      </div>
    </div>
  );
};

MatchDetails.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default MatchDetails;