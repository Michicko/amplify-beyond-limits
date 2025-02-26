import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="transparent" position="relative">
        <Flex
          h={16}
          px="7%"
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
        >
          <Box>
            <Text color="#fff">THE SHOP</Text>
          </Box>
          <Text color="#fff">Youth Development Program of Remo Stars FC</Text>
          <Text color="#fff">CONTACT US</Text>
        </Flex>
        <Flex
          h={16}
          px="7%"
          alignItems={"center"}
          justifyContent={"space-between"}
          position="absolute"
          w="100%"
        >
          <IconButton
            size={"sm"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            //display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box>
            {/* <Image src="/images/white-bg-logo.svg" width={60} height={60}/> */}
          </Box>
          <IconButton
            size={"sm"}
            icon={<SearchIcon />}
            aria-label={"Open Menu"}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
