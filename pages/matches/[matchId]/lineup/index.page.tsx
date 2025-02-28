import Card from "@/components/Cards/Card";
import CardBody from "@/components/Cards/CardBody";
import CardHeader from "@/components/Cards/CardHeader";
import MatchLayout from "@/components/Layouts/MatchLayout/MatchLayout";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import React from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import { match as placeholder_match } from "@/lib/placeholder-data";
import groupPlayersByPositions from "@/lib/groupPlayerByPositions";

function Lineup({ match }: { match: IMatch }) {
	const lineup = groupPlayersByPositions(
		["goalkeeper", "defender", "midfielder", "forward"],
		match.lineup,
	);

	const subs = groupPlayersByPositions(
		["goalkeeper", "defender", "midfielder", "forward"],
		match.substitutes,
	);

	return (
		<MatchLayout match={match} currentLink={`/matches/${match.id}/lineup`}>
			<div className={clsx(styles.lineup)}>
				<Card theme={"trans"}>
					<>
						<CardHeader theme={"dark"} border={true} type="div">
							<div className={clsx(styles.preview__heading)}>
								<Heading
									level={3}
									text="Composition"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div
								className={clsx(styles.preview__body, styles.p, styles.grid)}
							>
								<ul>
									{lineup.map((lineup_obj) => {
										return (
											<li className={clsx(styles["preview-item"], styles.col)}>
												<Text
													color="secondary"
													text={`${lineup_obj.position}s`}
													size="sm"
													upper={true}
													mb={"xs"}
												/>
												{lineup_obj.players.map((el) => {
													return (
														<Text
															color="white"
															text={`${el.squad_no}. ${el.name}`}
															size="base"
															mb="xs"
														/>
													);
												})}
											</li>
										);
									})}
								</ul>
								<ul>
									<li className={clsx(styles["preview-item"], styles.col)}>
										<Text
											color="secondary"
											text={"Coach"}
											size="sm"
											upper={true}
											mb={"xs"}
										/>
										<Text color="white" text={match.coach.name} size="base" />
									</li>
									<li className={clsx(styles["preview-item"], styles.col)}>
										<Text
											color="secondary"
											text={"Substitutes"}
											size="sm"
											upper={true}
											mb={"xs"}
										/>
										{subs.map((sub) => {
											return (
												<>
													{sub.players.map((el) => {
														return (
															<Text
																color="white"
																text={`${el.squad_no}. ${el.name}`}
																size="base"
																mb="xs"
															/>
														);
													})}
												</>
											);
										})}
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

export default Lineup;

export async function getServerSideProps(context: { query: { id: number } }) {
	console.log(context.query.id);
	const res_match = placeholder_match;

	return { props: { match: res_match } };
}
