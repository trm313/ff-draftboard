import { useState } from "react";
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
import { styles, icons } from "./styles.js";
import ActionBar from "./ActionBar";

const Player = ({ player, isDrafted = false, onDrafted }) => {
  const { isOpen, onToggle } = useDisclosure();

  // TODO: Replace with controlled data from storage
  const [isLiked, setIsLiked] = useState(false);
  const [isAvoided, setIsAvoided] = useState(false);

  const handleAction = (type) => {
    if (type === "draft") onDrafted(player);

    // TODO: Connect to storage functions
    if (type === "like") setIsLiked(!isLiked);
    if (type === "avoid") setIsAvoided(!isAvoided);

    // Close
    onToggle();
  };

  // Conditional state styling
  let activeIndicators = [];
  if (isLiked) activeIndicators.push("like");
  if (isAvoided) activeIndicators.push("avoid");
  if (isDrafted) activeIndicators.push("draft");

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      mb={1}
      bg='dark.600'
      pr={1}
    >
      <Flex
        alignItems='center'
        opacity={isDrafted ? styles.opacity.drafted : 1}
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
      <Flex position='relative'>
        <Flex
          alignItems='center'
          mr={4}
          opacity={isDrafted ? styles.opacity.drafted : 1}
        >
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

        <Flex alignItems='center'>
          <IconButton
            icon={<Icon as={isOpen ? GrFormClose : TbDots} />}
            size='sm'
            rounded='full'
            onClick={onToggle}
          />
        </Flex>

        <SlideFade offsetY='20px' in={isOpen} zIndex={1} unmountOnExit={true}>
          <Box position='absolute' top={"-150%"} right={0} zIndex={1}>
            <ActionBar
              onClose={onToggle}
              onAction={handleAction}
              active={activeIndicators}
            />
          </Box>
        </SlideFade>
      </Flex>
    </Flex>
  );
};

export default Player;
