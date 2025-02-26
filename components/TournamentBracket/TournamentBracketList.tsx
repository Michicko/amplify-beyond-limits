import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import TournamentBracketItem from "./TournamentBracketItem";

function TournamentBracketList({ matches }: { matches: IMatch[] }) {
	return (
		<ul className={clsx(styles["tournament-bracket__list"])}>
			{matches.map((match) => {
				return <TournamentBracketItem match={match} key={match.id} />;
			})}
		</ul>
	);
}

export default TournamentBracketList;
