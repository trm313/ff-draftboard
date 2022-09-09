import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";

const Search = ({ onSearch, onNext, onPrev, matches }) => {
  const [query, setQuery] = useState("");

  const clear = () => {
    if (query !== "") {
      setQuery("");
      debouncedEmitHandler("");
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
    debouncedEmitHandler(e.target.value);
  };

  const emit = (value) => {
    if (value) {
      onSearch(value.trim());
    } else {
      onSearch(null);
    }
  };

  const debouncedEmitHandler = useCallback(debounce(emit, 500), []);

  let num = matches.index + 1;
  let total = matches.matches && matches.matches.length;
  let isNavDisabled = true;
  if (total > 1) {
    isNavDisabled = false;
  }

  return (
    <Flex alignItems='center'>
      <InputGroup display='flex' alignItems='center'>
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={RiSearchLine} color='gray.600' />}
        />
        <Input
          size='md'
          value={query}
          onChange={(e) => changeHandler(e)}
          textTransform='uppercase'
        />
        <InputRightElement
          children={
            <IconButton
              icon={<Icon as={GrFormClose} />}
              onClick={() => clear()}
              size='xs'
              alignSelf='center'
              disabled={!query}
              rounded='full'
              bgColor='gray.400'
            />
          }
        />
      </InputGroup>

      <Flex alignItems='center' ml={4}>
        <IconButton
          icon={<Icon as={BiUpArrowAlt} />}
          onClick={() => onPrev()}
          disabled={isNavDisabled}
          size='sm'
          rounded='full'
        />
        <Text fontSize='xs' mx={1} w={8} textAlign='center'>
          {total > 0 ? `${num}/${total}` : "-"}
        </Text>
        <IconButton
          icon={<Icon as={BiDownArrowAlt} />}
          onClick={() => onNext()}
          disabled={isNavDisabled}
          size='sm'
          rounded='full'
        />
      </Flex>
    </Flex>
  );
};

export default Search;
