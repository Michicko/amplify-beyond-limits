import GuestLayout from "@/components/GuestLayout/GuestLayout";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import React from "react";
import { ReactElement } from "react";

function History() {
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
              text={"Our History"}
              color="white"
              level={1}
              letterCase="upper"
            />
          </>
        </LayoutHeader>
      </MainHeader>
      <LayoutMain>
        <div>
          <h2>Our History</h2>
        </div>
      </LayoutMain>
    </>
  );
}
History.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default History;
