import React, { useState } from "react";
import FilterBtns from "../Filters/FilterBtns";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"November",
	"December",
];

function Calendar() {
	const date = new Date();
	const month = date.getUTCMonth();

	return <FilterBtns initial={month} list={months} name="month" />;
}

export default Calendar;
