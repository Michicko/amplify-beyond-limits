import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Heading from "../Typography/Heading";
import Card from "../Cards/Card";
import CardHeader from "../Cards/CardHeader";
import ImageComp from "../ImageComp/ImageComp";
import Text from "../Typography/Text";
import CardBody from "../Cards/CardBody";
import { IMatch } from "@/lib/definitions";
import Button from "../Button/Button";
import formatDate from "@/lib/formatDate";

const MatchSmallCard = ({
  heading,
  match,
  no_btn,
}: {
  heading: string;
  match: IMatch;
  no_btn?: boolean;
}) => {
  return (
    <div className={clsx(styles["match__sm-card"])}>
      <Heading level={2} text={heading} />
      <Card theme="trans">
        <>
          <CardHeader theme="light" border={true} type="div">
            <div
              className={clsx(
                "w-full h-full px-lg flex items-center justify-between"
              )}
            >
              <div className={clsx("flex items-center gap-sm")}>
                <div className={clsx(styles["match__logo-box"])}>
                  <ImageComp
                    image={match.competition.logo}
                    alt={`${match.competition.name} logo`}
                  />
                </div>
                <Text
                  text={`${match.competition.name} ${match.competition.type}`}
                  color="light"
                  upper={true}
                />
              </div>
              <Text text={formatDate(match.date)} color="light" upper={true} />
            </div>
          </CardHeader>
          <CardBody type="div">
            <div className={clsx(styles["match__body-box"])}>
              <div
                className={clsx("flex items-center gap-base justify-between")}
              >
                <div className={clsx(styles["match__team-logo-box"])}>
                  <div className={clsx(styles["match__team-logo"])}>
                    <ImageComp
                      image={match.home.logo}
                      alt={`${match.home.name} logo`}
                    />
                  </div>
                </div>
                {match.status === "upcoming" ? (
                  <>
                    <div className={clsx("")}>
                      <Text
                        text={formatDate(match.date)}
                        color="light"
                        upper={true}
                        size="md"
                        center={true}
                      />
                      <Text
                        text={match.time}
                        color="light"
                        upper={false}
                        size="xs"
                        center={true}
                      />
                      <Text
                        text={match.location}
                        color="light"
                        upper={false}
                        size="xs"
                        center={true}
                      />
                    </div>
                  </>
                ) : match.status === "completed" ? (
                  <div className={clsx("flex items-center gap-base")}>
                    <Text
                      text={match.result.home}
                      color="light"
                      upper={true}
                      size="lg"
                    />
                    <Text text={"-"} color="light" upper={true} size="lg" />
                    <Text
                      text={match.result.away}
                      color="light"
                      upper={true}
                      size="lg"
                    />
                  </div>
                ) : (
                  <div className={clsx("flex items-center gap-base")}>
                    <Text
                      text={match.result.home}
                      color="light"
                      upper={true}
                      size="lg"
                    />
                    <Text text={"-"} color="light" upper={true} size="lg" />
                    <Text
                      text={match.result.away}
                      color="light"
                      upper={true}
                      size="lg"
                    />
                  </div>
                )}
                <div className={clsx(styles["match__team-logo-box"])}>
                  <div className={clsx(styles["match__team-logo"])}>
                    <ImageComp
                      image={match.away.logo}
                      alt={`${match.away.name} logo`}
                    />
                  </div>
                </div>
              </div>
              {!no_btn && (
                <Button
                  isLink={false}
                  text={
                    match.status === "upcoming"
                      ? "Match Preview"
                      : "Match Report"
                  }
                  type="secondary"
                  link={
                    match.status === "upcoming"
                      ? { href: `/match/${match.id}/preview` }
                      : { href: `/match/${match.id}/report` }
                  }
                />
              )}
            </div>
          </CardBody>
        </>
      </Card>
    </div>
  );
};

export default MatchSmallCard;
