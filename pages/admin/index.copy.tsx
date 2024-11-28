import CustomButton from "@/components/CustomButton/CustomButton";
import CustomInput from "@/components/CustomInput/CustomInput";
import ErrorLogger from "@/helpers/errorLogger";
import {
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React, { ReactElement } from "react";
import * as Yup from "yup";
import theme from "@/config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { useLoginUserMutation } from "@/store/api/auth.api";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { TOKEN_STORAGE_KEY } from "@/config/constants";
import { setToken, setUser } from "@/store/slice/auth.slice";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import { NextPageWithLayout } from "../_app.page";
import { encrypto } from "@/helpers/encryption";

interface IFormValues {
  email: string;
  password: string;
}

const initialValues: IFormValues = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage: NextPageWithLayout = () => {
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (values: IFormValues) => {
    try {
      const res = await loginUser(values).unwrap();
      const encryptedToken = await encrypto(res.token);
      if (encryptedToken) {
        sessionStorage.setItem(TOKEN_STORAGE_KEY as string, encryptedToken);
        dispatch(setUser(res.data));
        dispatch(setToken(encryptedToken));
      }
    } catch (error) {
      ErrorLogger(error as string);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  return (
     <ChakraProvider theme={theme}>
    <HStack w='100vw' mt="50px" h="70vh" alignItems="center" justifyContent="center">
        <Box w={["full", "50%"]} >
       
          <Heading size='sm' fontWeight='700' my={[4, 6, 8]} color="#fff">
            Log in to your account
          </Heading>

          <form onSubmit={handleSubmit}>
            <CustomInput
              label='Email address'
              placeholder='Enter your email address'
              id='email'
              labelColor="#fff"
              inputProps={{
                value: values.email,
                onChange: handleChange,
                onBlur: handleBlur("email"),
                type: "email",
              }}
              errorText={errors.email && touched.email ? errors.email : null}
            />

            <CustomInput
              label='Password'
              labelColor="#fff"
              placeholder='Enter your unique password'
              id='password'
              inputProps={{
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur("password"),
              }}
              errorText={
                errors.password && touched.password ? errors.password : null
              }
              mt={6}
              password
            />

       
            <CustomButton
              mt={[5, 6]}
              type='submit'
              w='full'
              isLoading={isLoading}
              isError={isError}
              small
            >
              Log in
            </CustomButton>
          </form>

         
        </Box>
    </HStack>
    </ChakraProvider>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default LoginPage;
