import Card from "@/components/Cards/Card";
import CardHeader from "@/components/Cards/CardHeader";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import clsx from "clsx";
import React from "react";
import { ReactElement } from "react";
import styles from "./History.module.css";
import CardBody from "@/components/Cards/CardBody";
import Text from "@/components/Typography/Text";
import Link from "next/link";

function History() {
  return (
    <>
      <MainHeader
        bg={"/images/ourhistory.jpg"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              text={"Our History"}
              color="white"
              level={1}
              letterCase="upper"
            />
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <div className={clsx(styles.history)}>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} type="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    text="About Us"
                    letterCase="upper"
                    color="secondary"
                  />
                </div>
              </CardHeader>
              <CardBody type="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    text={`Beyond Limits FA is the youth development program of Remo Stars Football 
                    Club based in Ikenne, Ogun State, Nigeria.`}
                    size="base"
                  />
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} type="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    text="Home"
                    letterCase="upper"
                    color="secondary"
                  />
                </div>
              </CardHeader>
              <CardBody type="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    text={`Remo Stars Stadium, Ikenne, Ogun state.`}
                    size="base"
                  />
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} type="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    text="Established"
                    letterCase="upper"
                    color="secondary"
                  />
                </div>
              </CardHeader>
              <CardBody type="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    text={` The club was established in 2022 and competes in the Nigeria National League.`}
                    size="base"
                  />
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} type="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    text="Founder"
                    letterCase="upper"
                    color="secondary"
                  />
                </div>
              </CardHeader>
              <CardBody type="div" theme={"light"}>
                <div
                  className={clsx(
                    styles.history__body,
                    styles.p,
                    styles["link-box"],
                  )}
                >
                  <Text
                    color="white"
                    text={`Beyond Limits F.A. was founded in 2022 by`}
                    size="base"
                  />
                  <a
                    href={"https://en.wikipedia.org/wiki/Kunle_Soname"}
                    className={clsx(styles["history-link"])}
                  >
                    Kunle Soname.
                  </a>
                </div>
              </CardBody>
            </>
          </Card>
        </div>
      </LayoutMain>
    </>
  );
}
History.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default History;
