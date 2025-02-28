import GuestLayout from "@/components/GuestLayout/GuestLayout";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import PlayerList from "@/components/Player/PlayerList";
import Heading from "@/components/Typography/Heading";
import { players } from "@/lib/placeholder-data";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styles from "./Player.module.css";
import clsx from "clsx";
import groupPlayersByPositions from "@/lib/groupPlayerByPositions";

function Players() {
	const router = useRouter();
	const { playersSlug } = router.query;

	const player_rows = groupPlayersByPositions(
		["goalkeeper", "defender", "midfielder", "winger", "forward"],
		players,
	).map((pos) => {
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
							text={`Beyond Limits ${playersSlug}`}
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
