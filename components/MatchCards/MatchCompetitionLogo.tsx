import React from "react";
import clsx from "clsx";
import Text from "../Typography/Text";
import MatchLogo from "./MatchLogo";

function MatchLeagueLogo({
	logo,
	name,
	size,
}: {
	logo: string;
	name: { short: string; long: string };
	size?: "sm" | "md" | "lg";
}) {
	return (
		<div className={clsx("flex items-center gap-sm")}>
			<MatchLogo logo={logo} name={name.long} size={size} />
			<Text text={name.short} color="light" upper={true} size={size} />
		</div>
	);
}

export default MatchLeagueLogo;
