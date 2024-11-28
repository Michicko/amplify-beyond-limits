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
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput/CustomInput";
import { DownloadExcel } from "@/components/donwloadData";
import {
  useCreateNewsMutation,
  useGetNewsQuery,
  useGetOneNewsQuery,
  useUpdateNewsMutation
} from "@/store/api/news.api";
import CustomTable from "@/components/CustomTable";
import { useRouter } from "next/router";
import { EditorState, convertToRaw, Modifier, SelectionState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { INews } from "@/types/auth";
import moment from "moment";
import CustomInputField from "@/components/CreateNewsForm";
import dynamic from "next/dynamic";


const Editor = dynamic(() => import("../../../components/CreateNewsForm"), {ssr: false})
const Match: NextPageWithLayout = () => {
  const {
    data,
    isLoading: isLoadingNews,
    refetch,
  } = useGetNewsQuery();
  const router = useRouter();

  const initialNews = {
   head_line: "",
    news: "",
    image: "",
  }

  const handleModalEdit = (value: INews) => {
      setEditId(value._id ? value._id : "")
      setFieldValue("news", value.news)
      setFieldValue("image", value.image)
      setFieldValue("head_line", value.head_line)
      onEditModalOpen()
  }

  const handleEditModalClose = () => {
      setEditId("")
      setFieldValue("news", "")
      setFieldValue("image", "")
      setFieldValue("head_line", "")
      onEditModalClose()
  }

  const columns: Column<INews>[] = useMemo(() => {
    return [
      { Header: "Head line", accessor: "head_line"},
      { Header: "Date", accessor: "createdAt", Cell: ({value}) => <>{moment(value).format("DD-MMMM-YYYY, h:m") }</>},
      { Header: "Action", accessor: "_id", Cell: (value) => <Button onClick={() => handleModalEdit(value.row.original)}>Edit</Button> },
    ];
  }, []);

    const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );
 const [rawText, setRawText] = useState('');
  const [createNews, { isLoading, isError }] = useCreateNewsMutation();
  const [news, set_news] = useState("")
  const [editNews, { isLoading: isLoadingEdit, isError: isErrorEdit }] = useUpdateNewsMutation();
  const [editId, setEditId] = useState("")
  const {
    isOpen: isCreateNewsModalOpen,
    onOpen: onChairmanModalOpen,
    onClose: onCreateNewsModalClose,
  } = useDisclosure();

    const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const handleCreateChairman = async (
    values: INews,
    actions: FormikHelpers<INews>
  ) => {
    try {
      if(isEditModalOpen && editId){
      const res = await editNews({...values, _id: editId}).unwrap();
      if (res.code === 200) {
        handleEditModalClose();
        refetch();
      }
      }else{
      const res = await createNews({...values, news}).unwrap();
      if (res.code === 200) {
        onCreateNewsModalClose();
        refetch();
      }}
    } catch (error) {
      ErrorLogger(error as string);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialNews,
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
          <Heading>News</Heading>
              <CustomButton
                  onClick={onChairmanModalOpen}
                  height={"48px"}
                  minW={["full", "50px"]}
                  mt='50px'
                >
                  <AddIcon mr='2' fontSize={"12px"} fontWeight={"500"} />
                  Create News
                </CustomButton>
          
        </Flex>
        
        <Box h='full' pt={[6, 8]} borderBottomColor='neutral.50'>
      {!data?.data || isLoadingNews ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              <CustomTable
                data={data?.data ?? []}
                columns={columns}
                search
                searchPlaceholder='Search for News'
              />
            </>
          )}
        </Box>
      </Box>

      <Modal isOpen={isCreateNewsModalOpen} onClose={onCreateNewsModalClose} size="4xl">
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create a News</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <CustomInput
                label="Head Line"
                placeholder='head_line'
                id='head_line'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("head_line"),
                }}
                mt={6}
                errorText={
                  errors.head_line && touched.head_line
                    ? errors.head_line
                    : null
                }
              />
              <CustomInput
                label="News Image"
                placeholder="image"
                id='image'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("image"),
                }}
                mt={6}
                errorText={
                  errors.image && touched.image
                    ? errors.image
                    : null
                }
              />
              <Box bg="grey" mt={5}>
             <Editor
              editorState={editorState} 
              setEditorState={setEditorState}
              news={news}
              set_news={set_news}
             />           
              </Box>
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


          <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit News</ModalHeader>
            <ModalCloseButton />
             <ModalBody>
             <CustomInput
                label="Head Line"
                placeholder='head_line'
                id='head_line'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("head_line"),
                  value: values.head_line
                }}
                mt={6}
                errorText={
                  errors.head_line && touched.head_line
                    ? errors.head_line
                    : null
                }
              />
              <CustomInput
                label="News Image"
                placeholder="image"
                id='image'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("image"),
                  value: values.image
                }}
                mt={6}
                errorText={
                  errors.image && touched.image
                    ? errors.image
                    : null
                }
              />
               <CustomInput
                label="News Detail"
                placeholder="news"
                id='news'
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur("news"),
                  value: values.news
                }}
                mt={6}
                errorText={
                  errors.news && touched.news
                    ? errors.news
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
