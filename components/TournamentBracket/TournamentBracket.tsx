import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";
import TournamentBracketRound from "./TournamentBracketRound";

function TournamentBracket({ phases }) {
	return (
		<div className={clsx(styles.container)}>
			<div
				className={clsx(
					styles["tournament-bracket"],
					styles["tournament-bracket--rounded"],
				)}
			>
				{phases.map((round) => {
					return (
						<TournamentBracketRound
							matches={round.matches}
							phase={round.round}
							key={round.round}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default TournamentBracket;
