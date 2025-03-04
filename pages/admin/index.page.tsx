import React, { ReactElement } from "react";
import { HStack } from "@chakra-ui/react";
import theme from "@/config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import GuestLayout from "@/components/GuestLayout/GuestLayout";
import { NextPageWithLayout } from "../_app.page";

import { Authenticator } from "@aws-amplify/ui-react";

const LoginPage: NextPageWithLayout = () => {
  return (
    <ChakraProvider theme={theme}>
      <HStack
        w="100vw"
        mt="80px"
        h="70vh"
        alignItems="center"
        justifyContent="center"
      >
        {/*<Authenticator></Authenticator>*/}
      </HStack>
    </ChakraProvider>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

export default LoginPage;
