import Card from "@/components/Cards/Card";
import CardBody from "@/components/Cards/CardBody";
import CardHeader from "@/components/Cards/CardHeader";
import Heading from "@/components/Typography/Heading";
import clsx from "clsx";
import styles from "../../Match.module.css";
import React from "react";
import { IMatch } from "@/lib/definitions";
import MatchLayout from "@/components/Layouts/MatchLayout/MatchLayout";
import { match as placeholder_match } from "@/lib/placeholder-data";
import MatchLogo from "@/components/MatchCards/MatchLogo";
import MatchScoreBoard from "@/components/MatchCards/MatchScoreBoard";
import Text from "@/components/Typography/Text";
import MatchStat from "@/components/MatchCards/MatchStat";

function Stats({ match }: { match: IMatch }) {
	return (
		<MatchLayout match={match} currentLink={`/matches/${match.id}/stats`}>
			<div className={clsx(styles.stats)}>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="General"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles.p)}>
								<ul>
									<li className={clsx(styles["preview-item"])}>
										<MatchLogo
											logo={match.home.logo}
											name={match.home.name}
											size="md"
										/>
										<div>
											<MatchScoreBoard
												home_score={match.result.home}
												away_score={match.result.away}
												size="md"
											/>
											<Text
												color="white"
												text={"Finished"}
												size="sm"
												mb="xs"
												center={true}
											/>
										</div>
										<MatchLogo
											logo={match.away.logo}
											name={match.away.name}
											size="md"
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Goal Attempts"
											home={match.stats.goal_attempts.total.home}
											away={match.stats.goal_attempts.total.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Shots on Goal"
											home={match.stats.goal_attempts.on.home}
											away={match.stats.goal_attempts.on.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Shots off Goal"
											home={match.stats.goal_attempts.off.home}
											away={match.stats.goal_attempts.off.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Big Chances"
											home={match.stats.big_chances.home}
											away={match.stats.big_chances.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Corner Kicks"
											home={match.stats.corners.home}
											away={match.stats.corners.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Offsides"
											home={match.stats.offside.home}
											away={match.stats.offside.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Fouls"
											home={match.stats.fouls.home}
											away={match.stats.fouls.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Yellow Cards"
											home={match.stats.booking.yellow.home}
											away={match.stats.booking.yellow.away}
										/>
									</li>
									<li
										className={clsx(
											styles["preview-item"],
											styles["no-border"],
										)}
									>
										<MatchStat
											stat="Red Cards"
											home={match.stats.booking.red.home}
											away={match.stats.booking.red.away}
										/>
									</li>
								</ul>
							</div>
						</CardBody>
					</>
				</Card>
			</div>
		</MatchLayout>
	);
}

export default Stats;

export async function getServerSideProps(context: { query: { id: number } }) {
	const res_match = placeholder_match;

	return { props: { match: res_match } };
}
