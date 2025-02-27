import GuestLayout from "@/components/GuestLayout/GuestLayout";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import PlayerList from "@/components/Player/PlayerList";
import Heading from "@/components/Typography/Heading";
import { IPlayer } from "@/lib/definitions";
import { players } from "@/lib/placeholder-data";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styles from "./Player.module.css";
import clsx from "clsx";

interface IPos {
	position: string;
	players: IPlayer[];
}

function Players() {
	const router = useRouter();
	const { teamSlug } = router.query;
	let positions = ["goalkeeper", "defender", "midfielder", "winger", "forward"];

	const rows: IPos[] = [];

	players.forEach((player) => {
		const pos = rows.find((role) => role.position === player.position.long);
		if (!pos) {
			rows.push({
				position: player.position.long,
				players: [player],
			});
		} else {
			pos.players.push(player);
		}
	});

	positions = positions.map((el) => {
		const pos = rows.find(
			(col) => col.position.toLowerCase() === el.toLowerCase(),
		);
		if (pos) return pos;
		return el;
	});

	console.log(positions);

	const player_rows = positions.map((pos) => {
		return (
			<div key={pos.position}>
				<Heading level={2} text={`${pos.position}s`} />
				<PlayerList players={pos.players} />
			</div>
		);
	});

	return (
		<>
			<MainHeader
				bg={"/images/under-19-bg.png"}
				alt="2024 / 2025 ongoing campaign"
				overlay={true}
			>
				<LayoutHeader>
					<>
						<Heading
							text={`Beyond Limits ${teamSlug}`}
							color="white"
							level={1}
							letterCase="upper"
						/>
					</>
				</LayoutHeader>
			</MainHeader>
			<LayoutMain>
				<div className={clsx(styles["team-container"])}>{player_rows}</div>
			</LayoutMain>
		</>
	);
}

Players.getLayout = function getLayout(page: ReactElement) {
	return <GuestLayout>{page}</GuestLayout>;
};

export default Players;
