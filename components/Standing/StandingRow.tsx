import { IStandingTeam } from "@/lib/definitions";
import ImageComp from "../ImageComp/ImageComp";
import Text from "../Typography/Text";
import clsx from "clsx";
import styles from "./Standing.module.css";
import useGetScreenWidth from "@/hooks/useGetScreenWidth";

const StandingRow = ({ el }: { el: IStandingTeam }) => {
  const { screenWidth } = useGetScreenWidth();

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
              screenWidth && screenWidth < 576
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
      <td>{el.stats.f}</td>
      <td>{el.stats.a}</td>
      <td>{el.stats.gd}</td>
      <td>{el.stats.pts}</td>
    </>
  );
};

export default StandingRow;
