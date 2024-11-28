import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import React from "react";

const CustomModalContainer: React.FC<ModalProps> = ({ isOpen, onClose, children, ...rest }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["full", null, "md"]}
      motionPreset={"slideInBottom"}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent bg="white" borderRadius={"4px"} minW={["full", null, "750px"]}>
        {/* <ModalCloseButton color="#A0A0AA" top={["18px", "26px", "34px"]} /> */}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModalContainer;
