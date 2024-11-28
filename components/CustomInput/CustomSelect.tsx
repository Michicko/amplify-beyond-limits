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
  SelectProps,
  Select,
  InputRightElement,
  TextareaProps,
} from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export interface IList {
  value: string | any;
  name: string;
}
interface CustomSelectProps extends FormControlProps {
  id: string;
  errorText?: string | undefined | null;
  box?: boolean;
  boxProps?: TextareaProps;
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  topRightEl?: ReactNode;
  list?: Array<IList>;
  selectProps?: SelectProps;
}

const CustomSelect = ({
  id,
  errorText,
  box,
  boxProps,
  leftEl,
  rightEl,
  topRightEl,
  label,
  list,
  selectProps,
  ...rest
}: CustomSelectProps) => {
  return (
    <FormControl isInvalid={!!errorText} {...rest}>
      <Flex align='center' justify='space-between'>
        <FormLabel
          htmlFor={id}
          color='neutral.700'
          fontSize={"14px"}
          fontFamily='body'
          fontWeight='400'
          lineHeight='16px'
        >
          {label}
        </FormLabel>
        {topRightEl ?? null}
      </Flex>

      <InputGroup>
        {leftEl ? (
          <InputLeftElement height='full'>{leftEl}</InputLeftElement>
        ) : null}
        <Select
          placeholder='Select option'
          borderWidth={"1px"}
          borderColor={errorText ? "inputErrorBorder" : "neutral.50"}
          borderRadius='3px'
          bg={"white"}
          color='text'
          w='full'
          fontSize='14px'
          fontFamily='body'
          _focus={{
            border: "primary.500",
          }}
          id={id}
          _hover={{
            borderColor: errorText ? "inputErrorBorder" : "primary.500",
          }}
          {...selectProps}
        >
          {list?.map((i) => (
            <option key={i.value} value={i.value}>
              {i.name}
            </option>
          ))}
        </Select>
      </InputGroup>

      <FormErrorMessage color='inputErrorBorder'>{errorText}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomSelect;
