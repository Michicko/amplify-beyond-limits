import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
  Show,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CiBellOn } from "react-icons/ci";
import OredoAvatar from "/images/oredo-avatar.webp";
import Image from "next/image";
import { logoutUser } from "@/store/slice/auth.slice";
import { signOut } from "aws-amplify/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { NAV_LINKS } from "./Links";
import { BigNavLink, SmallNavLink } from "./NavLink";
import { useRouter } from "next/router";

const AuthHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const btnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = async () => {
    // await dispatch(logoutUser());
    await signOut();
    router.push("/admin");
  };
  const { colorMode, toggleColorMode } = useColorMode();

  const filterNavLinks = (links: any, user: any) => {
    const revenueHeadFilter = [
      "Certificate Of Origin",
      "Burial Ground Permit",
      "Marriage Certificate",
      "Sticker",
      "Wheel Barrow",
      "Sanitation Pollution Abatement",
      "Market",
      "Street Naming",
      "Closure Of Minor Road",
      "Public Car Park",
      "Erect Monument Tomb Permit",
      "Exhume Human Carcass Permit",
    ];
    if (
      !revenueHeadFilter.some((head) =>
        head.includes(user?.revenue_head_id?.dispaly_name)
      )
    ) {
      return links.filter((link: any) => link.linkName !== "Applications");
    }
    return links;
  };

  const filteredNavLinks = filterNavLinks(
    NAV_LINKS[user?.role ?? "admin"],
    user
  );

  return (
    <Box borderBottomWidth="1px" borderBottomColor="neutral.50" as="header">
      <Flex
        align="center"
        justify="space-between"
        maxW="1240px"
        margin="auto"
        px={[4, null, null, null, 0]}
      >
        {/* HAMBURGER AND LOGO */}
        <Flex align="center" gap={[2]} pt={[2, null, 2]} pb={[2, null, 1]}>
          <Show breakpoint="(max-width: 992px)">
            <IconButton
              aria-label="Toggle mobile nav menu"
              icon={<HamburgerIcon color="textTwo" fontSize={24} />}
              ref={btnRef}
              onClick={onOpen}
              size="xs"
              p="0"
              bg="transparent"
            />
          </Show>
          <Link href="/">
            <img src="/images/white-bg-logo.svg" height={50} width={50} />
          </Link>
        </Flex>

        {/* NAV LINKS FOR BIG SCREENS */}
        <Hide breakpoint="(max-width: 992px)">
          <Flex as="nav" align="center" gap={[10, null, null, 12]} h="52px">
            {user?.enforcer_type === "revenue_head"
              ? filteredNavLinks.map((link: any) => {
                  return (
                    <BigNavLink
                      key={link.url}
                      {...link}
                      isActive={router.pathname.startsWith(link.url)}
                    />
                  );
                })
              : NAV_LINKS[user?.role ?? "admin"].map((link) => {
                  return (
                    <BigNavLink
                      key={link.url}
                      {...link}
                      isActive={router.pathname.startsWith(link.url)}
                    />
                  );
                })}
          </Flex>
        </Hide>

        {/* NOTIFICATION BELL, PICTURE, AND NAME */}
        <Flex align="center" gap={[4]} pt={[2, null, 2]} pb={[2, null, 1]}>
          <IconButton
            aria-label="Toggle dark mode"
            icon={
              colorMode === "light" ? (
                <MoonIcon color="iconColor" />
              ) : (
                <SunIcon color="iconColor" />
              )
            }
            onClick={toggleColorMode}
            bg={colorMode === "dark" ? "#1B1B1D" : "gray.100"}
            _hover={{ opacity: "0.7" }}
          />

          <Menu>
            <MenuButton as="button">
              <Flex align="center" gap={2}>
                {/* <Image
                  alt='Avatar image'
                  src='/images/avatar.webp'
                  width={32}
                  height={32}
                /> */}

                <img src="/images/avatar.webp" width={32} />
                <Hide breakpoint="(max-width: 992px)">
                  <Text
                    fontSize={16}
                    color="textTwo"
                    fontWeight="500"
                    textTransform="capitalize"
                  >
                    {user?.role ?? "Admin"}
                  </Text>
                </Hide>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* DRAWER MENU FOR SMALLER SCREENS */}
      <Show breakpoint="(max-width: 992px)">
        <Box as="nav">
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="xs"
          >
            <DrawerOverlay />
            <DrawerContent position="relative" bg="white">
              <DrawerCloseButton color="#A0A0AA" />
              <DrawerBody px={[4]} mt={[4]}>
                <img src="/images/white-bg-logo.svg" />
                <Flex direction="column" mt={12} gap={8}>
                  {NAV_LINKS[user?.role ?? "admin"].map((link) => {
                    return (
                      <SmallNavLink
                        key={link.url}
                        {...link}
                        isActive={router.pathname.startsWith(link.url)}
                        onClick={onClose}
                      />
                    );
                  })}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Show>
    </Box>
  );
};

export default AuthHeader;
