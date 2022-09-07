import { Flex, Text, Icon, IconButton, Button } from "@chakra-ui/react";

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
  keeper: {
    bg: "green.600",
    color: "white",
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
  if (action === "draft" || action === "keeper") {
    return (
      <Button
        size='sm'
        ml={action === "draft" && 4}
        mr={action === "keeper" && 8}
        px={2}
        fontSize='xs'
        textTransform='uppercase'
        fontWeight='regular'
        variant={isActive ? "solid" : "outline"}
        onClick={() => onSelect(action)}
        color={isActive ? btnStyles[action].color : btnStyles.default.color}
        bg={isActive ? btnStyles[action].bg : btnStyles.default.bg}
        leftIcon={<Icon as={isActive ? activeIcon : inactiveIcon} />}
      >
        {action}
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

export default ActionBtn;
