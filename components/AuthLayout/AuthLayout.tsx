import ErrorLogger from "@/helpers/errorLogger";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setToken, setUser } from "@/store/slice/auth.slice";
import { Box, Center, Spinner } from "@chakra-ui/react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import AuthHeader from "../AuthHeader/AuthHeader";
import { TestUserData } from "@/config/data";
import { decrypto } from "@/helpers/encryption";
import {
  TOKEN_STORAGE_KEY,
  BACKEND_PUBLIC_KEY,
} from "@/config/constants";
import { API_URL } from "@/config/constants";
import { ChakraProvider } from "@chakra-ui/react";
import { Authenticator } from "@aws-amplify/ui-react";
import theme from "@/config/theme";

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getLoggedInUser = async (userToken: string) => {
    try {
      const decryptedToken = await decrypto(userToken);
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          authorization: `Bearer ${decryptedToken}`,
          "x-api-key": BACKEND_PUBLIC_KEY ?? "",
        },
      });
      if (res.data) {
        dispatch(setUser(res.data?.data));
        dispatch(setToken(userToken));
      }
    } catch (error: any) {
      if (error?.response?.data?.message === "jwt expired") {
        window.location.replace("/");
      }
      ErrorLogger(error);
    }
  };

  useEffect(() => {
    if (user) return;
    const token =
      sessionStorage.getItem(TOKEN_STORAGE_KEY as string) ||
      sessionStorage.getItem(TOKEN_STORAGE_KEY as string);

    if (!token) {
      // router.replace("/");
      return;
    }
    getLoggedInUser(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // if (!user)
  //   return (
  //     <ChakraProvider theme={theme}>
  //     <Center w='100vw' h='100vh' bg={"white"}>
  //       <Spinner color='primary.500' size='lg' />
  //     </Center>
  //     </ChakraProvider>
  //   );

  return (
    <Authenticator.Provider>
    <ChakraProvider theme={theme}>
    <Box w='100vw' minH='100vh' h='full' bg={"white"}>
      <Box w='full' h='full' minH='100vh' margin='auto' pt={[0, null, null, 2]}>
        <AuthHeader />
        <Box
          as='main'
          maxW='1240px'
          margin='auto'
          px={[4, null, null, null, 0]}
          h='full'
        >
          {children}
        </Box>
      </Box>
    </Box>
    </ChakraProvider>
    </Authenticator.Provider>
  );
};

export default AuthLayout;
