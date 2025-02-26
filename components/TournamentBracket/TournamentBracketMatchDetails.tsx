import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";
import MatchTeamLogo from "../MatchCards/MatchTeamLogo";

function TournamentBracketMatchDetails({
	team,
	team_score,
	match_winner,
}: {
	team: { name: { short: string; long: string }; logo: string };
	team_score: number;
	match_winner: boolean;
}) {
	return (
		<tr
			className={clsx(
				styles["tournament-bracket__team"],
				match_winner
					? styles["tournament-bracket__team--winner"]
					: !team_score && team_score !== 0
					? styles["tournament-bracket__team--null"]
					: styles["tournament-bracket__team--loser"],
			)}
		>
			<td className={clsx(styles["tournament-bracket__country"])}>
				<abbr
					className={clsx(styles["tournament-bracket__code"])}
					title={team.name.long}
				>
					{team.name.short}
				</abbr>
				<MatchTeamLogo logo={team.logo} name={team.name.long} size="sm" />
			</td>
			<td className={clsx(styles["tournament-bracket__score"])}>
				<span className={clsx(styles["tournament-bracket__number"])}>
					{team_score || team_score === 0 ? team_score : "-"}
				</span>
			</td>
		</tr>
	);
}

export default TournamentBracketMatchDetails;
