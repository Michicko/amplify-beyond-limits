import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";

function MatchScoreTime({ time }: { time: string }) {
	return (
		<div className={clsx(styles["match-score-tile"])}>
			<Text color="primary" text={time} size="base" />
		</div>
	);
}

export default MatchScoreTime;
