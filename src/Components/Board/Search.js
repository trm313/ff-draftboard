import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Flex, Text, Input, Button } from "@chakra-ui/react";

const Search = ({ onSearch, onNext, onPrev, matches }) => {
  const [query, setQuery] = useState("");

  const clear = () => {
    setQuery("");
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

  return (
    <Flex>
      <Input
        size='sm'
        value={query}
        onChange={(e) => changeHandler(e)}
        textTransform='uppercase'
      />

      <Button onClick={() => clear()}>X</Button>
      <Text>{`${num}/${total}`}</Text>
      <Button onClick={() => onNext()}>Next</Button>
      <Button onClick={() => onPrev()}>Prev</Button>
    </Flex>
  );
};

export default Search;
