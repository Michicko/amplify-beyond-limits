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
// import { useAuthenticator } from "@aws-amplify/ui-react";

import CustomInput from "@/components/CustomInput/CustomInput";
import CustomTable from "@/components/CustomTable";
import { ISeason } from "@/types/auth";

const Match: NextPageWithLayout = () => {

  // const {signOut} = useAuthenticator()
  const initialSeason = {
    name: "",
    leagues: [],
  };

  const [seasons, setSeasons] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const columns: Column<ISeason>[] = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <>
            <img src={value} alt="img" width="40px" height="40px" />
          </>
        ),
      },
      // { Header: "League's name", accessor: "name" },
    ];
  }, []);


  useEffect(() => {
    // listLeagues();

    // signOut()
  }, []);

  const {
    isOpen: isCreateSeasonModalOpen,
    onOpen: onSeasonModalOpen,
    onClose: onCreateSeasonModalClose,
  } = useDisclosure();

  const handleCreateSeason = async (
    values: ISeason,
    actions: FormikHelpers<ISeason>
  ) => {
    // console.log("Values", values);
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
    initialValues: initialSeason,
    onSubmit: () => {},
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
              search
              searchPlaceholder="Search for League"
            />
          )}
        </Box>
      </Box>

      <Modal
        size="full"
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

              <Text
                color=""
                mt={6}
                // fontWeight={"800"}
                // fontSize={["28px", "32px"]}
              >
                2024/2025 Season
              </Text>
              <Text
                color=""
                // fontWeight={"800"}
                fontSize={["28px", "12px"]}
              >
                Add Leagues you’ll participate in this season
              </Text>

              <Box mt={12}>
                <Text fontSize={["28px", "16px"]} fontWeight={600}>
                  National Competitions
                </Text>

                <Stack mt={8} spacing={5} direction="row">
                  <Checkbox
                    bg={"gray.400"}
                    px={"24px"}
                    py={"5"}
                    borderRadius={8}
                    defaultChecked
                  >
                    The Creative Championship League (TCCL)
                  </Checkbox>
                  <Checkbox
                    bg={"gray.400"}
                    px={"24px"}
                    py={"5"}
                    borderRadius={8}
                    defaultChecked
                  >
                    The Creative Championship League (TCCL)
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter paddingRight={"80%"} textAlign={"left"}>
              <CustomButton
                type="submit"
                isLoading={isLoading}


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
