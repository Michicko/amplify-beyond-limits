import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";
import { visuals } from "@/lib/placeholder-data";
import ImageComp from "@/components/ImageComp/ImageComp";

function Gallery({ visuals }: { visuals: string[] }) {
	return (
		<div className={clsx(styles.gallery)}>
			{visuals.map((visual) => {
				return (
					<div className={clsx(styles.visual)}>
						<ImageComp
							image={visual}
							alt=""
							placeholder="visual"
							priority={false}
							key={visual}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default Gallery;

// Sample data fetching
export async function getServerSideProps(context: { query: { id: number } }) {
	console.log(context.query.id);
	const res_visuals = visuals;

	return { props: { visuals: res_visuals } };
}
