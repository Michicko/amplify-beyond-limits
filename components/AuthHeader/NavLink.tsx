import React from "react";
import { LinkType } from "./Links";
import { Link } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";

interface INavLink extends LinkType {
  isActive?: boolean;
  onClick?: () => void;
}

export const BigNavLink: React.FC<INavLink> = ({ url, linkName, isActive }) => {
  return (
    <Link
      href={url}
      style={{ height: "100%" }}
      className='linkHover'
      _hover={{ textTransform: "none" }}
    >
      <Flex
        h='full'
        align='center'
        borderBottom={isActive ? "2px solid red" : "none"}
        borderColor={"primary.500"}
      >
        <Text
          color={isActive ? "primary.500" : "neutral.500"}
          fontSize='16px'
          fontWeight={isActive ? "700" : "400"}
        >
          {linkName}
        </Text>
      </Flex>
    </Link>
  );
};

export const SmallNavLink: React.FC<INavLink> = ({
  url,
  linkName,
  isActive,
  onClick,
}) => {
  return (
    <Link
      href={url}
      style={{ height: "100%" }}
      className='linkHover'
      onClick={onClick}
    >
      <Flex h='full' align='center'>
        <Text
          color={isActive ? "primary.500" : "neutral.500"}
          fontSize='16px'
          fontWeight={isActive ? "700" : "400"}
          py={[2]}
          px={[4]}
          borderRadius={"4px"}
          background={isActive ? "rgba(1, 119, 59, 0.10)" : "transparent"}
          minW='150px'
        >
          {linkName}
        </Text>
      </Flex>
    </Link>
  );
};
