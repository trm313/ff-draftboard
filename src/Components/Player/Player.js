import { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  Icon,
  IconButton,
  SlideFade,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";
import { GrFormClose } from "react-icons/gr";

import useOnClickOutside from "../../Hooks/useOnClickOutside.js";

import { styles, icons } from "./styles.js";
import ActionBar from "./ActionBar";
import AdpValueIndicator from "./AdpValueIndicator.js";

const Player = ({
  player,
  isDrafted = false,
  isKeeper,
  isLiked,
  isAvoided,
  onDrafted,
  onLiked,
  onAvoided,
  onKeeper,
  isSearchMatch,
  onEmitRef,
}) => {
  const ref = useRef();
  const { isOpen, onToggle } = useDisclosure();
  useOnClickOutside(ref, () => closeActionBar());

  const openActionBar = () => {
    if (!isOpen) onToggle();
  };
  const closeActionBar = () => {
    if (isOpen) onToggle();
  };

  const handleAction = (type) => {
    if (type === "draft") onDrafted(player);
    if (type === "like") onLiked(player.id);
    if (type === "avoid") onAvoided(player.id);
    if (type === "keeper") onKeeper(player.id);

    // Close
    onToggle();
  };

  useEffect(() => {
    if (isSearchMatch) {
      onEmitRef(ref);
    }
  }, [isSearchMatch, onEmitRef]);

  // Conditional state styling
  let activeIndicators = [];
  if (isLiked) activeIndicators.push("like");
  if (isAvoided) activeIndicators.push("avoid");
  if (isDrafted) activeIndicators.push("draft");
  if (isKeeper) activeIndicators.push("keeper");

  let isUnavailable = isDrafted || isKeeper;

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      mb={1}
      bg={"dark.600"}
      border={isSearchMatch && "1px solid yellow"}
      pr={1}
    >
      <Flex
        alignItems='center'
        opacity={isUnavailable ? styles.opacity.drafted : 1}
      >
        <Flex
          alignItems='center'
          justifyContent='center'
          mr={4}
          bgColor={styles.position.bg[player.position]}
          color='white'
          h={12}
          w={12}
        >
          <Text fontSize='sm'>{player.position}</Text>
        </Flex>
        <Text>{player.name}</Text>
      </Flex>
      <Flex position='relative' ref={ref}>
        <Flex
          alignItems='center'
          mr={4}
          opacity={isUnavailable ? styles.opacity.drafted : 1}
        >
          {isKeeper && (
            <Icon
              as={icons.keeper.active}
              color='green.600'
              bg='green.200'
              h={6}
              w={6}
              p={1}
              rounded='full'
              mr={2}
            />
          )}
          {isLiked && (
            <Icon
              as={icons.liked.active}
              color='red.600'
              bg='red.200'
              h={6}
              w={6}
              p={1}
              rounded='full'
              mr={2}
            />
          )}
          {isAvoided && (
            <Icon
              as={icons.avoided.active}
              color='blue.600'
              bg='blue.200'
              h={6}
              w={6}
              p={1}
              rounded='full'
              mr={2}
            />
          )}
        </Flex>

        <Flex flexShrink={0} mr={4}>
          <AdpValueIndicator value={player.vsADP} />
        </Flex>

        <Flex alignItems='center'>
          <IconButton
            icon={<Icon as={isOpen ? GrFormClose : TbDots} />}
            size='sm'
            rounded='full'
            onClick={onToggle}
          />
        </Flex>

        <SlideFade offsetY='20px' in={isOpen} unmountOnExit={true}>
          <Box position='absolute' top={"-150%"} right={0} zIndex={1}>
            <ActionBar onAction={handleAction} active={activeIndicators} />
          </Box>
        </SlideFade>
      </Flex>
    </Flex>
  );
};

export default Player;
