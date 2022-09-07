import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Flex, Text, Icon, IconButton, Button } from "@chakra-ui/react";
import { styles, icons } from "./styles.js";

const btnStyles = {
  default: {
    // bg: "dark.400",
    color: "gray.400",
  },
  like: {
    bg: "red.200",
    color: "red.600",
  },
  avoid: {
    bg: "blue.200",
    color: "blue.600",
  },
  draft: {
    bg: "gray.800",
    color: "gray.200",
  },
};

const ActionBtn = ({
  action = "default",
  onSelect,
  activeIcon,
  inactiveIcon,
  isActive = false,
  color,
}) => {
  if (action === "draft") {
    return (
      <Button
        size='sm'
        p={1}
        fontSize='xs'
        textTransform='uppercase'
        fontWeight='regular'
        variant={isActive ? "solid" : "outline"}
        onClick={() => onSelect(action)}
        color={isActive ? btnStyles[action].color : btnStyles.default.color}
        bg={isActive ? btnStyles[action].bg : btnStyles.default.bg}
      >
        {isActive ? "Drafted" : "Draft"}
      </Button>
    );
  }
  return (
    <IconButton
      icon={<Icon as={isActive ? activeIcon : inactiveIcon} />}
      size='sm'
      rounded='full'
      variant={isActive ? "solid" : "outline"}
      mr={1}
      onClick={() => onSelect(action)}
      colorScheme='dark'
      color={isActive ? btnStyles[action].color : btnStyles.default.color}
      bg={isActive ? btnStyles[action].bg : btnStyles.default.bg}
    />
  );
};

const ActionBar = ({
  actions = ["like", "avoid", "draft"],
  onClose,
  onAction,
  active = [],
}) => {
  return (
    <Flex alignItems='center' py={2} px={6} bg='gray.600' rounded='2xl'>
      {actions.map((action) => (
        <ActionBtn
          key={`actionBtn-${action}`}
          action={action}
          activeIcon={icons[action].active}
          inactiveIcon={icons[action].inactive}
          onSelect={onAction}
          isActive={active.indexOf(action) !== -1}
        />
      ))}

      {/* <IconButton // In-line close button - removing to test new UX
        icon={<GrFormClose />}
        size="sm"
        rounded="full"
        variant="ghost"
        onClick={() => onClose()}
        ml={4}
      /> */}
    </Flex>
  );
};

export default ActionBar;
