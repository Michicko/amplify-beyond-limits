import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import clsx from "clsx";
import React from "react";
import styles from "./TeamStats.module.css";

const seasons = [
  { season: "-- select season --" },
  { season: "2023/2024" },
  { season: "2024/2025" },
];
const teams = [
  { team: "-- select team --" },
  { team: "under-19" },
  { team: "under-17" },
];

function TeamStats() {
  return (
    <>
      <MainHeader
        bg={"/images/teamstats.jpg"}
        alt="2024 / 2025 Stats"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={"Beyond Limits Fa Stats"}
              color="white"
              level={1}
              letterCase="upper"
            />
            {/*select team*/}
            {seasons && (
              <select name="season" id="season">
                {seasons.map((el) => {
                  return (
                    <option value={el.season} key={el.season}>
                      {el.season}
                    </option>
                  );
                })}
              </select>
            )}
            {teams && (
              <select name="season" id="season">
                {teams.map((el) => {
                  return (
                    <option value={el.team} key={el.team}>
                      {el.team}
                    </option>
                  );
                })}
              </select>
            )}
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <div className={clsx(styles["team-stats"])}>
          {/*<h2>Team stats</h2>*/}
        </div>
      </LayoutMain>
    </>
  );
}

export default TeamStats;
