import { useRouter } from "next/router";
import React from "react";
import clsx from "clsx";
import styles from "./Search.module.css";
import Heading from "@/components/Typography/Heading";

function Search() {
	const router = useRouter();

	return (
		<div className={clsx(styles.search)}>
			<Heading
				level={1}
				text={`Search Results for "${router.query.q}"`}
				color="white"
				center={true}
				letterCase="normal"
			/>
			<div className={clsx(styles["search-body"])}>
				<div className={clsx(styles["search-results"])}>
					<p>No results found.</p>
				</div>
			</div>
		</div>
	);
}

export default Search;
