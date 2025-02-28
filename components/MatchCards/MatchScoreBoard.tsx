import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function MatchScoreBoard({
	home_score,
	away_score,
	size,
}: {
	home_score: number;
	away_score: number;
	size: "sm" | "md" | "lg";
}) {
	return (
		<div className={clsx(styles["matchscoreboard"], styles[size])}>
			<p>{home_score}</p>
			<div className={clsx(styles.versus)}></div>
			<p>{away_score}</p>
		</div>
	);
}

export default MatchScoreBoard;
