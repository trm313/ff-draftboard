import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";

import playerDataset from "../../Data/players.json";
import { getLocalStorage, updateLocalStorage } from "../../Api/local";

import Players from "./Players";

export default function Board() {
  let playersData = playerDataset.sort((a, z) => a.rank - z.rank);
  // let keepers = ["player_1", "player_13"];

  // STATE

  const [visiblePlayers, setVisiblePlayers] = useState(playersData);
  const [draftSessionSequence, setDraftSessionSequence] = useState([]);

  const [liked, setLiked] = useState([]);
  const [avoided, setAvoided] = useState([]);

  // FUNCTIONS

  const handlePlayerLiked = (id) => {
    let state = [...liked];
    let index = state.indexOf(id);
    if (index === -1) {
      state.push(id);
    } else {
      state.splice(index, 1);
    }
    updateLocalStorage("liked", state);
    setLiked(state);
  };

  const handlePlayerAvoided = (id) => {
    let state = [...avoided];
    let index = state.indexOf(id);
    if (index === -1) {
      state.push(id);
    } else {
      state.splice(index, 1);
    }
    updateLocalStorage("avoided", state);
    setAvoided(state);
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
    updateLocalStorage("drafted", newState);
    setDraftSessionSequence(newState);
  };

  const resetDraftSession = () => {
    // Reset back to an array of only the keepers
    updateLocalStorage("drafted", []);
    setDraftSessionSequence([]);
  };

  // EFFECTS
  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      let liked = getLocalStorage("liked") || [];
      let avoided = getLocalStorage("avoided") || [];
      let drafted = getLocalStorage("drafted") || [];
      setLiked(liked);
      setAvoided(avoided);
      setDraftSessionSequence(drafted);
    };
    loadDataFromLocalStorage();
  }, []);

  return (
    <Flex direction='column'>
      <Flex justifyContent='flex-end'>
        <Button onClick={() => resetDraftSession()}>Reset</Button>
      </Flex>
      <Players
        players={visiblePlayers}
        liked={liked}
        avoided={avoided}
        draftSessionSequence={draftSessionSequence}
        onPlayerDrafted={handlePlayerDrafted}
        onPlayerLiked={handlePlayerLiked}
        onPlayerAvoided={handlePlayerAvoided}
      />
    </Flex>
  );
}
