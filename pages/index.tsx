import GuestLayout from "@/components/GuestLayout/GuestLayout";
import Home from "@/components/HomeContent/index.page";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleAuthUserRouting = (userDataType: string) => {
    switch (userDataType) {
      case "admin":
        return router.replace("/admin/dashboard");
      default:
        router.replace("/admin/dashboard");
    }
  };

  useEffect(() => {
    if (user) {
      handleAuthUserRouting(user?.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // If user is authenticated, show loading or route. Otherwise, show the home content.
  return user ? (
    <Center w="100vw" h="100vh" bg="white">
      <Spinner color="primary.500" size="lg" />
    </Center>
  ) : (
    <GuestLayout>
      <Home/>
    </GuestLayout>
    
  );
}