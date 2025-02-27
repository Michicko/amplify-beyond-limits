import React from "react";
import clsx from "clsx";
import styles from "./socials.module.css";
import ShareButton from "../Button/ShareButton";

function SocialShareLinks({ url, text }: { url: string; text: string }) {
	const links = [
		{
			name: "facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				url,
			)}`,
			icon: "/images/simple-line-icons_social-facebook.svg",
		},
		{
			name: "twitter",
			href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
				url,
			)}&text=${encodeURIComponent(text)}`,
			icon: "/images/pajamas_twitter.svg",
		},
		// {
		// 	name: "whatsapp",
		// 	href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
		// 		text + " " + url,
		// 	)}`,
		// 	icon: ''
		// },
	];
	return (
		<div className={clsx(styles["social-share-links"])}>
			{links.map((link) => {
				return (
					<ShareButton name={link.name} href={link.href} icon={link.icon} />
				);
			})}
		</div>
	);
}

export default SocialShareLinks;
