import { Input } from "@chakra-ui/react";
import React from "react";
import OTPInput from "react-otp-input";

interface ICustomOtpInputProps {
  otp: string;
  handleOtpChange: (value: string) => void;
  numberOfInputs: number;
}

const CustomOtpInput: React.FC<ICustomOtpInputProps> = ({
  otp,
  handleOtpChange,
  numberOfInputs,
}) => {
  return (
    <OTPInput
      value={otp}
      onChange={handleOtpChange}
      numInputs={numberOfInputs ?? 4}
      renderInput={(props) => (
        <Input
          {...props}
          borderColor="neutral.50"
          color="text"
          borderRadius={"4px"}
          bg="white"
          height="48px"
          fontSize="14px"
          fontFamily="body"
          _hover={{ borderColor: "neutral.50" }}
        />
      )}
      containerStyle={{
        display: "flex",
        justifyContent: "space-between",
      }}
      inputStyle={{
        width: "48px",
      }}
      inputType="password"
    />
  );
};

export default CustomOtpInput;
