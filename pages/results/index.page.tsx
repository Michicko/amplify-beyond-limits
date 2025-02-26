import Calendar from "@/components/Calendar/Calendar";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import CompetitionsLayout from "@/components/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/MatchCards/MatchCard";
import { match, match_list } from "@/lib/placeholder-data";
import React, { ReactElement } from "react";
import clsx from "clsx";

const seasons = [{ season: "2023/2024" }, { season: "2024/2025" }];
const matches = match_list.map((el) => match);

function Results() {
	return (
		<CompetitionsLayout
			pageTitle="Results"
			pageLead="All Results"
			seasons={seasons}
		>
			<>
				<Calendar />
				<div className={clsx("flex col gap-sm justify-start mt-xxl")}>
					{matches.map((match, i) => {
						return (
							<MatchCard
								match={match}
								no_btn={match.result_context === "" ? true : false}
								theme="light"
								key={(i + 3) * i + 2}
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

Results.getLayout = function getLayout(page: ReactElement) {
	return <GuestLayout>{page}</GuestLayout>;
};

export default Results;
