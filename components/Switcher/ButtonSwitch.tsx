import React from "react";
import styles from "./Switcher.module.css";
import clsx from "clsx";

function ButtonSwitch({
	theme,
	text,
	currentIndex,
	index,
	setIndex,
	handleOnclick,
	disabled,
}: {
	theme: "theme-1" | "theme-2";
	text: string;
	currentIndex: number;
	index: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
	handleOnclick?: () => void;
	disabled?: boolean;
}) {
	return (
		<button
			onClick={() => {
				setIndex(index);
				handleOnclick && handleOnclick();
			}}
			className={clsx(styles.switch, styles.btn, styles[theme], {
				[styles.current]: currentIndex === index,
			})}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default ButtonSwitch;
