import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import BallIconSVG from "../public/images/beyond-limit-ball.svg";

import Format from "@/components/NumberFormat/Format";
import Image from "next/image";
import numeral from "numeral";
import Link from "next/link";

interface IDashboardDetail {
  title: string;
  amount: string;
  isLoading?: boolean;
  currency?: boolean;
  href?: string;
}

const DashboardDetail: React.FC<IDashboardDetail> = ({
  title,
  amount,
  currency,
  href,
  isLoading,
}) => {
  return (
    <Link href={`${href}`}>
      <Flex
      border='1px solid red'
      borderColor={"neutral.100"}
      py={["32px", "40px", "48px"]}
      px={"24px"}
      borderRadius={"8px"}
      gap={[4]}
      minW={["full", "300px"]}
        flex='1'
        cursor="pointer"
    >
      <Center
        borderRadius='full'
        height={"48px"}
        width={"48px"}
        bg='primary.500'
      >
        <Image src={BallIconSVG} alt='ball icon' width={24} height={24} />
      </Center>
      <Box>
        <Text color='neutral.500' fontSize={["16px", "18px"]}>
          {title}
        </Text>
        {isLoading ? (
          <Spinner mt={[2]} color='primary.500' />
        ) : (
          <>
          <Text
            mt={[2]}
            color='primary.500'
            fontWeight={"800"}
            fontSize={["28px", "32px"]}
          >
            {currency ? (
              <>&#8358;{numeral(amount).format("0,0.00")}</>
            ) : (
              Format(amount)
            )}
          </Text>
            </>
        )}
      </Box>
    </Flex>
    </Link>
  );
};

export default DashboardDetail;
