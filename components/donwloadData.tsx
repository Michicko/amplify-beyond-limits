import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CustomButton from "./CustomButton/CustomButton";
import { Icon, Flex } from "@chakra-ui/react";
import { LiaDownloadSolid } from "react-icons/lia";

export interface DownloadTypes {
  data: Array<any>;
  name?: string;
  buttonText?: string;
}
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension: any = "xlsx";
export const DownloadExcel = ({ data, name, buttonText }: DownloadTypes) => {
  const download = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = {
      Sheets: { data: ws },
      SheetNames: ["data"],
      border: { style: { top: "thick" } },
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const bData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(bData, name, fileExtension);
  };

  return (
    <CustomButton
      isDisabled={data.length === 0}
      light
      height='48px'
      minW={["full", "210px"]}
      onClick={download}
    >
      <Flex align='center' justify='space-between' gap={[2]}>
        <Icon as={LiaDownloadSolid} color='primary.500' />
        {buttonText}
      </Flex>
    </CustomButton>
  );
};

export const downloadRes = ({ data, name }: DownloadTypes) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = {
    Sheets: { data: ws },
    SheetNames: ["data"],
    border: { style: { top: "thick" } },
  };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const bData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(bData, name, fileExtension);
};
