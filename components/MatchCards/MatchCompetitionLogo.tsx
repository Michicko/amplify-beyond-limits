import React from "react";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";
import styles from "./MatchCard.module.css";
import Text from "../Typography/Text";

function MatchLeagueLogo({
	logo,
	name,
}: {
	logo: string;
	name: { short: string; long: string };
}) {
	return (
		<div className={clsx("flex items-center gap-sm")}>
			<div className={clsx(styles["match__logo-box"])}>
				<ImageComp image={logo} alt={`${name.long} logo`} />
			</div>
			<Text text={name.short} color="light" upper={true} />
		</div>
	);
}

export default MatchLeagueLogo;
