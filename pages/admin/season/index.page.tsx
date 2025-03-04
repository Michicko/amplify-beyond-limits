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
  Button,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { NextPageWithLayout } from "@/pages/_app.page";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Link } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FormikHelpers, useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Column } from "react-table";
import ErrorLogger from "@/helpers/errorLogger";
import { useAuthenticator } from "@aws-amplify/ui-react";
import CustomInput from "@/components/CustomInput/CustomInput";
import CustomTable from "@/components/CustomTable";
import { ISeason } from "@/types/auth";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Match: NextPageWithLayout = () => {
  const initialSeason: ISeason = {
    name: "",
    leagues: [],
  };

  const [seasons, setSeasons] = useState<Array<Schema["Season"]["type"]>>([]);
  const [leagues, setLeagues] = useState<Array<Schema["League"]["type"]>>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [editSeason, setEditSeason] = useState<Schema["Season"]["type"]>();

  const columns: Column<ISeason>[] = useMemo(() => {
    return [
      { Header: "Season name", accessor: "name" },
      { Header: "Date Created", accessor: "createdAt" },
      // {
      //   Header: "Name",
      //   accessor: "name",
      //   Cell: ({ value }) => (
      //     <>
      //       <img src={value} alt="img" width="40px" height="40px" />
      //     </>
      //   ),
      // },
      // { Header: "League's name", accessor: "name" },
    ];
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialSeason,
    onSubmit: (values: ISeason) =>
      editSeason ? handleEditSeason(values) : handleCreateSeason(values),
  });

  async function listLeagues(curSeason?: any) {
    if (curSeason) setFieldValue("leagues", curSeason.leagues);

    setIsLoading(true);
    const { data } = await client.models.League.list();
    setLeagues([...data]);
    setIsLoading(false);
  }

  function listSeasons() {
    setIsLoading(true);
    client.models.Season.observeQuery().subscribe({
      next: (data) => {
        setSeasons([...data.items]);
        setIsLoading(false);
      },
    });
  }

  // useEffect(() => {
  //   listSeasons();
  // }, []);

  const handleCreateSeason = async (
    values: ISeason,
    // actions: FormikHelpers<ISeason>
  ) => {
    if (!values.name) return;

    setIsLoading(true);

    const { data, errors } = await client.models.Season.create({
      name: values.name,
      leagues: [],
    });

    if (data) {
      onCreateSeasonModalClose();
    }
    if (errors) {
      ErrorLogger(errors);
    }

    setIsLoading(false);
  };

  const handleEditSeason = async (
    values: ISeason,
    // actions: FormikHelpers<ISeason>F
  ) => {
    if (editSeason) {
      setIsLoading(true);

      const { data, errors } = await client.models.Season.update({
        id: editSeason.id,
        leagues: values.leagues,
      });

      if (data) {
        setEditSeason(undefined);
        onCreateSeasonModalClose();
      }
      if (errors) {
        ErrorLogger(errors);
      }

      setIsLoading(false);
    }
  };

  const initiateEditSeason = async (curSeason: any) => {
    setEditSeason(curSeason);
    onSeasonModalOpen();
    listLeagues(curSeason);
  };

  const {
    isOpen: isCreateSeasonModalOpen,
    onOpen: onSeasonModalOpen,
    onClose: onCreateSeasonModalClose,
  } = useDisclosure();

  const handleCheckboxChange = (id: string) => {
    console.log("ONCHANGE CALLED");
    const { leagues: selectedLeagues } = values;

    if (selectedLeagues.includes(id)) {
      setFieldValue(
        "leagues",
        selectedLeagues.filter((leagueId) => leagueId !== id),
      );
    } else {
      setFieldValue("leagues", [...selectedLeagues, id]);
    }
  };

  return (
    <>
      <Box w="full" h="full" pt={[6, 8]}></Box>
      <Box w="full" h="full" py={[4, 6, 8]}>
        <Flex
          align={["flex-start", "center"]}
          justify={["space-between"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          pb={[4, 6]}
        >
          <Link href="/admin/settings">
            <Flex gap={[1]} align="center">
              <Icon
                as={IoIosArrowRoundBack}
                color="iconColor"
                fontSize={["24px"]}
              />
            </Flex>
          </Link>
        </Flex>
        <Flex
          align="center"
          justify={["space-between"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          pb={[4, 6]}
        >
          <Heading>Season</Heading>
          <CustomButton
            onClick={onSeasonModalOpen}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Create Season
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {!isLoading && seasons.length === 0 && (
            <Center>No seasons are available</Center>
          )}

          {!isLoading && seasons.length > 0 && (
            <CustomTable
              data={seasons}
              columns={columns}
              initiateEditSeason={initiateEditSeason}
              search
              searchPlaceholder="Search for Season"
            />
          )}
        </Box>
      </Box>

      <Modal
        size={editSeason ? "full" : "lg"}
        isOpen={isCreateSeasonModalOpen}
        onClose={() => {
          setEditSeason(undefined);
          onCreateSeasonModalClose();
        }}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>
              <Flex
              // align="center"
              // justify={["space-between"]}
              // direction={["column", "row"]}
              // gap={[2, 0]}
              // pb={[4, 6]}
              >
                <Text color="" fontWeight={"800"} fontSize={["20px", "32px"]}>
                  {editSeason ? "Edit Season" : "Season"}
                </Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {!editSeason && (
                <CustomInput
                  label="Create a Season"
                  placeholder="name"
                  id="name"
                  inputProps={{
                    onChange: handleChange,
                    onBlur: handleBlur("name"),
                  }}
                  mt={6}
                  errorText={errors.name && touched.name ? errors.name : null}
                />
              )}

              {editSeason && (
                <>
                  <Text
                    color=""
                    mt={6}
                    // fontWeight={"800"}
                    // fontSize={["28px", "32px"]}
                  >
                    {editSeason.name}
                  </Text>
                  <Text fontSize={["28px", "12px"]}>
                    Add Leagues you’ll participate in this season
                  </Text>

                  <Box mt={4}>
                    <Text fontSize={["28px", "16px"]} fontWeight={600}>
                      National Competitions
                    </Text>

                    <Stack mt={8} spacing={5} direction="row">
                      {leagues.length > 0 &&
                        leagues
                          .filter((item) => item.competition === "NATIONAL")
                          .map((league) => (
                            <Checkbox
                              key={league.id}
                              bg={"gray.400"}
                              px={"24px"}
                              py={"5"}
                              borderRadius={8}
                              isChecked={values.leagues.includes(league.id)}
                              onChange={() => handleCheckboxChange(league.id)}
                            >
                              {league.name}
                            </Checkbox>
                          ))}
                    </Stack>
                  </Box>

                  <Box mt={12}>
                    <Text fontSize={["28px", "16px"]} fontWeight={600}>
                      International Competitions
                    </Text>

                    <Stack mt={8} spacing={5} direction="row">
                      {leagues.length > 0 &&
                        leagues
                          .filter(
                            (item) => item.competition === "INTERNATIONAL",
                          )
                          .map((league) => (
                            <Checkbox
                              key={league.id}
                              bg={"gray.400"}
                              px={"24px"}
                              py={"5"}
                              borderRadius={8}
                              isChecked={values.leagues.includes(league.id)}
                              onChange={() => handleCheckboxChange(league.id)}
                            >
                              {league.name}
                            </Checkbox>
                          ))}
                    </Stack>
                  </Box>
                </>
              )}
            </ModalBody>

            <ModalFooter paddingRight={editSeason ? "80%" : "55%"}>
              <CustomButton
                type="submit"
                isLoading={isLoading}

                // disabled={errors.name || errors.logo ? true : false}
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
