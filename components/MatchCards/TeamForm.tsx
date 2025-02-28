import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function TeamForm({ form }: { form: "w" | "l" | "d" }) {
	return (
		<div className={clsx(styles["team-form"], styles[form])}>
			<p>{form}</p>
		</div>
	);
}

export default TeamForm;
