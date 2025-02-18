import MatchCard from "@/components/MatchCard";
import Standings from "@/components/Standings";
import UpcomingMatches from "@/components/UpcomingMatches/UpcomingMatches";
import VideoCard from "@/components/VideoCard/VideoCard";
import Slider from "@/components/Slider/Slider";
import Link from "next/link";
import { useGetHomeDataQuery } from "@/store/api/match.api";
import moment from "moment";
import HomeNews from "./homeNews";
import Players from "./Players";

const Home = () => {
  const { data, isLoading } = useGetHomeDataQuery();

  console.log("Hello world!");

  return (
    <div>
      <Slider />
      {/* <section className="match-updates">
        <div className="previous-match">
          <h2>PREVIOUS MATCH</h2>
          <div className="card">
            <MatchCard
              date={moment(data.data.last_played_match.match.date).format(
                "MMM DD, YYYY, hh:mm"
              )}
              homeTeam={data.data.last_played_match.match.home_team.name}
              homeTeamLogo={data.data.last_played_match.match.home_team.logo}
              awayTeam={data.data.last_played_match.match.away_team.name}
              awayTeamLogo={data.data.last_played_match.match.away_team.logo}
              score={
                data.data.last_played_match.home_goals +
                " - " +
                data.data.last_played_match.away_goals
              }
              league={data.data.last_played_match.match.league.name}
              leagueLogo={data.data.last_played_match.match.league.logo}
              matchLink="/season"
            />
          </div>
        </div>
        <div className="next-match standing-match">
          <h2>NEXT MATCH</h2>
          <div className="card">
            <MatchCard
              date={moment(data.data.next_match.match.date).format(
                "MMM DD, YYYY, hh:mm"
              )}
              homeTeam={data.data.next_match.match.home_team.name}
              homeTeamLogo={data.data.next_match.match.home_team.logo}
              awayTeam={data.data.next_match.match.away_team.name}
              awayTeamLogo={data.data.next_match.match.away_team.logo}
              score=":"
              league={data.data.next_match.match.league.name}
              leagueLogo={data.data.next_match.match.league.logo}
              matchLink="/season"
            />
          </div>
        </div>
        <div className="standings">
          <h2>STANDINGS</h2>
          <div className="card">
            <Standings />
          </div>
        </div>
      </section> */}

      {/* <section className="Latest-News">
        <div className="Latest-News-Top">
          <h2>LATEST NEWS</h2>
          <Link href="/news">VIEW EVERYTHING →</Link>
        </div>
        <HomeNews news={data.data.news} />
      </section> */}

      {/* <section className="Latest-News">
        <div className="Latest-News-Top">
          <h2>OUR PLAYERS</h2>
        </div>
        <Players players={data.data.players} />
      </section> */}

      {/* <section className="upcoming-updates">
        <h2>UPCOMING MATCHES</h2>
        <div className="upcoming-updates-container">
          {data?.data.upcoming_matches.map((match) => (
            <div className="card" key={match._id}>
              <UpcomingMatches
                date={moment(match.date).format("MMM DD, YYYY")}
                time={moment(match.date).format("hh:mm a")}
                homeTeam={match.home_team.name}
                stadium="Remo stars Stadium"
                homeTeamLogo={match.home_team.logo}
                awayTeam={match.away_team.name}
                awayTeamLogo={match.away_team.logo}
                score=":"
                league={match.league.name}
                leagueLogo={match.league.logo}
                matchLink="#"
              />
            </div>
          ))}
        </div>
      </section> */}

      <section className="interlude">
        <p>
          At Beyond Limits Football Academy, we believe in more than just
          developing exceptional football talent; we strive to shape
          responsible, empowered individuals who contribute positively to
          society. As the juniors of the esteemed Remo Stars in the Nigerian
          Professional Football League, we take pride in our commitment to
          community development.
        </p>
      </section>

      <section className="">
        <div className="videos">
          <VideoCard />
        </div>
      </section>
    </div>
  );
};

export default Home;
