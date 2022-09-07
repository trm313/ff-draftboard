import React, { useState } from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";

import playerDataset from "../../Data/players.json";

import Players from "./Players";

export default function Board() {
  let playersData = playerDataset.sort((a, z) => a.rank - z.rank);

  const [visiblePositions, setVisiblePositions] = useState([]);
  const [visiblePlayers, setVisiblePlayers] = useState(playersData);

  let keepers = ["player_1", "player_13"];
  const [draftSessionSequence, setDraftSessionSequence] = useState(keepers);

  const filterPlayers = ({ positions }) => {
    // positions = ['RB', 'WR']
    let filtered = playersData.filter((p) => {
      if (positions.indexOf(p.player) !== 0) {
        return p;
      }
    });
    setVisiblePlayers(filtered);
  };

  const handlePlayerDrafted = (player) => {
    let newState = [...draftSessionSequence];
    let index = draftSessionSequence.indexOf(player.id);
    if (index !== -1) {
      // Remove
      newState.splice(index, 1);
    } else {
      // Add
      newState.push(player.id);
    }
    setDraftSessionSequence(newState);
  };

  const resetDraftSession = () => {
    // Reset back to an array of only the keepers
    setDraftSessionSequence(keepers);
  };

  return (
    <Flex direction='column'>
      <Flex justifyContent='flex-end'>
        <Button onClick={() => resetDraftSession()}>Reset</Button>
      </Flex>
      <Players
        players={visiblePlayers}
        draftSessionSequence={draftSessionSequence}
        onPlayerDrafted={handlePlayerDrafted}
      />
    </Flex>
  );
}
