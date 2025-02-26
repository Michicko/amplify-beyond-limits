import React from "react";
import styles from "./Filters.module.css";
import clsx from "clsx";

function FilterBtn({
	filterName,
	filterValue,
	index,
	currentIndex,
	setCurrentIndex,
}: {
	filterName: string;
	filterValue: string;
	index: number;
	currentIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
	const selectFilterValue = () => {
		setCurrentIndex(index);
	};

	return (
		<button
			className={clsx(styles.filter__btn, {
				[styles.current]: currentIndex === index,
			})}
			onClick={selectFilterValue}
		>
			{filterValue}
		</button>
	);
}

export default FilterBtn;
