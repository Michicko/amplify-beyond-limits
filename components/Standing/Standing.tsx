import { standing } from "@/lib/placeholder-data";
import Card from "../Cards/Card";
import CardHeader from "../Cards/CardHeader";
import Heading from "../Typography/Heading";
import styles from "./Standing.module.css";
import clsx from "clsx";
import CardBody from "../Cards/CardBody";
import StandingRow from "./StandingRow";
import Button from "../Button/Button";

const Standing = () => {
  // get blfc index in standing
  const blfcIndex = standing.findIndex((el) => el.team.name.short === "BLFC");
  // get team before blfc and blfc postions
  const filteredStandings = standing.slice(blfcIndex - 1, blfcIndex + 1);
  const theads = ["pos", "club", ...Object.keys(standing[0].stats)];

  return (
    <div className={clsx(styles.standing)}>
      <Heading level={2} text={"Standing"} />
      <Card theme="light" radius={true}>
        <>
          <table>
            <CardHeader theme="trans" border={true} type="thead">
              <tr>
                {theads.map((el, i) => {
                  if (i === 1)
                    return (
                      <th key={i + 2} colSpan={4}>
                        {el}
                      </th>
                    );
                  return <th key={i + 2}>{el}</th>;
                })}
              </tr>
            </CardHeader>
            <CardBody type="tbody">
              <>
                {filteredStandings.map((el, i) => {
                  return (
                    <tr
                      key={i + 1 * 2}
                      className={clsx(
                        el.team.name.short === "BLFC" && styles.shade
                      )}
                    >
                      {<StandingRow el={el} />}
                    </tr>
                  );
                })}
              </>
            </CardBody>
          </table>
          <div className={clsx("center", styles["btn-box"])}>
            <Button
              isLink={true}
              text={"View full table"}
              type="secondary"
              link={{ href: `/standing` }}
            />
          </div>
        </>
      </Card>
    </div>
  );
};

export default Standing;
