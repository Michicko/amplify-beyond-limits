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
import { Column } from "react-table";
import ErrorLogger from "@/helpers/errorLogger";

import CustomInput from "@/components/CustomInput/CustomInput";

import CustomTable from "@/components/CustomTable";

import { ITeam } from "@/types/auth";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { FileUploader, StorageImage } from "@aws-amplify/ui-react-storage";

const client = generateClient<Schema>();

const Match: NextPageWithLayout = () => {
  const initialTeam = {
    name: "",
    logo: "",
  };

  const [teams, setTeams] = useState<Array<Schema["Team"]["type"]>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function listTeams() {
    setIsLoading(true);
    client.models.Team.observeQuery().subscribe({
      next: (data) => {
        setTeams([...data.items]);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listTeams();
  }, []);

  const columns: Column<ITeam>[] = useMemo(() => {
    return [
      { Header: "Team's name", accessor: "name" },
      {
        Header: "Logo",
        accessor: "logo",
        Cell: ({ value }) => (
          <>
            {value ? (
              <StorageImage alt="logo" width={40} path={value} />
            ) : (
              <img src="" alt="logo" />
            )}
          </>
        ),
      },

    ];
  }, []);

  const {
    isOpen: isCreateTeamModalOpen,
    onOpen: onChairmanModalOpen,
    onClose: onCreateTeamModalClose,
  } = useDisclosure();

  const handleCreateTeam = async (
    values: ITeam
    // actions: FormikHelpers<ITeam>
  ) => {
    if (!values.name) return;
    setIsLoading(true);
    const { data, errors } = await client.models.Team.create({
      name: values.name,
      logo: values.logo,
    });
    if (data) onCreateTeamModalClose();
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
    initialValues: initialTeam,
    onSubmit: handleCreateTeam,
  });

  const handleUploadSuccess = (file: { key?: string }) => {
    file?.key && setFieldValue("logo", file.key);
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
          <Heading>Teams</Heading>
          <CustomButton
            onClick={onChairmanModalOpen}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Add Team
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {!isLoading && teams.length === 0 && (
            <Center>No teams are available</Center>
          )}

          {!isLoading && teams.length > 0 && (
            <CustomTable
              data={teams}
              columns={columns}
              search
              searchPlaceholder="Search for Team"
            />
          )}
        </Box>
      </Box>

      <Modal isOpen={isCreateTeamModalOpen} onClose={onCreateTeamModalClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FileUploader
                acceptedFileTypes={["image/*"]}
                path="media/"
                maxFileCount={1}
                isResumable
                // autoUpload={false}
                onUploadSuccess={handleUploadSuccess}
              />
              <CustomInput
                label="Team's Name"
                placeholder="name"
                id="name"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                }}
                mt={6}
                errorText={errors.name && touched.name ? errors.name : null}
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

Match.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Match;
