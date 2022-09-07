import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Player from "../Player/Player";
import Tier from "./Tier";
import Rank from "./Rank";

export default function Players({
  players = [],
  onPlayerDrafted,
  draftSessionSequence = [],
}) {
  const getTiers = (players) => {
    let tiers = players.map((p) => p.tier);
    tiers = [...new Set(tiers)];
    return tiers;
  };

  const getRanksForTier = (tier) => {
    let playersInTier = players.filter((p) => p.tier === tier);
    let ranksInTier = playersInTier.map((p) => p.rank);
    ranksInTier = [...new Set(ranksInTier)];
    return ranksInTier;
  };

  const getPlayersForRank = (rank) => {
    let playersInRank = players.filter((p) => p.rank === rank);
    return playersInRank;
  };

  let tiers = getTiers(players);

  return (
    <Flex direction='column'>
      {tiers.map((t) => {
        let ranksInTier = getRanksForTier(t);
        return (
          <Tier key={`tier_${t}`} tier={t}>
            {ranksInTier.map((rank) => {
              let playersInRank = getPlayersForRank(rank);
              return (
                <Rank key={`rank_${rank}`} rank={rank}>
                  {playersInRank.map((player) => (
                    <Player
                      key={`player_${player.id}`}
                      player={player}
                      isDrafted={draftSessionSequence.indexOf(player.id) !== -1}
                      onDrafted={onPlayerDrafted}
                    />
                  ))}
                </Rank>
              );
            })}
          </Tier>
        );
      })}
    </Flex>
  );
}