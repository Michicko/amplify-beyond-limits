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
import TeamForm from "@/components/MatchCards/TeamForm";

function Preview({ match }: { match: IMatch }) {
	return (
		<MatchLayout match={match} currentLink={`/matches/${match.id}/preview`}>
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
								<Text
									color="white"
									text={`At Beyond the Limits, we pride ourselves on our accomplishments. 
              Our devotion to developing young, talented players and pushing the boundaries has earned us numerous
              prestigious honours.`}
									size="base"
								/>
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
									text="Team Form"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles["py-b"])}>
								<ul className={clsx(styles["team-form__list"])}>
									<li className={clsx(styles["preview-item"])}>
										<Text color="white" text={match.home.name} size="base" />
										<div className={clsx(styles["team-form"])}>
											{match.form.home.map((el, i) => {
												return <TeamForm form={el} key={match.id + i} />;
											})}
										</div>
									</li>

									<li className={clsx(styles["preview-item"])}>
										<Text color="white" text={match.away.name} size="base" />
										<div className={clsx(styles["team-form"])}>
											{match.form.away.map((el, i) => {
												return <TeamForm form={el} key={match.id + (i + 2)} />;
											})}
										</div>
									</li>
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
									text="key players to watch"
									letterCase="upper"
									color="secondary"
								/>
							</div>
						</CardHeader>
						<CardBody type="div" theme={"light"}>
							<div className={clsx(styles.preview__body, styles.p)}>
								<Text
									color="secondary"
									text={`${match.players_to_watch.players
										.map((el) => el.name)
										.join(", ")}`}
									size="sm"
									upper={true}
									mb={"xs"}
								/>
								<Text
									color="white"
									text={match.players_to_watch.note}
									size="base"
								/>
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

export default Preview;

// Sample data fetching
export async function getServerSideProps(context: { query: { id: number } }) {
	console.log(context.query.id);
	const res_match = placeholder_match;

	return { props: { match: res_match } };
}
