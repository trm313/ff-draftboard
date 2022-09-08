import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Flex, Text, Icon, IconButton, Button } from "@chakra-ui/react";
import { styles, icons } from "./styles.js";

import ActionBtn from "./ActionBtn";

const ActionBar = ({
  actions = ["keeper", "like", "avoid", "draft"],
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
    </Flex>
  );
};

export default ActionBar;
