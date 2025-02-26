import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";

function TournamentBracketUpcoming() {
	return (
		<>
			<td className={clsx(styles["tournament-bracket__country"])}>
				<abbr className={clsx(styles["tournament-bracket__code"])} title="Team">
					T
				</abbr>
				<div className={clsx(styles["dummy-team__logo"])}></div>
			</td>
			<td className={clsx(styles["tournament-bracket__score"])}>
				<span className={clsx(styles["tournament-bracket__number"])}>-</span>
			</td>
		</>
	);
}

export default TournamentBracketUpcoming;
