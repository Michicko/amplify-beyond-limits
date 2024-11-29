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
} from "@chakra-ui/react";
import React, { ReactElement, useMemo, useState } from "react";
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
// import CustomTable from "@/components/CustomTable";
import { ITeam, IGetAllTeamsResponse, ILeague } from "@/types/auth";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const Match: NextPageWithLayout = () => {
  const initialTeam = {
    name: "",
    logo: "",
  };

  const [leagues, setLeagues] = useState<Array<Schema["League"]["type"]>>([]);

  const handleModalEdit = (value: ILeague) => {
    setEditId(value._id ? value._id : "");
    setFieldValue("logo", value.logo);
    setFieldValue("name", value.name);
    onEditModalOpen();
  };

  const handleEditModalClose = () => {
    setEditId("");
    setFieldValue("logo", "");
    setFieldValue("name", "");
    onEditTeamModalClose();
  };

  const columns: Column<ILeague>[] = useMemo(() => {
    return [
      {
        Header: "Logo",
        accessor: "logo",
        Cell: ({ value }) => (
          <>
            <img src={value} alt="img" width="40px" height="40px" />
          </>
        ),
      },
      { Header: "League's name", accessor: "name" },
      {
        Header: "Action",
        accessor: "_id",
        Cell: (value) => (
          <Button onClick={() => handleModalEdit(value.row.original)}>
            Edit
          </Button>
        ),
      },
    ];
  }, []);

  const [editId, setEditId] = useState("");

  const {
    isOpen: isCreateTeamModalOpen,
    onOpen: onChairmanModalOpen,
    onClose: onCreateTeamModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditTeamModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditTeamModalClose,
  } = useDisclosure();

  const handleCreateChairman = async (
    values: ITeam,
    actions: FormikHelpers<ITeam>
  ) => {
    try {
      await client.models.League.create({
        name: "",
      });
      // onCreateTeamModalClose();
    } catch (error) {
      ErrorLogger(error as string);
    }
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
    onSubmit: handleCreateChairman,
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
            onClick={onChairmanModalOpen}
            height={"48px"}
            minW={["full", "50px"]}
            mt="50px"
          >
            <AddIcon mr="2" fontSize={"12px"} fontWeight={"500"} />
            Create League
          </CustomButton>
        </Flex>

        <Box h="full" pt={[6, 8]} borderBottomColor="neutral.50">
          {!(leagues.length > 0) ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              {/* <CustomTable
                data={data?.data ?? []}
                columns={columns}
                search
                searchPlaceholder="Search for League"
              /> */}
              <div>leagues are available</div>
            </>
          )}
        </Box>
      </Box>

      <Modal isOpen={isCreateTeamModalOpen} onClose={onCreateTeamModalClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a League</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
              <CustomInput
                label="League's Logo Url"
                placeholder="League's logo"
                id="logo"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("logo"),
                }}
                mt={6}
                errorText={errors.logo && touched.logo ? errors.logo : null}
              />
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type="submit"
                // isLoading={isLoading}
                // isError={isError}
                w="100%"
              >
                Create
              </CustomButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Modal isOpen={isEditTeamModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit a League</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CustomInput
                label="League's Name"
                placeholder="name"
                id="name"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                  value: values.name,
                }}
                mt={6}
                errorText={errors.name && touched.name ? errors.name : null}
              />
              <CustomInput
                label="League's Logo Url"
                placeholder="League's logo"
                id="logo"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("logo"),
                  value: values.logo,
                }}
                mt={6}
                errorText={errors.logo && touched.logo ? errors.logo : null}
              />
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type="submit"
                // isLoading={isLoadingEdit}
                // isError={isErrorEdit}
                w="100%"
              >
                Update
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
