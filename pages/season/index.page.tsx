import GuestLayout from "@/components/GuestLayout/GuestLayout";
import React, { ReactElement, useState } from "react";
import styles from "./Season.module.css";
import MatchTabs from "@/components/Fixtures/Fixtures";
import Tables from "@/components/Tables/index.pages";

function Season() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fixtures");
  const [currentPage, setCurrentPage] = useState(1);

  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mainContainer">
      <div
        className={styles.seasonHead}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url(/images/tables.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className={styles.dropdownContainer}>
          <button onClick={toggleDropdown} className={styles.dropdownButton}>
            2023/2024 SEASON
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5163 5.38512L6.34386 10.2825C6.7048 10.9081 7.29542 10.9081 7.65636 10.2825L10.4839 5.38469C10.8453 4.75906 10.5495 4.24806 9.82767 4.24806H4.17255C3.45067 4.24806 3.15492 4.7595 3.5163 5.38512Z"
                fill="#01305B"
              />
            </svg>
          </button>
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <a href="#">2022/2023 SEASON</a>
              <a href="#">2021/2022 SEASON</a>
            </div>
          )}
        </div>
        <h1>FIXTURES</h1>
        <p>
          Fixtures and results for the upcoming 2023/24 campaign. Dates and
          times are subject to change.
        </p>
      </div>

      <div className={styles.seasonInfo}>
        <div className={styles.tabs}>
          <button
            className={activeTab === "fixtures" ? styles.active : ""}
            onClick={() => {
              setActiveTab("fixtures");
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            FIXTURES & RESULTS
          </button>
          {/* <button
            className={activeTab === 'results' ? styles.active : ''}
            onClick={() => {
              setActiveTab('results');
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            RESULTS
          </button> */}
          <button
            className={activeTab === "tables" ? styles.active : ""}
            onClick={() => {
              setActiveTab("tables");
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            TABLES
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "fixtures" && (
          <div>
            <MatchTabs />
          </div>
        )}
        {/* {activeTab === 'results' && <div>Results content goes here.</div>} */}
        {activeTab === "tables" && (
          <div>
            <Tables />
          </div>
        )}
      </div>
    </div>
  );
}

Season.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Season;
