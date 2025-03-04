import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import React from "react";
import styles from "./Honours.module.css";
import clsx from "clsx";
import Text from "@/components/Typography/Text";
import { honors } from "@/lib/placeholder-data";
import ImageComp from "@/components/ImageComp/ImageComp";
import Button from "@/components/Button/Button";

function Honours() {
  return (
    <>
      <MainHeader
        bg={"/images/home-header-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={"Honours"}
              color="white"
              level={1}
              letterCase="upper"
            />
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <div className={clsx(styles["honours-container"])}>
          <div className={clsx(styles["honours-intro"])}>
            <Text
              color="white"
              text={`At Beyond the Limits, we pride ourselves on our accomplishments. 
              Our devotion to developing young, talented players and pushing the boundaries has earned us numerous
              prestigious honours.`}
              size="base"
              thin={true}
            />
          </div>
          <div className={clsx(styles["honors"])}>
            {honors.map((honor) => {
              return (
                <div
                  key={honor.competition.short}
                  className={clsx(styles.honor)}
                >
                  <div className={clsx(styles["honor-img__box"])}>
                    <div className={clsx(styles["honor-img"])}>
                      <ImageComp
                        alt={honor.competition.long}
                        image={honor.trophy}
                        placeholder={honor.trophy}
                        priority={false}
                      />
                    </div>
                    <h3 className={clsx(styles["honors-won"])}>
                      {honor.numbers_won}
                    </h3>
                  </div>
                  <div className={clsx(styles["honor-details"])}>
                    <h3 className={clsx(styles["honor-name"])}>
                      {honor.competition.long}
                    </h3>
                    <ul className={clsx(styles["honors-years"])}>
                      {honor.years.map((year, i) => {
                        return (
                          <li className={clsx(styles["honor-year"])}>
                            {year}
                            {i < honor.years.length - 1 ? "," : ""}
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      isLink={true}
                      text={"Learn more"}
                      link={{
                        href: `/news/${honor.article_id}`,
                      }}
                      type="secondary"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutMain>
    </>
  );
}
export default Honours;
