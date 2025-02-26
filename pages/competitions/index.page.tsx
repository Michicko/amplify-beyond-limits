import GuestLayout from "@/components/GuestLayout/GuestLayout";
import { ICompetition } from "@/lib/definitions";
import { competitions as comps } from "@/lib/placeholder-data";
import React, { ReactElement } from "react";
import styles from "./Competitions.module.css";
import clsx from "clsx";
import ImageComp from "@/components/ImageComp/ImageComp";
import CompetitionsLayout from "@/components/Layouts/CompetitionsLayout/CompetitionsLayout";

function Competitions({ competitions }: { competitions: ICompetition[] }) {
	return (
		<CompetitionsLayout
			pageTitle="Competitions"
			pageLead="Competitions we participate in"
		>
			<ul className={clsx(styles.competitions)}>
				{competitions.map((competition) => {
					return (
						<li className={clsx(styles.competition)} key={competition.id}>
							<div className={clsx(styles["competition__logo-box"])}>
								<ImageComp
									alt={competition.name.long}
									image={competition.logo}
									placeholder={competition.logo}
									priority={false}
								/>
							</div>
							<p className={clsx(styles.competition__name)}>
								{competition.name.long}
							</p>
						</li>
					);
				})}
			</ul>
		</CompetitionsLayout>
	);
}

Competitions.getLayout = function getLayout(page: ReactElement) {
	return <GuestLayout>{page}</GuestLayout>;
};

export async function getServerSideProps() {
	const res_competitions = comps;

	return { props: { competitions: res_competitions } };
}

export default Competitions;
