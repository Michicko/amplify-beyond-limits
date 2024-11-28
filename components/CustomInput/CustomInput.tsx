import {
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  TextareaProps,
} from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface CustomInputProps extends FormControlProps {
  inputProps?: InputProps;
  id: string;
  errorText?: string | undefined | null;
  box?: boolean;
  boxProps?: TextareaProps;
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  topRightEl?: ReactNode;
  password?: boolean;
  labelColor?: string;
}

const CustomInput = ({
  inputProps,
  id,
  errorText,
  box,
  boxProps,
  leftEl,
  rightEl,
  topRightEl,
  label,
  password,
  labelColor,
  ...rest
}: CustomInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <FormControl isInvalid={!!errorText} {...rest}>
      <Flex align="center" justify="space-between">
        <FormLabel
          htmlFor={id}
          color={ labelColor ? labelColor : "neutral.700"}
          fontSize={"14px"}
          fontFamily="body"
          fontWeight="400"
          lineHeight="16px"
        >
          {label}
        </FormLabel>
        {topRightEl ?? null}
      </Flex>

      <InputGroup>
        {leftEl ? <InputLeftElement height="full">{leftEl}</InputLeftElement> : null}
        <Input
          borderWidth={"1px"}
          borderColor={errorText ? "inputErrorBorder" : "neutral.50"}
          borderRadius="3px"
          bg={"white"}
          pr={rightEl ? 8 : 2}
          pl={leftEl ? 8 : 2}
          color="text"
          w="full"
          fontSize="14px"
          fontFamily="body"
          _focus={{
            border: "primary.500",
          }}
          type={password && !isVisible ? "password" : inputProps?.type}
          id={id}
          _hover={{
            borderColor: errorText ? "inputErrorBorder" : "primary.500",
          }}
          _placeholder={{ color: "neutral.300" }}
          {...inputProps}
        />
        {password ? (
          <InputRightElement height="full">
            <IconButton
              aria-label="Search database"
              icon={
                isVisible ? (
                  <Icon as={IoEyeOffOutline} color="neutral.100" size={16} />
                ) : (
                  <Icon as={IoEyeOutline} color="neutral.100" size={16} />
                )
              }
              onClick={toggleVisibility}
            />
          </InputRightElement>
        ) : rightEl ? (
          <InputRightElement height="full">{rightEl}</InputRightElement>
        ) : null}
      </InputGroup>

      <FormErrorMessage color="inputErrorBorder">{errorText}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
