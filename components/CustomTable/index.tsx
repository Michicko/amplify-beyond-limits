import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Icon,
  IconButton,
  Select,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Center,
  Spinner,
  InputLeftElement,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  TableToggleRowsSelectedProps,
} from "react-table";
import styles from "./CustomTable.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { DownloadExcel } from "../donwloadData";
import { PiCaretDownBold } from "react-icons/pi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React, { ReactNode, useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import useMediaQuery from "@/hooks/useMediaQuery";
import CustomSelect, { IList } from "../CustomInput/CustomSelect";
import type { Schema } from "@/amplify/data/resource";

type Props = {
  data: any[];
  columns: any[];
  rowClickAction?: (val: any) => void;
  title?: string | ReactNode;
  search?: boolean;
  searchPlaceholder?: string;
  filterText?: string;
  topRightEl?: ReactNode;
  isLoading?: boolean;
  handleSetDateRange?: (val: string) => void;
  dateRange?: string;
  fromDate?: string;
  toDate?: string;
  handleSetFromDate?: (val: any) => void;
  handleSetToDate?: (val: any) => void;
  excelFormatIndex?: number;
  excelFormat?: boolean;
  canSelectRows?: boolean;
  onFilter?: (data?: any) => void;
  filterDate?: boolean;
  filterRevenuehead?: boolean;
  inputIdStart?: string;
  inputIdEnd?: string;
  sortWithDate?: () => void;
  setSelectedRowsCount?: (value: number) => void;
  downloadButtonTitle?: string;
  downloadFileTitle?: string;
  downloadExcelData?: Array<any>;
  setSelectedRows?: (value: Record<string, boolean>) => void;
  filterList?: Array<IList>;
  onFilterRevenuehead?: (value: any) => void;
  filterRevenueheadList?: Array<IList>;
  initiateEditSeason?: (season: any) => void;

};

interface CheckboxProps extends TableToggleRowsSelectedProps {
  disabled?: boolean;
}

// @ts-ignore
// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef((props: CheckboxProps, ref) => {
  //
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = props.indeterminate;
  }, [resolvedRef, props.indeterminate]);

  useEffect(() => {
    if (props.disabled) {
      // @ts-ignore
      resolvedRef.current.checked = false;
    }
  }, [props.checked]);

  return (
    // @ts-ignore
    <input type="checkbox" ref={resolvedRef} {...props} />
  );
});

const rowsPerPage = 8;

const CustomTable = ({
  data,
  columns,
  rowClickAction,
  title,
  search = false,
  searchPlaceholder = "Search",
  isLoading,
  downloadExcelData,
  handleSetDateRange,
  dateRange,
  fromDate,
  downloadButtonTitle,
  downloadFileTitle,
  toDate,
  handleSetFromDate,
  handleSetToDate,
  onFilter,
  excelFormatIndex = 0,
  excelFormat,
  canSelectRows,
  setSelectedRowsCount,
  setSelectedRows,
  filterText,
  inputIdStart,
  inputIdEnd,
  topRightEl,
  filterDate,
  sortWithDate,
  filterList,
  filterRevenuehead,
  onFilterRevenuehead,
  filterRevenueheadList,
  initiateEditSeason
}: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      data,
      columns,
      initialState: { pageIndex: 0, pageSize: rowsPerPage },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (!canSelectRows) return;
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            // @ts-ignore
            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            // console.log({ row });
            const props = row.getToggleRowSelectedProps();

            return (
              // @ts-ignore
              <IndeterminateCheckbox
                {...props}
                disabled={row?.values?.status === "failed"}
              />
            );
          },
        },
        ...columns,
      ]);
    }
  );

  const [searchVal, setSearchVal] = useState(globalFilter);
  const { colorMode } = useColorMode();

  const onChangeSearch = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);

  const startNum = pageIndex * pageSize + 1;
  const endNum =
    pageIndex * pageSize + pageSize > rows.length
      ? rows.length
      : pageIndex * pageSize + pageSize;

  useEffect(() => {
    if (setSelectedRowsCount && setSelectedRows && canSelectRows) {
      setSelectedRowsCount(Object.keys(selectedRowIds).length);
      setSelectedRows(selectedRowIds);
    }
  }, [selectedRowIds]);

  // const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const isSmallScreen = useMediaQuery("(max-width: 0px)");

  return (
    <>
      <Box mt={title ? [6, 8, 10] : search ? 3 : 0}>
        {/* TABLE */}
        <Box overflowX="scroll" className={styles.container} bg="white">
          {isLoading ? (
            <Center py="8">
              <Spinner size="lg" color="primary.500" />
            </Center>
          ) : isSmallScreen ? (
            <VStack w="full" spacing={4} bg="white">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Flex
                    key={row.id}
                    border="1px solid red"
                    borderColor={"neutral.100"}
                    p="4"
                    wrap="wrap"
                    gap="4"
                    mb="2"
                    w="full"
                    borderRadius={"4px"}
                  >
                    {row.cells.map((cell) => (
                      <Box key={cell.column.id}>
                        <Text color="textTwo" fontWeight="600">
                          {cell.column.Header as string}
                        </Text>
                        <Text
                          color={colorMode === "dark" ? "#A9A9B0" : "#686873"}
                        >
                          {cell.render("Cell")}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                );
              })}
            </VStack>
          ) : (
            <Table
              {...getTableProps()}
              fontFamily="body"
              variant="unstyled"
              position="relative"
              bg="white"
            >
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={Math.random()}
                    borderBottom="1px solid #f2f2f2"
                    borderColor="lineColor"
                  >
                    {headerGroup.headers.map((column, index) => {
                      if (excelFormat && index <= excelFormatIndex) {
                        return (
                          <Th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            key={Math.random()}
                            color="textTwo"
                            fontWeight="600"
                            fontSize={["0.875rem", "1rem"]}
                            textTransform="capitalize"
                            fontFamily="body"
                            py={[4]}
                            position="sticky"
                            left={index ? excelFormatIndex * 100 : 0}
                            className={
                              index === excelFormatIndex
                                ? "table-excel-border"
                                : ""
                            }
                            bg="white"
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                            {/* <Box>{column.canFilter ? column.render("Filter") : null}</Box> */}
                          </Th>
                        );
                      } else {
                        return (
                          <Th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            key={Math.random()}
                            color="textTwo"
                            fontWeight="600"
                            fontSize={["0.875rem", "1rem"]}
                            textTransform="capitalize"
                            fontFamily="body"
                            py={[4]}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                            {/* <Box>{column.canFilter ? column.render("Filter") : null}</Box> */}
                          </Th>
                        );
                      }
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      key={Math.random()}
                      _hover={{
                        background:
                          colorMode === "dark" ? "#1B1B1D" : "#fbfbfb",
                      }}
                      cursor="pointer"
                      onClick={() =>initiateEditSeason && initiateEditSeason(row.original)}
                      // onClick={rowClickAction ? () => rowClickAction(row.original) : () => null}
                      // onClick={() => {
                      //   if (canSelectRows) return;
                      //   if (rowClickAction) {
                      //     rowClickAction(row.original);
                      //   }
                      // }}
                      borderBottom="1px solid #f2f2f2"
                      borderColor="lineColor"
                    >
                      {row.cells.map((cell, index) => {
                        if (excelFormat && index <= excelFormatIndex) {
                          return (
                            <Td
                              {...cell.getCellProps()}
                              key={Math.random()}
                              color={
                                colorMode === "dark" ? "#A9A9B0" : "#686873"
                              }
                              fontWeight="400"
                              fontSize={["0.75rem", "0.875rem"]}
                              fontFamily="body"
                              py={[1, 4]}
                              minWidth="100px"
                              position="sticky"
                              left={index ? excelFormatIndex * 100 : 0}
                              className={
                                index === excelFormatIndex
                                  ? "table-excel-border"
                                  : ""
                              }
                              bg="white"
                              onClick={() => {
                                if (
                                  canSelectRows &&
                                  cell.column.id === "selection"
                                )
                                  return;
                                if (cell.column.id === "noClick") return;
                                if (rowClickAction) {
                                  rowClickAction(row.original);
                                }
                              }}
                            >
                              {cell.render("Cell")}
                            </Td>
                          );
                        } else {
                          return (
                            <Td
                              {...cell.getCellProps()}
                              key={Math.random()}
                              color={
                                colorMode === "dark" ? "#A9A9B0" : "#686873"
                              }
                              fontWeight="500"
                              fontSize={["0.75rem", "0.875rem"]}
                              fontFamily="body"
                              py={[1, 4]}
                              minWidth="100px"
                              onClick={() => {
                                if (
                                  canSelectRows &&
                                  cell.column.id === "selection"
                                )
                                  return;
                                if (cell.column.id === "noClick") return;
                                if (rowClickAction) {
                                  rowClickAction(row.original);
                                }
                              }}
                            >
                              {cell.render("Cell")}
                            </Td>
                          );
                        }
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CustomTable;
