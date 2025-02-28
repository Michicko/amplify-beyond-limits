import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function MatchStat({
	home,
	away,
	stat,
}: {
	home: number;
	away: number;
	stat: string;
}) {
	const scale = home === away ? "equal" : "";

	const getWidth = (num: number) => {
		const total = home + away;
		return total === 0 ? 0 : Math.floor(100 / total) * num;
	};

	return (
		<div className={clsx(styles["match-stat"])}>
			<p className={clsx(styles[scale], home > away && styles.greater)}>
				{home}
				<span
					className={clsx(
						styles.line,
						styles.home,
						styles[scale],
						home > away && styles.greater,
						away > home && styles.less,
					)}
					style={{ width: `${getWidth(home)}%` }}
				></span>
			</p>
			<p>{stat}</p>
			<p className={clsx(styles[scale])}>
				{away}
				<span
					className={clsx(
						styles.line,
						styles.away,
						styles[scale],
						away > home && styles.greater,
						home > away && styles.less,
					)}
					style={{ width: `${getWidth(away)}%` }}
				></span>
			</p>
		</div>
	);
}

export default MatchStat;
