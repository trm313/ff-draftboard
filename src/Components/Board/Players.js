import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Player from "../Player/Player";
import Tier from "./Tier";
import Rank from "./Rank";

export default function Players({
  players = [],
  liked,
  avoided,
  keepers,
  draftSessionSequence = [],
  onPlayerDrafted,
  onPlayerLiked,
  onPlayerAvoided,
  onPlayerKeeper,
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

  const getRemainingPlayersInTier = (tier) => {
    let playersInTier = players.filter((p) => p.tier === tier);
    let remainingPlayersInTier = playersInTier.filter(
      (p) => !draftSessionSequence.includes(p.id) && !keepers.includes(p.id)
    );
    return remainingPlayersInTier;
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
          <Tier
            key={`tier_${t}`}
            tier={t}
            hasAvailablePlayers={getRemainingPlayersInTier(t).length > 0}
          >
            {ranksInTier.map((rank) => {
              let playersInRank = getPlayersForRank(rank);
              return (
                <Rank key={`rank_${rank}`} rank={rank}>
                  {playersInRank.map((player) => (
                    <Player
                      key={`player_${player.id}`}
                      player={player}
                      isLiked={liked.indexOf(player.id) !== -1}
                      isAvoided={avoided.indexOf(player.id) !== -1}
                      isDrafted={draftSessionSequence.indexOf(player.id) !== -1}
                      isKeeper={keepers.indexOf(player.id) !== -1}
                      onDrafted={onPlayerDrafted}
                      onLiked={onPlayerLiked}
                      onAvoided={onPlayerAvoided}
                      onKeeper={onPlayerKeeper}
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
