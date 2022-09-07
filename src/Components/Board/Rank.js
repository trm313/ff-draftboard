import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const Rank = ({ children, rank }) => {
  return (
    <Flex
      direction='column'
      borderLeftColor='gray.700'
      borderLeftWidth={"8px"}
      my={1}
    >
      <Flex
        bg='gray.700'
        alignSelf='start'
        py={1}
        px={4}
        roundedRight='md'
        mb={1}
      >
        <Text fontSize='xs'>{rank}</Text>
      </Flex>
      <Flex direction='column' ml={4}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Rank;
