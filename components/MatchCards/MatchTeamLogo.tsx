import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";

function MatchTeamLogo({
	name,
	logo,
	size,
}: {
	name: string;
	logo: string;
	size?: "sm" | "normal";
}) {
	return (
		<div className={clsx(styles["match__team-logo-box"], size && styles[size])}>
			<div className={clsx(styles["match__team-logo"])}>
				<ImageComp image={logo} alt={`${name} logo`} />
			</div>
		</div>
	);
}

export default MatchTeamLogo;
