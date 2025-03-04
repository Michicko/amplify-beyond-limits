import { decrypto } from "@/helpers/encryption";
import ErrorLogger from "@/helpers/errorLogger";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setToken, setUser } from "@/store/slice/auth.slice";
import { Box, Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL, TOKEN_STORAGE_KEY } from "@/config/constants";
import React, { ReactNode, useEffect, useState } from "react";
import Footer from "../Footer/footer";
import Nav from "../Nav/Nav";
import {formula_condensed, roboto} from '@/styles/fonts';


const GuestLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAuthUserRouting = (userDataType: string) => {
    switch (userDataType) {
      case "admin":
        return router.replace("/admin/dashboard");
      default:
        router.replace("/");
    }
  };

  const getLoggedInUser = async (userToken: string) => {
    setIsLoading(true);
    try {
      const decryptedToken = await decrypto(userToken);
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          authorization: `Bearer ${decryptedToken}`,
        },
      });
      if (res.data) {
        dispatch(setUser(res.data?.data));
        dispatch(setToken(userToken));
      }
    } catch (error) {
      ErrorLogger(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) return;
    const token =
      sessionStorage.getItem(TOKEN_STORAGE_KEY as string) ||
      sessionStorage.getItem(TOKEN_STORAGE_KEY as string);
    if (!token) return;
    getLoggedInUser(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      handleAuthUserRouting(user?.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading)
    return (
      <Center w="100vw" h="100vh" bg="white">
        <Spinner color="primary.500" size="lg" />
      </Center>
    );
  return (
    <div
      style={{
        backgroundImage: "url(/images/bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "0px",
      }}
    >
      <div className="container">
        {/* <Header /> */}
        <Nav />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default GuestLayout;
