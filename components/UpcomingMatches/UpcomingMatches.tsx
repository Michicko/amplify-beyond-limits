import moment from "moment";
import styles from './UpcomingMatches.module.css'; 

const UpcomingMatches = ({
  date = "N/A",
  time = "9:00AM",
  stadium = "Remo stars Stadium",
  homeTeam = "Home Team",
  homeTeamLogo = "",
  awayTeam = "Away Team",
  awayTeamLogo = "",
  score = "0 - 0",
  league = "Unknown League",
  leagueLogo = "",
  matchLink = "#",
}) => {
  return (
    <div className="">
      {/* League Info (Logo and Name) */}
      <div className="card-top">
        <div className="league-logo">
          {leagueLogo && (
            <img src={leagueLogo} alt={league} className="league-logo-icon" />
          )}
          <h3 className="league-name">{league}</h3>
        </div>
        <p className="match-date">
          {date}
        </p>
      </div>

      {/* Match Teams (Logos and Names) */}
      <div className="match-teams upcoming-teams">
        {/* Home Team */}
        <div className="team">
          {homeTeamLogo && (
            <img
              src={homeTeamLogo}
              alt={homeTeam}
              className="team-logo"
            />
          )}
        </div>

        {/* Score */}
        <div className="match-deets">
          <p className="match-date">{date}</p>
          <p className="match-time">{time}</p>
          <p className="match-stadium">{stadium}</p>
        </div>

        {/* Away Team */}
        <div className="team">
          {awayTeamLogo && (
            <img
              src={awayTeamLogo}
              alt={awayTeam}
              className="team-logo"
            />
          )}
        </div>
      </div>

    </div>
  );
};

export default UpcomingMatches;