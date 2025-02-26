import Calendar from "@/components/Calendar/Calendar";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import CompetitionsLayout from "@/components/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/MatchCards/MatchCard";
import { match_2, match_list } from "@/lib/placeholder-data";
import React, { ReactElement } from "react";
import clsx from "clsx";

const seasons = [{ season: "2023/2024" }, { season: "2024/2025" }];
const matches = match_list.map((el, i) => {
	if (i > 0) {
		return { ...match_2, preview: "", result_context: "" };
	}
	return match_2;
});

function Fixtures() {
	return (
		<CompetitionsLayout
			pageTitle="Fixtures"
			pageLead="All fixtures"
			seasons={seasons}
		>
			<>
				<Calendar />
				<div className={clsx("flex col gap-sm justify-start mt-xxl")}>
					{matches.map((match, i) => {
						return (
							<MatchCard
								match={match}
								no_btn={match.preview === "" ? true : false}
								theme="light"
								key={(i + 2) * i + 3}
								showName={true}
								padded={true}
							/>
						);
					})}
				</div>
			</>
		</CompetitionsLayout>
	);
}

Fixtures.getLayout = function getLayout(page: ReactElement) {
	return <GuestLayout>{page}</GuestLayout>;
};

export default Fixtures;
