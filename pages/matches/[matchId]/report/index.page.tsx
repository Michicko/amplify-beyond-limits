import MatchLayout from "@/components/Layouts/MatchLayout/MatchLayout";
import { IMatch } from "@/lib/definitions";
import { match as placeholder_match } from "@/lib/placeholder-data";
import React from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import Card from "@/components/Cards/Card";
import CardHeader from "@/components/Cards/CardHeader";
import CardBody from "@/components/Cards/CardBody";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import MatchScoreTime from "@/components/MatchCards/MatchScoreTime";

function Report({ match }: { match: IMatch }) {
	return (
		<MatchLayout match={match} currentLink={`/matches/${match.id}/report`}>
			<div className={clsx(styles.preview)}>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="Match Context"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles.p)}>
								<Text color="white" text={match.result_context} size="base" />
							</div>
						</CardBody>
					</>
				</Card>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="Goal Scorers"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles["py-b"])}>
								<ul className={clsx(styles["team-form__list"])}>
									{match.scorers.map((scorer) => {
										if (scorer.scorer.team === "BLFC") {
											return (
												<li className={clsx(styles["preview-item"])}>
													<Text
														color="white"
														text={scorer.scorer.name}
														size="base"
													/>
													<MatchScoreTime time={scorer.time} />
												</li>
											);
										}
										return (
											<li className={clsx(styles["preview-item"], styles.col)}>
												<Text color="secondary" text={"Oponent"} size="sm" />
												<div className={clsx(styles["match-score-tile"])}>
													<Text
														color="white"
														text={scorer.scorer.name}
														size="sm"
													/>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</CardBody>
					</>
				</Card>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="Man of the match"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles.p)}>
								<Text
									color="secondary"
									text={match.mvp.name}
									size="sm"
									upper={true}
									mb={"xs"}
								/>
								<Text color="white" text={match.mvp.note} size="base" />
							</div>
						</CardBody>
					</>
				</Card>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="Brief"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles["py-b"])}>
								<ul className={clsx(styles["preview-list"])}>
									<li className={clsx(styles["preview-item"], styles.col)}>
										<Text
											color="secondary"
											text={"Competition"}
											size="sm"
											upper={true}
										/>
										<Text
											color="white"
											text={match.competition.name.long}
											size="base"
											upper={true}
										/>
									</li>
									<li className={clsx(styles["preview-item"], styles.col)}>
										<Text
											color="secondary"
											text={"Location"}
											size="sm"
											upper={true}
										/>
										<Text
											color="white"
											text={match.location}
											size="base"
											upper={true}
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

export default Report;

// Sample data fetching
export async function getServerSideProps(context: { query: { id: number } }) {
	console.log(context.query.id);
	const res_match = placeholder_match;

	return { props: { match: res_match } };
}
