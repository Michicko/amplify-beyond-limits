import {
  Box,
  Flex,
  Heading,
  Text,
  Center,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Icon,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  HStack,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { NextPageWithLayout } from "@/pages/_app.page";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Link } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Column } from "react-table";
import ErrorLogger from "@/helpers/errorLogger";
import CustomSelect from "@/components/CustomSelect/CustomSelect";

import CustomInput from "@/components/CustomInput/CustomInput";
import { DownloadExcel } from "@/components/donwloadData";
import {
  useCreateMatchMutation,
  useGetMatchesQuery,
  useGetOneMatchDetailMutation,
} from "@/store/api/match.api";
import CustomTable from "@/components/CustomTable";
import { LiaDownloadSolid } from "react-icons/lia";
import { useRouter } from "next/router";
// import moment from "moment";
import { useFormik } from "formik";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Match: NextPageWithLayout = () => {
  const initialMatch = {
    season: "",
    home: {
      name: "",
      id: "",
      logo: "",
      goals: "",
      lineup: ["", "", "", "", "", "", "", "", "", "", ""],
      substitutes: ["", "", "", "", "", "", "", ""],
      stats: {
        passes: "",
        corners: "",
        shots: "",
        yellows: "",
        reds: "",
        penalty: "",
      },
    },

    away: {
      name: "",
      id: "",
      logo: "",
      goals: "",
      lineup: ["", "", "", "", "", "", "", "", "", "", ""],
      substitutes: ["", "", "", "", "", "", "", ""],
      stats: {
        passes: "",
        corners: "",
        shots: "",
        yellows: "",
        reds: "",
        penalty: "",
      },
    },

    date: "",
    time: "",
    league: {
      name: "",
      logo: "",
      id: "",
    },
    venue: "",
    isPlayed: false,
    preview: {
      context: "",
      keyPlayer: "",
      aboutKeyPlayer: "",
    },

    report: {
      context: "",
      // scorers: a.json().array(),
      scorers: [
        {
          name: "",
          time: "",
        },
      ],
      manOfMatch: "",
      aboutManOfMatch: "",
    },
  };

  // const columns: Column<IMatchResponse>[] = useMemo(() => {
  //   return [
  //     {
  //       Header: "Home Team",
  //       accessor: "home_team",
  //       Cell: ({ value }) => (
  //         <HStack>
  //           <img alt="img" width="40px" height="40px" src={value.logo} />
  //           <Text>{value.name}</Text>
  //         </HStack>
  //       ),
  //     },
  //     {
  //       Header: "Away Team",
  //       accessor: "away_team",
  //       Cell: ({ value }) => (
  //         <HStack>
  //           <img src={value.logo} alt="img" width="40px" height="40px" />
  //           <Text>{value.name}</Text>
  //         </HStack>
  //       ),
  //     },
  //     { Header: "Season", accessor: "season" },
  //     {
  //       Header: "League",
  //       accessor: "league",
  //       Cell: ({ value }) => <>{value.name}</>,
  //     },
  //     {
  //       Header: "Date",
  //       accessor: "date",
  //       Cell: ({ value }) => <>{moment(value).format("DD-MMMM-YYYY hh:mma")}</>,
  //     },
  //     {
  //       Header: "Action",
  //       accessor: "_id",
  //       Cell: ({ value }) => (
  //         <CustomButton
  //           isLoading={isLoadingGetUpdate}
  //           isDisabled={isLoadingGetUpdate}
  //           onClick={() => handleModalEdit(value)}
  //         >
  //           Update
  //         </CustomButton>
  //       ),
  //     },
  //   ];
  // }, []);

  const [allPlayers, setPlayers] = useState<Array<Schema["Player"]["type"]>>(
    []
  );
  const [seasons, setSeasons] = useState<Array<Schema["Season"]["type"]>>([]);

  const [allTeams, setAllTeams] = useState<Array<Schema["Team"]["type"]>>([]);
  const [allMatches, setAllMatches] = useState<Array<Schema["Match"]["type"]>>(
    []
  );
  const [leagues, setLeagues] = useState<Array<Schema["League"]["type"]>>([]);

  const [isLoading, setIsLoading] = useState(false);

  // Initial Match Values
  const [initMatch, setInitMatch] = useState({ ...initialMatch });

  const handleCreateMatch = async (values: any) =>
    // actions: FormikHelpers<ISeason>)
    {
      setIsLoading(true);
      const { data, errors } = await client.models.Match.create({
        ...values,
        report: {
          ...values.report,
          scorers: JSON.stringify([...values.report.scorers]),
        },
      });

      if (data) {
        onMatchModalClose();
      }

      if (errors) {
        ErrorLogger(errors);
      }

      setIsLoading(false);
    };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initMatch,
    onSubmit: handleCreateMatch,
  });

  function listMatches() {
    setIsLoading(true);
    client.models.Match.observeQuery().subscribe({
      next: (data) => {
        setAllMatches([...data.items]);
        setIsLoading(false);
      },
    });
  }

  async function listLeagues() {
    setIsLoading(true);
    const { data } = await client.models.League.list();
    setLeagues([...data]);
    setIsLoading(false);
  }

  async function listPlayers() {
    setIsLoading(true);
    const { data } = await client.models.Player.list();

    setPlayers([...data]);
    setIsLoading(false);
  }

  async function listTeams() {
    setIsLoading(true);
    const { data } = await client.models.Team.list();

    setAllTeams([...data]);
    setIsLoading(false);
  }

  async function listSeasons() {
    setIsLoading(true);
    const { data } = await client.models.Season.list();
    setSeasons([...data]);
    setIsLoading(false);
  }

  useEffect(() => {
    // listMatches();
    // listPlayers();
  }, []);

  const handleSaveLineup = (data: any) => {
    if (values.home.name.toLowerCase().includes("beyond")) {
      setFieldValue("home.lineup", data.lineup);
      setFieldValue("home.substitutes", data.substitutes);
    } else if (values.away.name.toLowerCase().includes("beyond")) {
      setFieldValue("home.lineup", data.lineup);
      setFieldValue("home.substitutes", data.substitutes);
    }
  };

  const handleSaveStats = (data: typeof initialMatch.home.stats) => {
    if (values.home.name.toLowerCase().includes("beyond")) {
      setFieldValue("home.stats", data);
    } else if (values.away.name.toLowerCase().includes("beyond")) {
      setFieldValue("home.stats", data);
    }
  };

  const {
    isOpen: isMatchModalOpen,
    onOpen: onMatchModalOpen,
    onClose: onMatchModalClose,
  } = useDisclosure();

  return (
    <>
      <Box w="full" h="full" pt={[6, 8]}></Box>
      <Box w="full" h="full" py={[4, 6, 8]}>
        <Flex
          align="center"
          justify={["space-between"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          pb={[4, 6]}
        >
          <Heading>Matches</Heading>
          <CustomButton
            onClick={() => {
              onMatchModalOpen();
              listSeasons();
              listTeams();
              listLeagues();
              listPlayers();
            }}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Create Match
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {!isLoading && allMatches.length === 0 && (
            <Center>No matches yet</Center>
          )}

          {/* {!isLoading && allMatches.length > 0 && (
            <CustomTable
              data={allMatches}
              columns={columns}
              search
              searchPlaceholder="Search for Match"
              topRightEl={
                <DownloadExcel
                  data={data?.data}
                  name="Matches"
                  buttonText="Download Matches"
                />
              }
            />
          )} */}
        </Box>
      </Box>

      <Modal size="5xl" isOpen={isMatchModalOpen} onClose={onMatchModalClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a Match</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                align="center"
                justify={["space-between"]}
                alignItems={"center"}
                direction={["column", "row"]}
                // gap={[2, 0]}
                // pb={[4, 6]}
              >
                <Select
                  mt="20px"
                  placeholder="Select Season"
                  id="season"
                  width={"50%"}
                  onChange={handleChange}
                >
                  {seasons.length > 0 &&
                    seasons.map((seas) => (
                      <option key={seas.id} value={seas.name}>
                        {seas.name}
                      </option>
                    ))}
                </Select>

                <Checkbox
                  bg={"gray.800"}
                  borderRadius={8}
                  px={"10px"}
                  py={"2"}
                  name="isPlayed"
                  isChecked={values.isPlayed}
                  onChange={handleChange}
                >
                  Is Played
                </Checkbox>
              </Flex>

              <Flex
                align="center"
                justify={["space-between"]}
                alignItems={"center"}
                direction={["column", "row"]}
                // gap={[2, 0]}
                // pb={[4, 6]}
              >
                <CustomSelect
                  mt="20px"
                  id="home"
                  label="Home Team"
                  selectOptions={allTeams.map((team) => ({
                    label: team.name,
                    value: team.name,
                    logo: team.logo,
                    id: team.id,
                    goals: "",
                  }))}
                  selectProps={{
                    onChange: (e: any) =>
                      setFieldValue("home", {
                        ...values.home,
                        name: e.value,
                        logo: e.logo,
                        id: e.id,
                      }),
                  }}
                />
                <CustomInput
                  label="goal"
                  id="home.goals"
                  w={"40px"}
                  inputProps={{
                    onChange: handleChange,
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="goal"
                  id="away.goals"
                  w={"40px"}
                  inputProps={{
                    onChange: handleChange,
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />

                <CustomSelect
                  mt="20px"
                  id="away"
                  label="Away Team"
                  selectOptions={allTeams.map((team) => ({
                    label: team.name,
                    value: team.name,
                    logo: team.logo,
                    id: team.id,
                    goals: "",
                  }))}
                  selectProps={{
                    onChange: (e: any) =>
                      setFieldValue("away", {
                        ...values.away,
                        name: e.value,
                        logo: e.logo,
                        id: e.id,
                      }),
                  }}
                />
              </Flex>

              <Flex
                align="center"
                justify={["space-between"]}
                direction={["column", "row"]}
                // gap={[2, 0]}
                // pb={[4, 6]}
                mt={6}
              >
                <CustomInput
                  label="Match Date"
                  id="date"
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur("date"),
                    type: "date",
                  }}
                />

                <CustomInput
                  label="Match Time"
                  id="time"
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur("time"),
                    type: "time",
                  }}
                />
              </Flex>

              <Flex
                align="center"
                justify={["space-between"]}
                direction={["column", "row"]}
                // gap={[2, 0]}
                // pb={[4, 6]}
                mt={6}
              >
                <CustomSelect
                  id="league"
                  label="Select League"
                  selectOptions={leagues.map((league) => ({
                    id: league.id,
                    label: league.name,
                    value: league.name,
                    logo: league.logo,
                  }))}
                  selectProps={{
                    onChange: (e: any) =>
                      setFieldValue("league", {
                        name: e.value,
                        logo: e.logo,
                        id: e.id,
                      }),
                  }}
                />

                <CustomSelect
                  label="Venue"
                  id="venue"
                  selectOptions={[
                    {
                      label: "B Limit Stadium",
                      value: "B Limit Stadium",
                    },
                  ]}
                  selectProps={{
                    onChange: (e: any) => setFieldValue("venue", e.value),
                  }}
                />
              </Flex>

              <Box w="full" pt={6}>
                <Text mt={6} mb={4}>
                  Preview
                </Text>
                <Textarea
                  id=""
                  placeholder="Context"
                  size="sm"
                  onChange={(e: any) =>
                    setFieldValue("preview.context", e.target.value)
                  }
                />

                <CustomSelect
                  my="20px"
                  width={"50%"}
                  // placeholder="Key Player"
                  label="Key Player"
                  selectOptions={allPlayers.map((playr) => ({
                    label: `${playr.firstName} ${playr.lastName}`,
                    value: `${playr.firstName} ${playr.lastName}`,
                  }))}
                  selectProps={{
                    onChange: (e: any) =>
                      setFieldValue("preview.keyPlayer", e.value),
                  }}
                  // selectProps={{
                  //   onChange: (e: ISelectType) => set_season(e),
                  // }}
                />

                <Textarea
                  placeholder="About Key Player"
                  size="sm"
                  onChange={(e: any) =>
                    setFieldValue("preview.aboutKeyPlayer", e.target.value)
                  }
                />
              </Box>

              <Box w="full" pt={6}>
                <Text mt={6} mb={4}>
                  Report
                </Text>

                <Text size={"sm"} mb={4}>
                  Goal Scorers
                </Text>

                {values.report.scorers.length > 0 &&
                  values.report.scorers.map((_, index) => (
                    // <div key={Math.random() + (index + 1)}>
                    <Flex
                      key={index}
                      align="center"
                      justify={["space-between"]}
                      direction={["column", "row"]}
                      // gap={[2, 0]}
                      // pb={[4, 6]}
                      mt={6}
                    >
                      <CustomSelect
                        label="Goal scorer"
                        selectOptions={allPlayers.map((playr) => ({
                          label: `${playr.firstName} ${playr.lastName}`,
                          value: `${playr.firstName} ${playr.lastName}`,
                        }))}
                        selectProps={{
                          onChange: (e: any) =>
                            setFieldValue(
                              `report.scorers[${index}].name`,
                              e.value
                            ),
                        }}
                      />

                      <CustomInput
                        label="Time of goal"
                        id={`report.scorers[${index}].time`}
                        inputProps={{
                          onChange: handleChange,
                          // onBlur: handleBlur("time"),
                          type: "number",
                        }}
                      />

                      <Button
                        size="sm"
                        variant="unstyled"
                        type="button"
                        onClick={() => {
                          const curVals = {
                            ...values,
                            report: {
                              ...values.report,
                              scorers: [
                                ...values.report.scorers.slice(0, index),
                                ...values.report.scorers.slice(
                                  index + 1,
                                  values.report.scorers.length
                                ),
                              ],
                            },
                          };
                          setInitMatch(curVals);
                        }}
                      >
                        Remove
                      </Button>
                    </Flex>
                    // </div>
                  ))}

                <Center>
                  <Button
                    size="sm"
                    my="8"
                    variant="unstyled"
                    type="button"
                    onClick={() => {
                      const curVals = {
                        ...values,
                        report: {
                          ...values.report,
                          scorers: [
                            ...values.report.scorers,
                            {
                              name: "",
                              time: "",
                            },
                          ],
                        },
                      };
                      setInitMatch(curVals);
                    }}
                  >
                    Add Scorer
                  </Button>
                </Center>

                <Textarea
                  id=""
                  placeholder="Report Context"
                  size="sm"
                  mt={"20px"}
                  onChange={(e: any) =>
                    setFieldValue("report.context", e.target.value)
                  }
                />

                <CustomSelect
                  mt="40px"
                  mb="20px"
                  // placeholder="Key Player"
                  label="Man of the match"
                  width={"50%"}
                  selectOptions={allPlayers.map((playr) => ({
                    label: `${playr.firstName} ${playr.lastName}`,
                    value: `${playr.firstName} ${playr.lastName}`,
                  }))}
                  selectProps={{
                    onChange: (e: any) =>
                      setFieldValue("report.manOfMatch", e.value),
                  }}
                  // selectProps={{
                  //   onChange: (e: ISelectType) => set_season(e),
                  // }}
                />

                <Textarea
                  placeholder="About Man of the macth"
                  size="sm"
                  onChange={(e: any) =>
                    setFieldValue("report.aboutManOfMatch", e.target.value)
                  }
                />
              </Box>

              <Lineups
                handleSaveLineup={handleSaveLineup}
                handleSaveStats={handleSaveStats}
              />
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type="submit"
                isLoading={isLoading}
                // isError={isError}
                w="100%"
              >
                Save Changes
              </CustomButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

Match.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Match;

interface LineupsProps {
  handleSaveLineup: (a: any) => void;
  handleSaveStats: (a: any) => void;
}

const Lineups: React.FC<LineupsProps> = ({
  handleSaveLineup,
  handleSaveStats,
}) => {
  const [lineupData, setLineupData] = useState({
    lineup: Array(11).fill(""),
    substitutes: Array(8).fill(""),
  });

  const [statsData, setStatsData] = useState({
    passes: "",
    corners: "",
    shots: "",
    yellows: "",
    reds: "",
    penalty: "",
  });

  const [players, setPlayers] = useState([
    "Aiyenugba Daniel",
    "Emma Denis",
    "Boma Akpo",
    "Bea more",
    "Anu Iwalu",
    "Surey Puma",
    "Oluyele Idow",
    "Bami madnu",
    "Tinu wa",
    "Mke me",
    "Nuw pu",
    "Shi ding",
    "Gun was",
    "Play me",
    "Chi den",
    "Frn ku",
    "Han ki",
    "Mal le",
    "Dus bun",
    "Shi kra",
    "Naw tun",
    "Okpa kem",
    "Shud dey",
    "Small tin",
    "Make me",
  ]);

  const handlePlayerToggle = (player: any) => {
    const { lineup, substitutes } = lineupData;

    if (lineup.includes(player)) {
      // Remove player from lineup
      setLineupData((prevMatch) => ({
        ...prevMatch,
        lineup: prevMatch.lineup.map((p, index) => (p === player ? "" : p)),
      }));
    } else if (substitutes.includes(player)) {
      // Remove player from substitutes
      setLineupData((prevMatch) => ({
        ...prevMatch,
        substitutes: prevMatch.substitutes.map((p, index) =>
          p === player ? "" : p
        ),
      }));
    } else {
      // Add player to lineup or substitutes
      if (lineup.includes("")) {
        const firstEmptyIndex = lineup.findIndex((p) => p === "");
        setLineupData((prevMatch) => ({
          ...prevMatch,
          lineup: prevMatch.lineup.map((p, index) =>
            index === firstEmptyIndex ? player : p
          ),
        }));
      } else if (substitutes.includes("")) {
        const firstEmptyIndex = substitutes.findIndex((p) => p === "");
        setLineupData((prevMatch) => ({
          ...prevMatch,
          substitutes: prevMatch.substitutes.map((p, index) =>
            index === firstEmptyIndex ? player : p
          ),
        }));
      }
    }
  };

  const handleSetStatsData = (property: string, value: string) => {
    setStatsData({
      ...statsData,
      [property]: value,
    });
  };

  return (
    <>
      <Box w="full" pt={20}>
        <Tabs>
          <TabList>
            <Tab>Lineup</Tab>
            <Tab>Stats</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex
                wrap={"wrap"}
                height="400px"
                align="center"
                justify={["space-between"]}
                direction={["column", "row"]}
                gap={4}
              >
                {players.map((player) => (
                  <Checkbox
                    key={player}
                    bg={"gray.800"}
                    px={"24px"}
                    py={"5"}
                    borderRadius={8}
                    isChecked={
                      lineupData.lineup.includes(player) ||
                      lineupData.substitutes.includes(player)
                    }
                    onChange={() => handlePlayerToggle(player)}
                  >
                    {player}
                  </Checkbox>
                ))}
              </Flex>

              <Flex
                wrap={"wrap"}
                align="center"
                justify={["space-between"]}
                direction={["column", "row"]}
                gap={4}
                mt={12}
              >
                <div>
                  <Text fontWeight={600}>Lineup</Text>
                  <ul>
                    {lineupData.lineup.map((player, index) => (
                      <li key={index}>{player || "Empty"}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Text fontWeight={600}>Substitutes</Text>

                  <ul>
                    {lineupData.substitutes.map((player, index) => (
                      <li key={index}>{player || "Empty"}</li>
                    ))}
                  </ul>
                </div>
              </Flex>

              <Center>
                <Button
                  size="sm"
                  variant="unstyled"
                  type="button"
                  onClick={() => handleSaveLineup(lineupData)}
                >
                  Save Lineup
                </Button>
              </Center>
            </TabPanel>
            <TabPanel>
              <Flex
                align="center"
                justify={["space-between"]}
                direction={["column", "row"]}
                gap={2}
                // pb={[4, 6]}
                mt={6}
              >
                <CustomInput
                  label="Passes"
                  id="passes"
                  inputProps={{
                    onChange: (e) =>
                      handleSetStatsData("passes", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="Corners"
                  id="corners"
                  inputProps={{
                    onChange: (e) =>
                      handleSetStatsData("corners", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="Shots"
                  id="shots"
                  inputProps={{
                    onChange: (e) =>
                      handleSetStatsData("shots", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="Yellows"
                  id="yellows"
                  inputProps={{
                    onChange: (e) =>
                      handleSetStatsData("yellows", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="Reds"
                  id="reds"
                  inputProps={{
                    onChange: (e) => handleSetStatsData("reds", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
                <CustomInput
                  label="Penalty"
                  id="penalty"
                  inputProps={{
                    onChange: (e) =>
                      handleSetStatsData("penalty", e.target.value),
                    // onBlur: handleBlur("date"),
                    type: "number",
                  }}
                />
              </Flex>

              <Center>
                <Button
                  size="sm"
                  variant="unstyled"
                  mt={12}
                  type="button"
                  onClick={() => handleSaveStats(statsData)}
                >
                  Save Stats
                </Button>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
