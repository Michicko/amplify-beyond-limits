import React from "react";
import Text from "../Typography/Text";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import MatchBtn from "./MatchBtn";

function MatchFixtureDetails({
	time,
	location,
	status,
	no_btn,
	id,
}: {
	time: string;
	location: string;
	no_btn: boolean;
	status: string;
	id: number;
}) {
	return (
		<div className={clsx("flex col items-center")}>
			<div className={clsx(styles["match__fixture-details"])}>
				<Text text={time} color="light" upper={false} size="md" center={true} />
				<Text
					text={location}
					color="light"
					upper={false}
					size="xs"
					center={true}
				/>
			</div>
			{!no_btn && (
				<div className={clsx("mt-xl")}>
					<MatchBtn status={status} id={id} />
				</div>
			)}
		</div>
	);
}

export default MatchFixtureDetails;
