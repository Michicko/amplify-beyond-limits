import { IStandingTeam } from "@/lib/definitions";
import ImageComp from "../ImageComp/ImageComp";
import Text from "../Typography/Text";
import clsx from "clsx";
import styles from "./Standing.module.css";
import { useEffect, useState } from "react";

const StandingRow = ({ el }: { el: IStandingTeam }) => {
  const [screenSize, setScreenSize] = useState<number | null>(null);
  useEffect(() => {
    const checkScreenSize = () => {
      if (window) {
        setScreenSize(window.innerWidth);
      }
    };

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      <td>{el.position}</td>
      <td colSpan={4}>
        <div className={clsx("flex gap-base items-center")}>
          <div className={styles["img-box"]}>
            <ImageComp image={el.team.logo} alt={`${el.team.name.long} logo`} />
          </div>
          <Text
            color="light"
            text={
              screenSize && screenSize <= 576
                ? el.team.name.short
                : el.team.name.long
            }
            size="sm"
            center={false}
            upper={true}
          />
        </div>
      </td>
      <td>{el.stats.p}</td>
      <td>{el.stats.w}</td>
      <td>{el.stats.d}</td>
      <td>{el.stats.l}</td>
      <td>{el.stats.pts}</td>
    </>
  );
};

export default StandingRow;
