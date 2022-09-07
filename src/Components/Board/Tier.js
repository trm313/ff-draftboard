import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const Tier = ({ children, tier }) => {
  return (
    <Flex direction='column' mb={4}>
      <Flex
        roundedRight='full'
        bg='brand.600'
        color='white'
        alignSelf='start'
        px={12}
        py={2}
      >
        <Text textTransform='uppercase' fontSize='sm' fontWeight='bold'>
          Tier {tier}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

export default Tier;
