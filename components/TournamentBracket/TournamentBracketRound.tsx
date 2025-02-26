import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import TournamentBracketList from "./TournamentBracketList";

function TournamentBracketRound({
	matches,
	phase = "quarterfinals",
}: {
	matches: IMatch[];
	phase: string;
}) {
	return (
		<div
			className={clsx(
				styles["tournament-bracket__round"],
				styles[`tournament-bracket__round--${phase}`],
			)}
		>
			<h3 className={clsx(styles["tournament-bracket__round-title"])}>
				{phase}
			</h3>
			<TournamentBracketList matches={matches} />
		</div>
	);
}

export default TournamentBracketRound;
