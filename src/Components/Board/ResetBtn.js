import { useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Icon,
  useDisclosure,
  SlideFade,
} from "@chakra-ui/react";
import { ImUndo } from "react-icons/im";

import useOnClickOutside from "../../Hooks/useOnClickOutside";

const ResetBtn = ({ onConfirm }) => {
  const ref = useRef();
  const { isOpen, onToggle } = useDisclosure();
  useOnClickOutside(ref, () => close());

  const close = () => {
    if (isOpen) onToggle();
  };

  const confirm = () => {
    onConfirm();
    onToggle();
  };

  return (
    <Flex position='relative' ref={ref} zIndex={10}>
      <Button onClick={onToggle} leftIcon={<Icon as={ImUndo} />} fontSize='sm'>
        Reset Drafted
      </Button>
      <SlideFade offsetY='-20px' in={isOpen} unmountOnExit={true}>
        <Box position='absolute' top={"150%"} right={0} zIndex={1} w={60}>
          <Flex direction='column' bg='gray.800' p={8}>
            <Flex direction='column' mb={4}>
              <Heading fontSize='sm'>Reset drafted players?</Heading>
              <Text fontSize='xs'>
                This will not reset keepers, likes, or dislikes
              </Text>
            </Flex>
            <Flex>
              <Button onClick={() => confirm()} mr={6} bg='red.600'>
                Reset
              </Button>
              <Button onClick={() => close()}>Cancel</Button>
            </Flex>
          </Flex>
        </Box>
      </SlideFade>
    </Flex>
  );
};

export default ResetBtn;
