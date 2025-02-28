import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import formatDate from "@/lib/formatDate";

function MatchDate({ date, size }: { date: string; size: "sm" | "md" | "lg" }) {
	return (
		<p className={clsx(styles["matchdate"], styles[size])}>
			{formatDate(date)}
		</p>
	);
}

export default MatchDate;
