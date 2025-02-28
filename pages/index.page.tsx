import ArticleList from "@/components/Article/ArticleList";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import MainHeader from "@/components/MainHeader/MainHeader";
import MatchCard from "@/components/MatchCards/MatchCard";
import PlayerList from "@/components/Player/PlayerList";
import SectionHeader from "@/components/Section/SectionHeader";
import Standing from "@/components/Standing/Standing";
import VideoCards from "@/components/VideoCard/VideoCards";
import {
  articles,
  match,
  match_2,
  match_highlights,
  players,
  standing,
} from "@/lib/placeholder-data";
import populateArticles from "@/lib/populateArticle";
import clsx from "clsx";

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
          <MatchCard match={match} heading={"Previous Match"} no_btn={false} />
          <MatchCard match={match_2} heading={"Next Match"} />
          <Standing showFull={false} standing={standing} showHeading={true} />
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
          <PlayerList players={players.slice(0, 3)} />
        </section>
        <Container type="section" centered={true} size="md" space_top={true}>
          <>
            <SectionHeader
              heading={"Upcoming matches"}
              no_link={true}
              center={true}
              letterCase="capitalize"
            />
            <Container type="div" grid={true}>
              <>
                <MatchCard match={match_2} no_btn={true} theme="dark" />
                <MatchCard match={match_2} no_btn={true} />
                <MatchCard match={match_2} no_btn={true} theme="dark" />
              </>
            </Container>
            <Button
              isLink={true}
              text="View more matches"
              type="secondary"
              link={{ href: "/fixtures" }}
            />
          </>
        </Container>
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
        <Container type="section">
          <Container type="div" size="md">
            <VideoCards videos={match_highlights.slice(0, 3)} />
          </Container>
        </Container>
      </main>
    </>
  );
};

export default Home;
