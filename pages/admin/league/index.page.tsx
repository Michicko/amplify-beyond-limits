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
  Select,
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

import CustomInput from "@/components/CustomInput/CustomInput";
import CustomTable from "@/components/CustomTable";
import { ILeague } from "@/types/auth";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Match: NextPageWithLayout = () => {
  const initialLeague = {
    name: "",
    logo: "",
    competition: "NATIONAL",
  };

  const [leagues, setLeagues] = useState<Array<Schema["League"]["type"]>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function listLeagues() {
    setIsLoading(true);
    client.models.League.observeQuery().subscribe({
      next: (data) => {
        // console.log("Leagues", data.items);
        setLeagues([...data.items]);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listLeagues();
  }, []);

  const columns: Column<ILeague>[] = useMemo(() => {
    return [
      {
        Header: "Logo",
        accessor: "logo",
        Cell: ({ value }) => (
          <>
            <img src={value} alt="img" width="40" />
          </>
        ),
      },
      { Header: "League's name", accessor: "name" },
      { Header: "Competition", accessor: "competition" },

      { Header: "Date Created", accessor: "createdAt" },
    ];
  }, []);

  const {
    isOpen: isCreateLeagueModalOpen,
    onOpen: onLeagueModalOpen,
    onClose: onCreateLeagueModalClose,
  } = useDisclosure();

  const handleCreateLeague = async (
    values: ILeague,
    actions: FormikHelpers<ILeague>
  ) => {
    if (!values.name) return;

    setIsLoading(true);

    const { data, errors } = await client.models.League.create({
      name: values.name,
      competition: values.competition,
    });

    if (data) onCreateLeagueModalClose();
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
    initialValues: initialLeague,
    onSubmit: handleCreateLeague,
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
          <Heading>Leagues</Heading>
          <CustomButton
            onClick={onLeagueModalOpen}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Create League
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {!isLoading && leagues.length === 0 && (
            <Center>No leagues are available</Center>
          )}

          {!isLoading && leagues.length > 0 && (
            <CustomTable
              data={leagues}
              columns={columns}
              search
              searchPlaceholder="Search for League"
            />
          )}
        </Box>
      </Box>

      <Modal
        isOpen={isCreateLeagueModalOpen}
        onClose={onCreateLeagueModalClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a League</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FileUploader
                acceptedFileTypes={["image/*"]}
                path="public/"
                maxFileCount={1}
                isResumable
                autoUpload={false}
                onUploadSuccess={(file) => {
                  console.log(file);
                }}
              />

              <CustomInput
                label="League's Name"
                placeholder="name"
                id="name"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                }}
                mt={6}
                errorText={errors.name && touched.name ? errors.name : null}
              />

              <Box pt={[6, 8]}>
                <Select
                  placeholder="Select Competition"
                  // borderWidth={"1px"}
                  // borderColor={errorText ? "inputErrorBorder" : "neutral.50"}
                  // borderRadius='3px'
                  bg={"white"}
                  // color="text"
                  // w="full"
                  fontSize="14px"
                  fontFamily="body"
                  // _focus={{
                  //   border: "primary.500",
                  // }}
                  id="competition"
                  // _hover={{
                  //   borderColor: errorText ? "inputErrorBorder" : "primary.500",
                  // }}
                  // {...selectProps}
                  onChange={handleChange}
                >
                  <option value={"NATIONAL"}>NATIONAL</option>
                  <option value={"INTERNATIONAL"}>INTERNATIONAL</option>
                </Select>
              </Box>
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type="submit"
                isLoading={isLoading}
                w="100%"
                // disabled={errors.name || errors.logo ? true : false}
              >
                Create
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
