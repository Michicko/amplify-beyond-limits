import { Button, ButtonProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface CustomButtonProps extends ButtonProps {
  light?: boolean;
  isError?: boolean;
  small?: boolean;
}
interface Props {
  props: CustomButtonProps;
  ref: any;
}

const CustomButton = (props: CustomButtonProps, ref: any) => {
  const { light, children, isError, isLoading, small, ...rest } = props;
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setShowSpinner(false);
    }
  }, [isError]);

  return (
    <Button
      height={small ? "40px" : "48px"}
      bg={light ? "white" : "primary.500"}
      color={light ? "primary.500" : "white"}
      borderWidth={"1px"}
      // borderColor={light ? "primary.500" : "transparent"}
      borderColor={"primary.500"}
      borderRadius='4px'
      fontWeight='600'
      fontSize={["14px"]}
      minW='200'
      fontFamily='body'
      transition='all .2s ease-in-out'
      _hover={{
        transform: "scale(1.03)",
      }}
      isLoading={showSpinner}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
