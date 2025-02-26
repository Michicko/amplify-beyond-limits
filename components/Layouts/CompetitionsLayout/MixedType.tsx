import MainHeader from "@/components/MainHeader/MainHeader";
import React from "react";
import LayoutHeader from "./LayoutHeader";
import Heading from "@/components/Typography/Heading";
import LayoutMain from "./LayoutMain";
import Switcher from "@/components/Switcher/Switcher";
import LayoutContainer from "./LayoutContainer";
import { ISeason } from "@/types/auth";
import { ILink } from "@/lib/definitions";

function MixedType({
	headerBg,
	pageTitle,
	seasons,
	children,
	links,
}: {
	headerBg?: string;
	pageTitle: string;
	seasons: ISeason[];
	children: React.ReactElement;
	links: ILink[];
}) {
	const phases = [
		{
			name: "league phase",
			value: "league-phase",
		},
		{
			name: "play offs",
			value: "play-offs",
		},
	];
	return (
		<>
			<MainHeader
				bg={headerBg || "/images/fixtures-layout-header-bg.png"}
				alt="2024 / 2025 ongoing campaign"
				overlay={true}
			>
				<LayoutHeader>
					<>
						<Heading
							text={pageTitle}
							color="white"
							level={1}
							letterCase="upper"
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
						<select name="season" id="season">
							{phases.map((el) => {
								return (
									<option value={el.value} key={el.value}>
										{el.name}
									</option>
								);
							})}
						</select>
					</>
				</LayoutHeader>
			</MainHeader>
			<LayoutMain>
				<>
					<Switcher bg="white" links={links} theme="theme-2" />
					<LayoutContainer>{children}</LayoutContainer>
				</>
			</LayoutMain>
		</>
	);
}

export default MixedType;
