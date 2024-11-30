import {
  Box,
  Flex,
  Heading,
  Button,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React, { ReactElement, useMemo } from "react";
import { NextPageWithLayout } from "@/pages/_app.page";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Link } from "@chakra-ui/react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FormikHelpers, useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { Column } from "react-table";

import CustomInput from "@/components/CustomInput/CustomInput";

import CustomTable from "@/components/CustomTable";

import { IPlayer } from "@/types/auth";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import ErrorLogger from "@/helpers/errorLogger";

const client = generateClient<Schema>();

const Players: NextPageWithLayout = () => {
  const positionList = [
    {
      value: "gk",
      label: "Goalkeeper",
    },
    {
      value: "df",
      label: "Defender",
    },
    {
      value: "cdm",
      label: "Central Defensive Midfielder",
    },
    {
      value: "cm",
      label: "Central Midfielder",
    },
    {
      value: "cam",
      label: "Central Attack Midfielder",
    },
    {
      value: "fw",
      label: "Forward",
    },
  ];

  const initialPlayer = {
    first_name: "",
    last_name: "",
    position: "",
    goals: "",
    //team: "",
    appearance: "",
    image: "",
    number: "",
  };

  const [allPlayers, setPlayers] = useState<Array<Schema["Player"]["type"]>>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  function listPlayers() {
    setIsLoading(true);

    try {
      client.models.Player.observeQuery().subscribe({
        next: (data) => {
          // console.log("Players", data.items);
          setPlayers([...data.items]);
          setIsLoading(false);
        },
      });
    } catch (error) {
      ErrorLogger(error);
      setIsLoading(false);

    }
  }

  useEffect(() => {
    listPlayers();
  }, []);

  const columns: Column<IPlayer>[] = useMemo(() => {
    return [
      {
        Header: "Image",
        accessor: "image",
        Cell: (value) => (
          <img
            alt="img"
            width="40px"
            height="40px"
            src={value.row.original.image}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "first_name",
        Cell: (value) => (
          <>
            {value.row.original.first_name + " " + value.row.original.last_name}
          </>
        ),
      },
      { Header: "Position", accessor: "position" },
      { Header: "Appearance", accessor: "appearance" },
      { Header: "Goals", accessor: "goals" },
    ];
  }, []);

  const {
    isOpen: isCreatePlayerModalOpen,
    onOpen: onPlayerModalOpen,
    onClose: onCreatePlayerModalClose,
  } = useDisclosure();

  const handleCreatePlayer = async (
    values: IPlayer,
    actions: FormikHelpers<IPlayer>
  ) => {
    // console.log("PLYER", values);

    if (!values.first_name || !values.last_name || !values.number) return;

    setIsLoading(true);

    const { data, errors } = await client.models.Player.create({
      firstName: values.first_name,
      lastName: values.last_name,
      number: Number(values.number),
      position: values.position,
      goals: Number(values.goals),
      appearance: Number(values.appearance),
      image: values.goals,
    });

    if (data) onCreatePlayerModalClose();

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
    initialValues: initialPlayer,
    onSubmit: handleCreatePlayer,
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
          <Heading>Players</Heading>
          <CustomButton
            onClick={onPlayerModalOpen}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Add Player
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {!isLoading && allPlayers.length === 0 && (
            <Center>No players are available</Center>
          )}

          {/* {!isLoading && allPlayers.length > 0 && (
            <CustomTable
              data={allPlayers}
              columns={columns}
              search
              searchPlaceholder="Search for Player"
            />
          )} */}
        </Box>
      </Box>

      <Modal
        isOpen={isCreatePlayerModalOpen}
        onClose={onCreatePlayerModalClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a Player</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CustomInput
                label="Player's First Name"
                placeholder="first_name"
                id="first_name"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("first_name"),
                }}
                mt={6}
                errorText={
                  errors.first_name && touched.first_name
                    ? errors.first_name
                    : null
                }
              />
              <CustomInput
                label="Player's Last Name"
                placeholder="last_name"
                id="last_name"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("last_name"),
                }}
                mt={6}
                errorText={
                  errors.last_name && touched.last_name
                    ? errors.last_name
                    : null
                }
              />
              <CustomInput
                label="Player's Number"
                placeholder="player_number"
                id="number"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("number"),
                  type: "number",
                }}
                mt={6}
                errorText={
                  errors.number && touched.number ? errors.number : null
                }
              />
              <CustomInput
                label="Player Goals"
                placeholder="player_goals"
                id="goals"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("goals"),
                  type: "number",
                }}
                mt={6}
                errorText={errors.goals && touched.goals ? errors.goals : null}
              />
              <CustomInput
                label="Player's Appearance"
                placeholder="appearance"
                id="appearance"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("appearance"),
                  type: "number",
                }}
                mt={6}
                errorText={
                  errors.appearance && touched.appearance
                    ? errors.appearance
                    : null
                }
              />
              <CustomSelect
                mt="20px"
                label="Select Position"
                placeholder="position"
                selectOptions={positionList.map((i) => ({
                  label: i.label,
                  value: i.value,
                }))}
                selectProps={{
                  onChange: (e) => setFieldValue("position", e),
                }}
              />
              <CustomInput
                label="Player's Image Url"
                placeholder="Player's Image Url"
                id="image"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("image"),
                }}
                mt={6}
                errorText={errors.image && touched.image ? errors.image : null}
              />
            </ModalBody>

            <ModalFooter>
              <CustomButton type="submit" isLoading={isLoading} w="100%">
                Create
              </CustomButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

Players.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Players;
