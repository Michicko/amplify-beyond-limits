import { Box, Button, Divider, Heading, HStack, Text, VStack, TableContainer, Table, TableCaption, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import moment from "moment";

interface ITableProps {
 team_logo: string;
 team_name: string;
 p: number;
 w: number;
 d: number;
 l: number;
 pts: number;
}
interface ILeague {
    data: ITableProps[]
}

const TableCard = ({data}: ILeague) => {
  
    return (
    <Box w={{lg: "44%", md: "50%", sm: "100%"}}>
        <Text color="#fff" fontWeight="900">STANDINGS</Text>
    <Box bg="#1A6DBB" borderRadius={8} w="100%" height="250px">
    <TableContainer w="100%">
  <Table variant='simple'>
    <Thead >
      <Tr>
        <Th color="#fff">POS</Th>
        <Th color="#fff">CLUB</Th>
        <Th color="#fff" isNumeric>P</Th>
        <Th color="#fff" isNumeric>W</Th>
        <Th color="#fff" isNumeric>D</Th>
        <Th color="#fff" isNumeric>L</Th>
        <Th color="#fff" isNumeric>PTS</Th>
      </Tr>
    </Thead>
    <Tbody>
        {data.map((league, idx) => (<Tr key={idx}>
        <Td color="#fff" fontWeight="900">{idx+1}</Td>
        <Td><HStack><img src={league.team_logo} width="25px" height="25px"/><Text color="#fff" fontWeight="900" fontSize="md">{league.team_name}</Text></HStack></Td>
        <Td isNumeric color="#fff" fontWeight="900">{league.p}</Td>
        <Td isNumeric color="#fff" fontWeight="900">{league.w}</Td>
        <Td isNumeric color="#fff" fontWeight="900">{league.d}</Td>
        <Td isNumeric color="#fff" fontWeight="900">{league.l}</Td>
        <Td isNumeric color="#fff" fontWeight="900">{league.pts}</Td>
      </Tr>))}
          
        </Tbody>
        </Table>
        </TableContainer>
          <HStack justifyContent="center">
            <Button w="60%" color="#1A6DBB" bg="#FFD700" mt="30px" fontWeight="900">
                MATCH REPORT <ArrowForwardIcon ml="20px"/>
            </Button>
            </HStack>
        </Box>
        </Box>

    )
}
export default TableCard