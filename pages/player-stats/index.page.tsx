import GuestLayout from "@/components/GuestLayout/GuestLayout";
import React from "react";
import { ReactElement } from "react";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import clsx from "clsx";
import styles from "./PlayerStats.module.css";
import { players } from "@/lib/placeholder-data";

const teams = [
  { team: "-- select team --" },
  { team: "under-19" },
  { team: "under-17" },
];

const players_select_options = [{ name: "--select player --" }, ...players];

function PlayerStats() {
  return (
    <>
      <MainHeader
        bg={"/images/playerstats.jpg"}
        alt="2024 / 2025 Stats"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={"Players Stats"}
              color="white"
              level={1}
              letterCase="upper"
            />
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
            {/*select team*/}
            {players_select_options && (
              <select name="season" id="season">
                {players_select_options.map((el) => {
                  return (
                    <option value={el.name} key={el.name}>
                      {el.name}
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
PlayerStats.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default PlayerStats;
