import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import "./App.css";

import Header from "./Components/Layout/Header";
import Board from "./Components/Board/Board";

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <Flex direction='column' bg='dark.800' minH='100vh' w='100%'>
      <Header />
      <Board />
    </Flex>
  );
}

export default App;
