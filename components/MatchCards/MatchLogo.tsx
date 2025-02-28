import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";

function MatchLogo({
	name,
	logo,
	size,
}: {
	name: string;
	logo: string;
	size?: "sm" | "md" | "lg";
}) {
	return (
		<div className={clsx(styles["match-team__logo-bg"], size && styles[size])}>
			<div className={clsx(styles["match-team__logo"])}>
				<ImageComp image={logo} alt={`${name} logo`} />
			</div>
		</div>
	);
}

export default MatchLogo;
