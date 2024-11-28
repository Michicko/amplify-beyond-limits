import {
  Box,
  Flex,
  Heading,
  Text,
  Center,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, useMemo } from "react";
import { NextPageWithLayout } from "@/pages/_app.page";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Image from "next/image";
import DashboardDetail from "@/components/DashboardDetail";
//import { useGetDashboardDataQuery } from "@/store/api/dashboard.api";
import dayjs from "dayjs";


const AdminDashboard: NextPageWithLayout = () => {
  //const { data: dashboardData, isLoading: isLoadingDashboardData } = useGetDashboardDataQuery();
  const { colorMode } = useColorMode();

  const homeTeam = {
                squad: {
                  gk: {
                    name: "Dare",
                    number: 0
                  },
                  df: [
                    {
                     name: "Dotun",
                     number: 1
                    },
                     {
                     name: "Shade",
                     number: 2
                    }
                  ],
                  cdm:  [
                    {
                     name: "Seun",
                     number: 3
                    },
                     {
                     name: "Ope",
                     number: 4
                    },
                     {
                     name: "John",
                     number: 3
                    },
                     {
                     name: "Adamu",
                     number: 4
                    }
                  ],
                  cam: [
                    {
                     name: "Bola",
                     number: 3
                    },
                     {
                     name: "Job",
                     number: 4
                    },
                     {
                     name: "Tayo",
                     number: 3
                    }
                  ],
                  fw: [
                     {
                     name: "Osihmen",
                     number: 3
                    },
                  ]
                }
              }
  const awayTeam = {
                squad: {
                  gk: {
                    name: "Dare",
                    number: 0
                  },
                  df: [
                    {
                     name: "Dotun",
                     number: 1
                    },
                     {
                     name: "Shade",
                     number: 2
                    }
                  ],
                  cdm:  [
                    {
                     name: "Seun",
                     number: 3
                    },
                     {
                     name: "Ope",
                     number: 4
                    },
                     {
                     name: "John",
                     number: 3
                    },
                     {
                     name: "Adamu",
                     number: 4
                    }
                  ],
                  cam: [
                    {
                     name: "Bola",
                     number: 3
                    },
                     {
                     name: "Job",
                     number: 4
                    },
                     {
                     name: "Tayo",
                     number: 3
                    }
                  ],
                  fw: [
                     {
                     name: "Osihmen",
                     number: 3
                    },
                  ]
                }
              }

  return (
    <>
      <Box w='full' h='full' py={[6, 8]}>
      <Heading color='neutral.800'>Welcome, Admin</Heading>
      <Flex align='center' gap={1.5}>
        <Text fontFamily='clash' mt={[2]} fontWeight={"500"} color='#656566'>
          How is Your Day Going?
        </Text>
      
      </Flex>
      <Flex
        mt={[6, 8, 10]}
        gap={[4, 6]}
        direction={["column", null, "row"]}
        wrap='wrap'
      >
        <DashboardDetail
          title='Players'
          amount={"0"}
          isLoading={false}
     
        />
        <DashboardDetail
          title='Matches'
          amount={"0"}
          isLoading={false}
        
        />
        <DashboardDetail
          title='Won Matches'
          amount={"0"}
          isLoading={false}
          
        />
      </Flex>
      <Flex
        mt={[4, 6]}
        gap={[4, 6]}
        direction={["column", null, "row"]}
        wrap='wrap'
      >
        <DashboardDetail
          title='Draw Matches'
          amount={"0"}
          isLoading={false}
        />
        <DashboardDetail
          title='No of goals scored'
          amount={"0"}
          isLoading={false}
        />
        <DashboardDetail
          title='No of leagues'
          amount={"0"}
          isLoading={false}
        />
      </Flex>
         {/* <SoccerLineUp
              size={ "small" }
              color={ "lightseagreen" }
              pattern={ "lines" }
              homeTeam={homeTeam}
              awayTeam={{squad: {}}} 

            />*/}
 </Box>
    </>
  );
};

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AdminDashboard;
