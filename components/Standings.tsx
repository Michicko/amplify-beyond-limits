const Standings = () => {
  const teams = [
    { pos: 1, teamLogo: "/images/sporting-lagos.png", club: 'Sporting Lagos', p: 4, w: 3, d: 0, l: 1, pts: 9 },
    { pos: 2, teamLogo: "/images/beyond-match.png", club: 'Beyond Limits FA', p: 4, w: 3, d: 0, l: 1, pts: 9 }
  ];

  return (
    <div className="standings-container">
      <table className="standings-table">
        <thead>
          <tr>
            <th>POS</th>
            <th></th>
            <th>CLUB</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.pos}
             className={team.club === "Beyond Limits FA" ? "highlight-row" : ""}
             >
              <td className="td-pos">{team.pos}
              </td>
              <td align="center"> <img
                  src={team.teamLogo}
                  alt={`${team.club} logo`}
                  style={{ width: '30px', marginRight: '5px'}}
                /></td>
              <td>{team.club}</td>
              <td>{team.p}</td>
              <td>{team.w}</td>
              <td>{team.l}</td>
              <td>{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="match-button">
        <a href="/season/#tables" className="">
          View Full Table →
        </a>
      </div>
    </div>
  );
};

export default Standings;
