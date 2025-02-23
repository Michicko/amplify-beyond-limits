import {
  articles,
  match,
  match_2,
  match_highlights,
  players,
} from "@/lib/placeholder-data";
import MainHeader from "../MainHeader/MainHeader";
import clsx from "clsx";
import MatchSmallCard from "../MatchCards/MatchSmallCard";
import Standing from "../Standing/Standing";
import ArticleList from "../Article/ArticleList";
import populateArticles from "@/lib/populateArticle";
import SectionHeader from "../Section/SectionHeader";
import PlayerList from "../Player/PlayerList";
import styles from "./HomeNews.module.css";
import Button from "../Button/Button";
import VideoCard from "../VideoCard/VideoCard";

const Home = () => {
  // const { data, isLoading } = useGetHomeDataQuery();

  return (
    <>
      <MainHeader
        bg={"/images/home-header-bg.png"}
        alt="Beyond the limits team celebrating"
      >
        <div className={clsx("landing__box")}>
          <p className={clsx("lead")}>Welcome To</p>
          <h1 className={clsx("primary__heading")}>Beyond Limits Fa</h1>
        </div>
      </MainHeader>
      <main className="main">
        <section className="match__updates">
          <MatchSmallCard match={match} heading={"Previous Match"} />
          <MatchSmallCard match={match_2} heading={"Next Match"} />
          <Standing />
        </section>
        <section>
          <SectionHeader
            heading={"LATEST NEWS"}
            link={{ name: "View more articles", href: "/news" }}
          />
          <ArticleList articles={populateArticles(articles.slice(0, 4))} />
        </section>
        <section>
          <SectionHeader
            heading={"Our players"}
            link={{ name: "View more players", href: "/players/under-19" }}
          />
          <PlayerList players={players} />
        </section>
        <section className={clsx(styles.section__padded)}>
          <SectionHeader
            heading={"Upcoming matches"}
            no_link={true}
            center={true}
            letterCase="capitalize"
          />
          <div className={clsx(styles.matches)}>
            <MatchSmallCard match={match_2} no_btn={true} />
            <MatchSmallCard match={match_2} no_btn={true} />
            <MatchSmallCard match={match_2} no_btn={true} />
          </div>
          <Button
            isLink={true}
            text="View more matches"
            type="secondary"
            link={{ href: "/matches" }}
          />
        </section>
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
        <section className={clsx(styles.section__padded)}>
          <div className={clsx(styles.highlights)}>
            {match_highlights.slice(0, 3).map((highlight) => {
              return <VideoCard highlight={highlight} key={highlight.id} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
