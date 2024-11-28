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
import { useState } from "react";
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
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput/CustomInput";
import { DownloadExcel } from "@/components/donwloadData";
import {
  useCreateTeamMutation,
  useGetOneTeamQuery,
  useGetTeamsQuery,
  useUpdateTeamMutation
} from "@/store/api/team.api";
import CustomTable from "@/components/CustomTable";
import { LiaDownloadSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import { ITeam, IGetAllTeamsResponse } from "@/types/auth";


const Match: NextPageWithLayout = () => {
  const {
    data,
    isLoading: isLoadingTeam,
    refetch,
  } = useGetTeamsQuery();
  const router = useRouter();

  const initialTeam = {
   name: "",
   logo: ""
  }

   const handleModalEdit = (value: ITeam) => {
      setEditId(value._id ? value._id : "")
      setFieldValue("logo", value.logo)
      setFieldValue("name", value.name)
      onEditModalOpen()
  }

  const handleEditModalClose = () => {
      setEditId("")
      setFieldValue("logo", "")
      setFieldValue("name", "")
      onEditTeamModalClose()
  }

  const columns: Column<ITeam>[] = useMemo(() => {
    return [
      { Header: "Logo", accessor: "logo", Cell: ({ value }) =>(<><img src={value} alt="img" width="40px" height="40px"/></>)},
      { Header: "Team's name", accessor: "name" },
      { Header: "Action", accessor: "_id", Cell: (value) => <Button onClick={() => handleModalEdit(value.row.original)}>Edit</Button> },
    ];
  }, []);

  const [createTeam, { isLoading, isError }] = useCreateTeamMutation();
  const [editLeague, { isLoading: isLoadingEdit, isError: isErrorEdit }] = useUpdateTeamMutation();
  const [editId, setEditId] = useState("")
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
         if(isEditTeamModalOpen && editId){
      const res = await editLeague({...values, _id: editId}).unwrap();
      if (res.code === 200) {
        handleEditModalClose();
        refetch();
      }
      }else{
       const res = await createTeam(values).unwrap();
      if (res.code === 200) {
        onCreateTeamModalClose();
        refetch();
      }
    } 
    } catch (error) {
      ErrorLogger(error as string);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialTeam,
      onSubmit: handleCreateChairman,
    });

  return (
    <>
      <Box w='full' h='full' pt={[6, 8]}></Box>
      <Box w='full' h='full' py={[4, 6, 8]}>
        <Flex
          align={["flex-start", "center"]}
          justify={["space-between"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          pb={[4, 6]}
        >
          <Link href='/admin/settings'>
            <Flex gap={[1]} align='center'>
              <Icon
                as={IoIosArrowRoundBack}
                color='iconColor'
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
                  mt='50px'
                >
                  <AddIcon mr='2' fontSize={"12px"} fontWeight={"500"} />
                  Add Team
                </CustomButton>
          
        </Flex>
        
        <Box h='full' pt={[6, 8]} borderBottomColor='neutral.50'>
      {!data?.data || isLoadingTeam ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              <CustomTable
                data={data?.data ?? []}
                columns={columns}
                search
                searchPlaceholder='Search for Team'
              />
            </>
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
             <CustomInput
                label="Team's Name"
                placeholder='name'
                id='name'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                }}
                mt={6}
                errorText={
                  errors.name && touched.name
                    ? errors.name
                    : null
                }
              />
              <CustomInput
                label="Team's Logo Url"
                placeholder="Team's logo"
                id='logo'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("logo"),
                }}
                mt={6}
                errorText={
                  errors.logo && touched.logo
                    ? errors.logo
                    : null
                }
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
                placeholder='name'
                id='name'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                  value: values.name
                }}
                mt={6}
                errorText={
                  errors.name && touched.name
                    ? errors.name
                    : null
                }
              />
              <CustomInput
                label="League's Logo Url"
                placeholder="League's logo"
                id='logo'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("logo"),
                  value: values.logo
                }}
                mt={6}
                errorText={
                  errors.logo && touched.logo
                    ? errors.logo
                    : null
                }
              />
            </ModalBody>

            <ModalFooter>
              <CustomButton
                type='submit'
                isLoading={isLoadingEdit}
                isError={isErrorEdit}
                w='100%'
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
