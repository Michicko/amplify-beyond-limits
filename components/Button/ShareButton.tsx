import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import ImageComp from "../ImageComp/ImageComp";

function ShareButton({
	name,
	href,
	icon,
}: {
	name: string;
	href: string;
	icon: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={clsx(styles.btn, styles["share-btn"])}
		>
			<div className={clsx(styles["btn-img-box"])}>
				<ImageComp
					image={icon}
					placeholder={icon}
					priority={false}
					alt={name}
				/>
			</div>
			{name}
		</a>
	);
}

export default ShareButton;
