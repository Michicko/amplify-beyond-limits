import moment from "moment";

const MatchCard = ({
  date = "N/A",
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
      <div className="match-teams">
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
        <div className="match-score">
          <p className="">{score}</p>
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

      {/* View Match Button */}
      <div className="match-button">
        <a
          href={matchLink}
          className=""
        >
          View Match →
        </a>
      </div>
    </div>
  );
};

export default MatchCard;