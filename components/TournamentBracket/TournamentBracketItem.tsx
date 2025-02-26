import React from "react";
import styles from "./TournamentBracket.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import Link from "next/link";
import TournamentBracketMatchDetails from "./TournamentBracketMatchDetails";

function TournamentBracketItem({ match }: { match: IMatch }) {
	return (
		<li className={clsx(styles["tournament-bracket__item"])}>
			<Link
				className={clsx(styles["tournament-bracket__match"])}
				tabIndex={0}
				href={`/results/${match.id}`}
			>
				<table className={clsx(styles["tournament-bracket__table"])}>
					<thead className={clsx(styles["sr-only"])}>
						<tr>
							<th>Team</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody className={clsx(styles["tournament-bracket__content"])}>
						<TournamentBracketMatchDetails
							match_winner={
								match.result.home > match.result.away ||
								(match.result?.penalties &&
									match.result.penalties.home > match.result.penalties.away)
							}
							team={match.home}
							team_score={match.result.home}
						/>
						<TournamentBracketMatchDetails
							match_winner={
								match.result.away > match.result.home ||
								(match.result?.penalties &&
									match.result.penalties.away > match.result.penalties.home)
							}
							team={match.away}
							team_score={match.result.away}
						/>
					</tbody>
				</table>
			</Link>
		</li>
	);
}

export default TournamentBracketItem;
