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
  const initialSeason = {
    name: "",
    leagues: [],
  };

  const [seasons, setSeasons] = useState<Array<Schema["Season"]["type"]>>([]);
  const [leagues, setLeagues] = useState<Array<Schema["League"]["type"]>>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");

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

  async function listLeagues() {
    setIsLoading(true);
    const { data } = await client.models.League.list();

    setLeagues([...data]);
    // console.log('LLL', data)
    setIsLoading(false);
  }

  function listSeasons() {
    setIsLoading(true);
    client.models.Season.observeQuery().subscribe({
      next: (data) => {
        // console.log("Leagues", data.items);
        setSeasons([...data.items]);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listSeasons();
  }, []);

  const handleCreateSeason = async (
    values: ISeason
    // actions: FormikHelpers<ISeason>F
  ) => {
    if (!values.name) return;

    setIsLoading(true);

    const { data, errors } = await client.models.Season.create({
      name: values.name,
      // competition: values.competition,
    });

    if (data) {
      onCreateSeasonModalClose();
      setEditId("");
      setEditName("");
    }
    if (errors) {
      ErrorLogger(errors);
    }

    setIsLoading(false);
  };

  const handleEditSeason = async (
    values: ISeason
    // actions: FormikHelpers<ISeason>F
  ) => {
    if (!values.name) return;

    setIsLoading(true);

    // const { data, errors } = await client.models.Season.update({
    //   leagues: [
    //     {
    //         id: "c65d669a-3879-4089-a22d-42859c7f1a82",
    //         competition: "NATIONAL",
    //         name: "The Creative Championship League "
    //     }
    // ],
      

    // });

    if (data) {
      onCreateSeasonModalClose();
      setEditId("");
      setEditName("");
      
    }
    if (errors) {
      ErrorLogger(errors);
    }

    setIsLoading(false);
  };

  const initiateEditSeason = (id: string, name: string) => {
    setEditId(id);
    setEditName(name)
    onSeasonModalOpen();
    listLeagues();
  };

  const {
    isOpen: isCreateSeasonModalOpen,
    onOpen: onSeasonModalOpen,
    onClose: onCreateSeasonModalClose,
  } = useDisclosure();

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
    onSubmit: handleCreateSeason,
  });

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
        size={editId ? "full" : "lg"}
        isOpen={isCreateSeasonModalOpen}
        onClose={onCreateSeasonModalClose}
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
                  Season
                </Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {!editId && (
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

              {editId && (
                <>
                  <Text
                    color=""
                    mt={6}
                    // fontWeight={"800"}
                    // fontSize={["28px", "32px"]}
                  >
                    {editName}
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
                          .map(() => (
                            <Checkbox
                              bg={"gray.400"}
                              px={"24px"}
                              py={"5"}
                              borderRadius={8}
                              
                            >
                              The Creative Championship League (TCCL)
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
                            (item) => item.competition === "INTERNATIONAL"
                          )
                          .map(() => (
                            <Checkbox
                              bg={"gray.400"}
                              px={"24px"}
                              py={"5"}
                              borderRadius={8}
                              
                            >
                              The Creative Championship League (TCCL)
                            </Checkbox>
                          ))}
                    </Stack>
                  </Box>
                </>
              )}
            </ModalBody>

            <ModalFooter paddingRight={editId ? "80%" : "55%"}>
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
