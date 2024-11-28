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
  Tabs
} from "@chakra-ui/react";
import React, { ReactElement, useMemo, useState } from "react";
import { NextPageWithLayout } from "@/pages/_app.page";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Link } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Column } from "react-table";
import ErrorLogger from "@/helpers/errorLogger";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { useGetTeamsQuery } from "@/store/api/team.api";
import { useGetLeagueQuery } from "@/store/api/league.api";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput/CustomInput";
import { DownloadExcel } from "@/components/donwloadData";
import {
  useCreateMatchMutation,
  useGetMatchesQuery,
  useGetOneMatchDetailMutation
} from "@/store/api/match.api";
import CustomTable from "@/components/CustomTable";
import { LiaDownloadSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import { IMatchRequest, IMatchResponse, IGoal, IEvent, IStat, IGetOneMatchDetails, IPlayer } from "@/types/auth";
import UpdateMatch from "@/components/Page/Match";
import Stat from "@/components/Page/Stat";
import moment from "moment";
import { useGetPlayerQuery } from "@/store/api/player.api";
import Goal from "@/components/Page/Goal";

export interface ISelectType {
    label: string;
    value: string;
    name?: boolean;
}
export const seasons = [
{
    label: "2020/2021",
    value: "2020/2021"
},
{
    label: "2021/2022",
    value: "2021/2022"
},
{
    label: "2022/2023",
    value: "2022/2023"
},
{
    label: "2023/2024",
    value: "2023/2024"
},
{
    label: "2024/2025",
    value: "2024/2025"
},
{
    label: "2025/2026",
    value: "2025/2026"
}
]

const Match: NextPageWithLayout = () => {
  const {
    data,
    isLoading: isLoadingMatch,
    refetch
  } = useGetMatchesQuery();
   const {
    data: teams,
    isLoading: isLoadingTeam,
  } = useGetTeamsQuery();
   const {
    data: leagues,
    isLoading: isLoadingLeague,
  } = useGetLeagueQuery();
  const [ getOneMatchDetail, {isLoading: isLoadingGetUpdate, data: updateData} ] = useGetOneMatchDetailMutation()
    const {
    data: players,
    isLoading: isLoadingPlayers
  } = useGetPlayerQuery();


   const [goal, set_goal] = useState<IGoal[]>([])
      const [event, set_event] = useState<IEvent>({
          player: "",
          time: "",
          favoured_team: "",
          unnfavoured_team: "",
          match: "",
          event_type: "foul",
          event_award: "none",
    })
       const [home_team, set_home_team] = useState<ISelectType>({label: "", value: ""})
     const [own_place, set_own_place] = useState<ISelectType>({label: "", value: ""})
    const [away_team, set_away_team] = useState<ISelectType>({label: "", value: ""})
    const [loading, setLoading] = useState(false)
    const [date, set_date] = useState<any>("")
    const [league, set_league] = useState<ISelectType>({label: "", value: ""})
    const [selected_match, set_selected_match] = useState("")
    const [selected_team, set_selected_team] = useState("")
    const [season, set_season] = useState<ISelectType>({label: "", value: ""})
    const [selected_players, set_selected_players] = useState<ISelectType[]>([])
     const [match, set_match] = useState<any>({
    date: "",
    home_team: {
         name: "",
      logo: "",
      _id: ""
    },
    away_team: {
         name: "",
      logo: "",
      _id: ""
    },
    league: {
       name: "",
      logo: "",
      _id: ""
    },
    season: "",
    stat: "",
    is_played: false,
    _id: ""
    })

   const handleModalEdit = async (id: string) => {
     setLoading(true)
     const response: any  = await getOneMatchDetail({id})
     if(response?.data?.code === 200){
      await set_selected_match(id)
      await set_away_team({value: response?.data?.data?.match?.away_team?._id, label: response?.data?.data?.match?.away_team?.name, name: response?.data?.data?.match?.away_team?.own})
      await set_home_team({value: response?.data?.data?.match?.home_team?._id, label: response?.data?.data?.match?.home_team?.name, name: response?.data?.data?.match?.home_team?.own})
      await set_league({value: response?.data?.data?.match?.league?._id, label: response?.data?.data?.match?.league?.name})
      await set_date(response?.data?.data?.match?.date)
      await set_season({value: response?.data?.data?.match?.season, label: response?.data?.data?.match?.season})
      await set_selected_players(response?.data?.data?.stats?.map(i => ({value: i?.player?._id, label: i?.player?.first_name+" "+i?.player?.last_name})))
      await set_goal(response?.data?.data?.goals)
      if(response?.data?.data?.match?.away_team?.own){
        set_selected_team(response?.data?.data?.match?.away_team?._id)
      }else {
        set_selected_team(response?.data?.data?.match?.home_team?._id)
      }
      await onMatchModalUpdateOpen()
     }
     await setLoading(false)
  }


  const columns: Column<IMatchResponse>[] = useMemo(() => {
    return [
      { Header: "Home Team", accessor: "home_team", Cell: ({ value }) =>(<HStack><img alt="img" width="40px" height="40px" src={value.logo}/><Text>{value.name}</Text></HStack>)},
      { Header: "Away Team", accessor: "away_team", Cell: ({ value }) =>(<HStack><img src={value.logo} alt="img" width="40px" height="40px"/><Text>{value.name}</Text></HStack>)},
      { Header: "Season", accessor: "season" },
      { Header: "League", accessor: "league", Cell: ({ value }) => <>{value.name}</>},
      { Header: "Date", accessor: "date", Cell: ({value}) => <>{moment(value).format("DD-MMMM-YYYY hh:mma")}</> },
      { Header: "Action", accessor: "_id", Cell: ({value}) => <CustomButton isLoading={isLoadingGetUpdate} isDisabled={isLoadingGetUpdate} onClick={() => handleModalEdit(value)}>Update</CustomButton> },
    ];
  }, []);

   

  const [createMatch, { isLoading, isError }] = useCreateMatchMutation();
  const {
    isOpen: isMatchModalOpen,
    onOpen: onMatchModalOpen,
    onClose: onMatchModalClose,
  } = useDisclosure();

  const {
    isOpen: isMatchModalUpdateOpen,
    onOpen: onMatchModalUpdateOpen,
    onClose: onMatchModalUpdateClose,
  } = useDisclosure();

  const handleCreateMatch = async (e) => {
    try {
        e.preventDefault()
      const res = await createMatch({
        home_team: home_team.value,
        away_team: away_team.value,
        date, 
        league: league.value,
        season: season.value,
        own_position: own_place.value
      }).unwrap();
      if (res.code === 200) {
        onMatchModalClose();
        refetch();
      }
    } catch (error) {
      ErrorLogger(error as string);
    }
  };

    const handleUpdateMatch = async (e) => {
    try {
        e.preventDefault()
      const res = await createMatch({
        home_team: home_team.value,
        away_team: away_team.value,
        date, 
        league: league.value,
        season: season.value,
        own_position: own_place.value
      }).unwrap();
      if (res.code === 200) {
        onMatchModalClose();
        refetch();
      }
    } catch (error) {
      ErrorLogger(error as string);
    }
  };


  return (
    <>
      <Box w='full' h='full' pt={[6, 8]}></Box>
      <Box w='full' h='full' py={[4, 6, 8]}>
      <Flex
          align="center"
          justify={["space-between"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          pb={[4, 6]}
        >
          <Heading>Matches</Heading>
              <CustomButton
                  onClick={onMatchModalOpen}
                  height={"48px"}
                  minW={["full", "50px"]}
                  mt='50px'
                >
                  <AddIcon mr='2' fontSize={"12px"} fontWeight={"500"} />
                  Create Match
                </CustomButton>
          
        </Flex>
        <Box h='full' pt={[6, 8]} borderBottomColor='neutral.50'>
    {!data?.data || isLoadingMatch ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              <CustomTable
                data={data?.data ?? []}
                columns={columns}
                search
                isLoading={isLoadingMatch}
                searchPlaceholder='Search for team'
                //filterText='Filter by location'
                topRightEl={
                  <DownloadExcel
                    data={data?.data}
                    name='Matches'
                    buttonText='Download Matches'
                  />
                }
              />
            </>
          )}
        </Box>
      </Box>

      {!isLoadingLeague && !isLoadingTeam && <Modal isOpen={isMatchModalOpen} onClose={onMatchModalClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateMatch}>
          <ModalContent>
            <ModalHeader>Create a Match</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <CustomSelect
               mt="20px"
                      label="Beyond Limit's Half"
                      placeholder=''
                      selectOptions={[{label: "Home", value: "home"}, {label: "Away", value: "away"}]}
                      selectProps={{
                        onChange: (e: ISelectType) => set_own_place(e)
                      }}
                    />
                {own_place.value === "away" && <CustomSelect
               mt="20px"
                      label='Home Team'
                      placeholder=''
                      selectOptions={teams.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        onChange: (e: ISelectType) => set_home_team(e)
                      }}
                    />}
                {own_place.value === "home" && <CustomSelect
               mt="20px"
                      label='Away Team'
                      placeholder=''
                      selectOptions={teams.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        onChange: (e: ISelectType) => set_away_team(e)
                      }}
                    />}
                        <CustomSelect
                mt="20px"
                      label='League'
                      placeholder='Select League'
                      selectOptions={leagues.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        onChange: (e: ISelectType) => set_league(e)
                      }}
                    />
                      <CustomSelect
               mt="20px"
                      label="Season"
                      placeholder=''
                      selectOptions={seasons.map(i => ({value: i.value, label: i.label}))}
                      selectProps={{
                        onChange: (e: ISelectType) => set_season(e)
                      }}
                    />
                  <CustomInput
                label="Date"
                placeholder='appearance'
                id='appearance'
                inputProps={{
                  onChange: (e) => set_date(e.target.value),
                  type: "datetime-local",
                }}
                mt={6}
              />
           
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type='submit'
                isLoading={isLoading}
                isError={isError}
                w='100%'
              >
                Create
              </CustomButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>}


  {
    !isLoadingLeague && 
    !isLoadingTeam && 
    !isLoadingGetUpdate && 
    <Modal 
     size="4xl" 
     isOpen={isMatchModalUpdateOpen} 
    onClose={() => {onMatchModalUpdateClose(); set_selected_match(""); set_selected_team("")}}>
        <ModalOverlay />
 
          <ModalContent>
            <ModalHeader>Update Match</ModalHeader>
            <ModalCloseButton color="#000"/>
            <ModalBody>
                <Tabs colorScheme="blue">
              <TabList>
                <Tab><Text>Match</Text></Tab>
                <Tab><Text>Line Up</Text></Tab>
                <Tab><Text>Goal</Text></Tab>
                <Tab><Text>Event</Text></Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <UpdateMatch
                  leagues={leagues}
                  teams={teams}
                  set_home_team={set_home_team}
                  home_team={home_team}
                  set_away_team={set_away_team}
                  set_league={set_league}
                  set_date={set_date}
                  set_season={set_season}
                  away_team={away_team}
                  league={league}
                  season={season}
                  date={date}
                  />
                </TabPanel>
                 <TabPanel>
                <Stat
                players={players}
                selected_players={selected_players}
                set_players={set_selected_players}
                team={selected_team}
                match={selected_match}
                onModalClose={onMatchModalUpdateClose}
                />
                </TabPanel>
                   <TabPanel>
                  <Goal 
                  goals={goal}
                  players={players}
                  teams={[home_team, away_team]}
                  match={selected_match}
                  onModalClose={onMatchModalUpdateClose}
                  />
                </TabPanel>
                <TabPanel>
                  <Text>Event</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
            </ModalBody>
          </ModalContent>
      </Modal>}
    </>
  );
};

Match.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Match;
