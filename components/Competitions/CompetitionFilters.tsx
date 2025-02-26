import React from "react";
import { competitions } from "../../lib/placeholder-data";
import FilterBtns from "../Filters/FilterBtns";

function CompetitionFilters() {
	const competitionNames = competitions.map((el) => el.name.short);

	return <FilterBtns initial={0} list={competitionNames} name="competition" />;
}

export default CompetitionFilters;
