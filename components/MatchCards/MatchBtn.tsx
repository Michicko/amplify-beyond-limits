import React from "react";
import Button from "../Button/Button";

function MatchBtn({
	status,
	id,
}: {
	status: "upcoming" | "completed" | "canceled";
	id: number;
}) {
	return (
		<Button
			isLink={true}
			text={
				status === "upcoming"
					? "Match Preview"
					: status === "completed"
					? "Match Report"
					: "-"
			}
			type="secondary"
			link={
				status === "upcoming"
					? { href: `/matches/${id}/preview` }
					: status === "completed"
					? { href: `/matches/${id}/report` }
					: { href: "#" }
			}
		/>
	);
}

export default MatchBtn;
