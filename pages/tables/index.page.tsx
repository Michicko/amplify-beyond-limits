import CompetitionFilters from "@/components/Competitions/CompetitionFilters";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import CompetitionsLayout from "@/components/Layouts/CompetitionsLayout/CompetitionsLayout";
import LayoutContainer from "@/components/Layouts/CompetitionsLayout/LayoutContainer";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Standing from "@/components/Standing/Standing";
import ButtonSwitch from "@/components/Switcher/ButtonSwitch";
import LinkSwitch from "@/components/Switcher/LinkSwitch";
import Switcher from "@/components/Switcher/Switcher";
import TournamentBracket from "@/components/TournamentBracket/TournamentBracket";
import Heading from "@/components/Typography/Heading";
import { competitions, standings, tccc } from "@/lib/placeholder-data";
import clsx from "clsx";
import React, { ReactElement, useState } from "react";

const seasons = [{ season: "2023/2024" }, { season: "2024/2025" }];
const links = [
	{ name: "fixtures", href: "/fixtures" },
	{ name: "results", href: "/results" },
	{ name: "tables", href: "/tables" },
];

function Tables() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const competition = competitions[currentIndex];
	const [phase, setPhase] = useState<string>(
		competition.phases[competition.phases.length - 1].phase,
	);

	const currentPhase = competition.phases.find((el) => el.phase === phase);

	const handleOnClick = () => {};

	return (
		<>
			<MainHeader
				bg={"/images/fixtures-layout-header-bg.png"}
				alt="2024 / 2025 ongoing campaign"
				overlay={true}
			>
				<LayoutHeader>
					<>
						<Heading
							text={competition?.name.long}
							color="white"
							level={1}
							letterCase="upper"
							center={true}
						/>
						<select name="season" id="season">
							{seasons.map((el) => {
								return (
									<option value={el.season} key={el.season}>
										{el.season}
									</option>
								);
							})}
						</select>
						{competition && (
							<select
								name="phase"
								id="phase"
								onChange={(e) => setPhase(e.target.value)}
							>
								{competition.phases.map((el) => {
									return (
										<option value={el.phase} key={el.phase}>
											{el.phase}
										</option>
									);
								})}
							</select>
						)}
					</>
				</LayoutHeader>
			</MainHeader>
			<LayoutMain>
				<>
					<div className={clsx("my-xl")}>
						<Switcher bg="white" theme="theme-2">
							<>
								{links.map((link) => {
									return (
										<LinkSwitch link={link} theme="theme-2" key={link.name} />
									);
								})}
							</>
						</Switcher>
					</div>
					<LayoutContainer>
						<div>
							<Switcher bg="trans" theme="theme-1">
								<>
									{competitions.map((comp, i) => {
										return (
											<ButtonSwitch
												index={i}
												currentIndex={currentIndex}
												setIndex={setCurrentIndex}
												text={comp.name.short}
												theme="theme-1"
												key={comp.name.short}
											/>
										);
									})}
								</>
							</Switcher>
							<div className={clsx("w-full x-auto mt-md")}>
								{competition.phase_type === "mixed" ? (
									<>
										{currentPhase?.phase === "league phase" && (
											<Standing
												showFull={true}
												standing={currentPhase.standing}
												showHeading={false}
											/>
										)}
										{currentPhase?.phase === "playoffs" && (
											<TournamentBracket phases={currentPhase.rounds} />
										)}
									</>
								) : competition.phase_type === "league" ? (
									<Standing
										showFull={true}
										standing={competition.phases[0].standing}
										showHeading={false}
									/>
								) : (
									<TournamentBracket phases={competition.phases[0].rounds} />
								)}
							</div>
						</div>
					</LayoutContainer>
				</>
			</LayoutMain>
		</>
	);
}

Tables.getLayout = function getLayout(page: ReactElement) {
	return <GuestLayout>{page}</GuestLayout>;
};

export default Tables;

// export async function getServerSideProps() {
// 	const res_competitions = competitions;
// 	const tables = standings;

// 	return { props: { competitions: res_competitions, tables } };
// }
