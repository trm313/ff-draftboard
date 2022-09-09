import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { ImUndo } from "react-icons/im";

import scrollIntoView from "scroll-into-view";

import playerDataset from "../../Data/players.json";
import { getLocalStorage, updateLocalStorage } from "../../Api/local";

import Players from "./Players";
import Search from "./Search";
import ResetBtn from "./ResetBtn";

export default function Board() {
  let playersData = playerDataset.sort((a, z) => a.tier - z.tier);
  playersData = playerDataset.sort((a, z) => a.rank - z.rank);

  // STATE

  // STATE > Players
  const [visiblePlayers, setVisiblePlayers] = useState(playersData);
  const [draftSessionSequence, setDraftSessionSequence] = useState([]);

  // STATE > Search
  const [searchMatches, setSearchMatches] = useState({
    term: null,
    matches: [],
    index: 0,
  });
  const [searchMatchId, setSearchMatchId] = useState(null);

  // STATE > Indicators
  const [liked, setLiked] = useState([]);
  const [avoided, setAvoided] = useState([]);
  const [keepers, setKeepers] = useState([]);

  // FUNCTIONS

  const handleScrollToPlayerRef = (ref) => {
    scrollIntoView(ref.current);
  };

  const handleSearch = (term) => {
    let matches = [];
    if (term && term !== "") {
      matches = visiblePlayers.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setSearchMatches({
      term,
      matches,
      index: 0,
    });
  };

  const goToNextSearchMatch = () => {
    if (searchMatches.matches.length > searchMatches.index + 1) {
      // Go to next
      setSearchMatches((current) => {
        return {
          ...current,
          index: current.index + 1,
        };
      });
    } else {
      // Go to first
      setSearchMatches((current) => {
        return { ...current, index: 0 };
      });
    }
  };

  const goToPrevSearchMatch = () => {
    if (searchMatches.index - 1 >= 0) {
      // Go to previous
      setSearchMatches((current) => {
        return {
          ...current,
          index: current.index - 1,
        };
      });
    } else {
      // Go to last
      setSearchMatches((current) => {
        return { ...current, index: current.matches.length - 1 };
      });
    }
  };

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

  const handlePlayerKeeper = (id) => {
    let state = [...keepers];
    let index = state.indexOf(id);
    if (index === -1) {
      state.push(id);
    } else {
      state.splice(index, 1);
    }
    updateLocalStorage("keepers", state);
    setKeepers(state);
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
      let keepers = getLocalStorage("keepers") || [];
      setLiked(liked);
      setAvoided(avoided);
      setDraftSessionSequence(drafted);
      setKeepers(keepers);
    };
    loadDataFromLocalStorage();
  }, []);

  useEffect(() => {
    if (searchMatches.matches.length > 0) {
      let id = searchMatches.matches[searchMatches.index].id;
      setSearchMatchId(id);
    } else {
      setSearchMatchId(null);
    }
  }, [searchMatches]);

  return (
    <Flex direction='column'>
      <Flex direction='column' flexGrow={1}>
        <Flex justifyContent='flex-end'>
          <ResetBtn onConfirm={resetDraftSession} />
        </Flex>
        <Players
          players={visiblePlayers}
          liked={liked}
          avoided={avoided}
          keepers={keepers}
          draftSessionSequence={draftSessionSequence}
          onPlayerDrafted={handlePlayerDrafted}
          onPlayerLiked={handlePlayerLiked}
          onPlayerAvoided={handlePlayerAvoided}
          onPlayerKeeper={handlePlayerKeeper}
          searchMatchId={searchMatchId}
          handleScrollToPlayerRef={handleScrollToPlayerRef}
        />
      </Flex>
      <Flex
        flexShrink={0}
        direction='column'
        position='sticky'
        bottom={0}
        bg='dark.600'
        px={4}
        py={2}
      >
        <Search
          onSearch={handleSearch}
          onNext={goToNextSearchMatch}
          onPrev={goToPrevSearchMatch}
          matches={searchMatches}
        />
      </Flex>
    </Flex>
  );
}
