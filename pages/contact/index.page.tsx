import React from "react";
import styles from "./Contact.module.css";
import LayoutHeader from "@/components/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/Layouts/CompetitionsLayout/LayoutMain";
import MainHeader from "@/components/MainHeader/MainHeader";
import Heading from "@/components/Typography/Heading";
import clsx from "clsx";

function Contact() {
  return (
    <>
      <>
        <MainHeader
          bg={"/images/contact.jpg"}
          alt="2024 / 2025 Stats"
          overlay={true}
        >
          <LayoutHeader>
            <Heading
              text={"CONTACT US"}
              color="white"
              level={1}
              letterCase="upper"
            />
          </LayoutHeader>
        </MainHeader>
        <LayoutMain>
          <div className={clsx(styles["contact-container"])}>
            <div className={clsx(styles["contact-card"])}>
              <h2>WRITE TO US</h2>
              <p>
                Please send an email to:{" "}
                <a
                  href="mailto:info@beyondlimitsfa.com"
                  className={clsx(styles["contact-link"])}
                >
                  info@beyondlimitsfa.com
                </a>
              </p>
            </div>
          </div>
        </LayoutMain>
      </>
    </>
  );
}

export default Contact;
