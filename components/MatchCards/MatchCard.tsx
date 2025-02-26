import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Heading from "../Typography/Heading";
import Card from "../Cards/Card";
import CardHeader from "../Cards/CardHeader";
import Text from "../Typography/Text";
import CardBody from "../Cards/CardBody";
import { IMatch } from "@/lib/definitions";
import formatDate from "@/lib/formatDate";
import MatchTeamLogo from "./MatchTeamLogo";
import MatchFixtureDetails from "./MatchFixtureDetails";
import MatchResultDetails from "./MatchResultDetails";
import MatchCompetitionLogo from "./MatchCompetitionLogo";

const MatchCard = ({
  heading,
  match,
  no_btn,
  theme,
  showName,
  padded,
}: {
  heading?: string;
  match: IMatch;
  no_btn?: boolean;
  theme?: "dark" | "light" | "trans";
  showName?: boolean;
  padded?: boolean;
}) => {
  return (
    <div className={clsx(styles["match__sm-card"])}>
      {heading && <Heading level={2} text={heading} />}
      <Card theme={theme || "trans"}>
        <>
          <CardHeader theme={theme ? theme : "light"} border={true} type="div">
            <div
              className={clsx(
                "w-full h-full px-lg flex items-center justify-between",
              )}
            >
              <MatchCompetitionLogo
                logo={match.competition.logo}
                name={match.competition.name}
              />
              <Text text={formatDate(match.date)} color="light" upper={true} />
            </div>
          </CardHeader>
          <CardBody type="div" theme={theme ? theme : "light"}>
            <div
              className={clsx(
                styles["match__body-box"],
                padded && styles["xtra-padded"],
              )}
            >
              <div
                className={clsx("flex items-center gap-base justify-between")}
              >
                <div
                  className={clsx(
                    "flex items-center gap-base",
                    !no_btn ? "self-start" : "self-center",
                  )}
                >
                  {showName && (
                    <Text
                      text={match.home.name}
                      color="light"
                      upper={false}
                      size="base"
                      center={true}
                      hide_on_sm={true}
                    />
                  )}
                  <MatchTeamLogo
                    logo={match.home.logo}
                    name={match.home.name}
                  />
                </div>
                {match.status === "upcoming" ? (
                  <MatchFixtureDetails
                    time={match.time}
                    location={match.location}
                    no_btn={no_btn}
                    status={match.status}
                    id={match.id}
                  />
                ) : match.status === "completed" ? (
                  <MatchResultDetails
                    home_score={match.result.home}
                    away_score={match.result.away}
                    no_btn={no_btn}
                    status={match.status}
                    id={match.id}
                  />
                ) : (
                  <div className={clsx("flex items-center gap-base")}>
                    <Text text={"-"} color="light" upper={true} size="lg" />
                    <Text text={"-"} color="light" upper={true} size="lg" />
                    <Text text={"-"} color="light" upper={true} size="lg" />
                  </div>
                )}
                <div
                  className={clsx(
                    "flex items-center gap-base",
                    !no_btn ? "self-start" : "self-center",
                  )}
                >
                  <MatchTeamLogo
                    logo={match.away.logo}
                    name={match.away.name}
                  />
                  {showName && (
                    <Text
                      text={match.away.name}
                      color="light"
                      upper={false}
                      size="base"
                      center={false}
                      hide_on_sm={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </>
      </Card>
    </div>
  );
};

export default MatchCard;
