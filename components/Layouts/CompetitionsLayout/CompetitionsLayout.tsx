import React from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";
import LayoutContainer from "./LayoutContainer";
import Heading from "@/components/Typography/Heading";
import Switcher from "@/components/Switcher/Switcher";
import MainHeader from "@/components/MainHeader/MainHeader";
import LinkSwitch from "@/components/Switcher/LinkSwitch";
import clsx from "clsx";

function CompetitionsLayout({
  headerBg,
  pageTitle,
  seasons,
  children,
}: {
  headerBg?: string;
  pageTitle: string;
  seasons?: { season: string }[];
  children: React.ReactElement;
}) {
  const links = [
    { name: "fixtures", href: "/fixtures" },
    { name: "results", href: "/results" },
    { name: "tables", href: "/tables" },
  ];
  return (
    <>
      <MainHeader
        bg={headerBg || "/images/fixtures-layout-header-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={pageTitle}
              color="white"
              level={1}
              letterCase="upper"
            />
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
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <>
          <div className={clsx("my-xl")}>
            <Switcher bg="white" theme="theme-2">
              <>
                {links.map((link) => {
                  return (
                    <LinkSwitch link={link} theme="theme-2" key={link.name} />
                  );
                })}
              </>
            </Switcher>{" "}
          </div>

          <LayoutContainer>{children}</LayoutContainer>
        </>
      </LayoutMain>
    </>
  );
}

export default CompetitionsLayout;
