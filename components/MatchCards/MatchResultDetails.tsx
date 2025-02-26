import React from "react";
import clsx from "clsx";
import Text from "../Typography/Text";
import MatchBtn from "./MatchBtn";

function MatchResultDetails({
	home_score,
	away_score,
	no_btn,
	status,
	id,
}: {
	home_score: number;
	away_score: number;
	no_btn: boolean;
	status: string;
	id: number;
}) {
	return (
		<div className={clsx("flex col items-center")}>
			<div className={clsx("flex items-center gap-base")}>
				<Text text={home_score} color="light" upper={true} size="lg" />
				<Text text={"-"} color="light" upper={true} size="lg" />
				<Text text={away_score} color="light" upper={true} size="lg" />
			</div>
			{!no_btn && (
				<div className={clsx("mt-xl")}>
					<MatchBtn status={status} id={id} />
				</div>
			)}
		</div>
	);
}

export default MatchResultDetails;
