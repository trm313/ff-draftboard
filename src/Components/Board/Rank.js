import { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

const Rank = ({ children, rank }) => {
  return (
    <Flex direction='row' my={1} px={1}>
      <Flex direction='column' alignItems='center'>
        <Flex
          bg='gray.700'
          alignSelf='start'
          rounded='full'
          w={7}
          h={7}
          justifyContent='center'
          alignItems='center'
        >
          <Text fontSize='xs'>{rank}</Text>
        </Flex>
        <Box w={1} bg='gray.700' flexGrow={1} />
      </Flex>
      <Flex direction='column' ml={2} flexGrow={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Rank;
