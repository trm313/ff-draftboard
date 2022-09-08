import { useState } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";

const Search = ({ onSearch, onNext, onPrevious }) => {
  return (
    <Flex>
      <Input size='sm' />
      <Button>X</Button>
      <Button>Next</Button>
      <Button>Prev</Button>
    </Flex>
  );
};

export default Search;
