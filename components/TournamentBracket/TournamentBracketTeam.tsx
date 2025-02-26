import React from "react";
import MatchTeamLogo from "../MatchCards/MatchTeamLogo";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";

function TournamentBracketTeam({
	name,
	logo,
	score,
}: {
	name: { short: string; long: string };
	logo: string;
	score: number;
}) {
	return (
		<tr
			className={clsx(
				styles["tournament-bracket__team"],
				styles["tournament-bracket__team--winner"],
			)}
		>
			<td className={clsx(styles["tournament-bracket__club"])}>
				<abbr
					className={clsx(styles["tournament-bracket__code"])}
					title={name.long || ""}
				>
					{name.short}
				</abbr>
				<MatchTeamLogo
					logo={logo || "/images/footerlogo.png"}
					name={name.long || ""}
				/>
			</td>
			<td className={clsx(["tournament-bracket__score"])}>
				<span className={clsx(styles["tournament-bracket__number"])}>
					{score || ""}
				</span>
			</td>
		</tr>
	);
}

export default TournamentBracketTeam;
