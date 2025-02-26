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
			isLink={false}
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
					? { href: `/match/${id}/preview` }
					: status === "completed"
					? { href: `/match/${id}/report` }
					: { href: "#" }
			}
		/>
	);
}

export default MatchBtn;
