import React from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import Switcher from "@/components/Switcher/Switcher";
import LinkSwitch from "@/components/Switcher/LinkSwitch";
import MatchLogo from "@/components/MatchCards/MatchLogo";
import MatchScoreBoard from "@/components/MatchCards/MatchScoreBoard";
import MatchDate from "@/components/MatchCards/MatchDate";
import MatchLocation from "@/components/MatchCards/MatchLocation";
import MatchCompetitionLogo from "@/components/MatchCards/MatchCompetitionLogo";
import Heading from "@/components/Typography/Heading";

const generateLink = (matchId: number) => {
	const links = [
		{
			name: "preview",
			href: `/matches/${matchId}/preview`,
		},
		{
			name: "report",
			href: `/matches/${matchId}/report`,
		},
		{
			name: "lineup",
			href: `/matches/${matchId}/lineup`,
		},
		{
			name: "stats",
			href: `/matches/${matchId}/stats`,
		},
	];

	return links;
};

function MatchLayout({
	match,
	children,
	currentLink,
}: {
	match: IMatch;
	children: React.ReactElement;
	currentLink: string;
}) {
	return (
		<div className={clsx(styles["match-layout"])}>
			<div className={clsx(styles["match-layout__header-box"])}>
				<div className={clsx(styles["match-layout__header"])}>
					<MatchLogo logo={match.home.logo} name={match.home.name} size="lg" />
					<div className={clsx(styles["match-header__details"])}>
						<MatchDate date={match.date} size="lg" />
						<MatchScoreBoard
							home_score={match.result.home}
							away_score={match.result.away}
							size="lg"
						/>
						<MatchLocation
							hightlight={true}
							location={match.location}
							size="sm"
						/>
					</div>
					<MatchLogo logo={match.away.logo} name={match.away.name} size="lg" />
				</div>
				<Heading
					text={`${match.home.name} vs ${match.away.name}`}
					color="white"
					level={1}
					letterCase="upper"
					center={true}
				/>
				<MatchCompetitionLogo
					logo={match.competition.logo}
					name={match.competition.name}
					size="md"
				/>
			</div>

			<Switcher bg="white" theme="theme-1">
				<>
					{generateLink(match.id).map((link) => {
						return (
							<LinkSwitch
								link={link}
								theme="theme-2"
								key={link.name}
								currentLink={currentLink}
							/>
						);
					})}
				</>
			</Switcher>
			<div className={clsx(styles["match-layout__main"])}>{children}</div>
		</div>
	);
}

export default MatchLayout;
