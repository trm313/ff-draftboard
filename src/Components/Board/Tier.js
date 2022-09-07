import { useState } from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { TiWarning } from "react-icons/ti";

const Tier = ({ children, tier, hasAvailablePlayers }) => {
  const [isOpen, setIsOpen] = useState(true);

  // console.log(tier, hasAvailablePlayers);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <Flex direction='row' mb={4}>
        <Flex
          roundedRight='full'
          bg='gray.600'
          color='white'
          alignSelf='start'
          px={12}
          py={2}
          onClick={() => toggleOpen()}
        >
          <Text textTransform='uppercase' fontSize='sm' fontWeight='bold'>
            Tier {tier}
          </Text>
        </Flex>
        {hasAvailablePlayers && (
          <Flex alignItems='center' ml={4}>
            <Icon as={TiWarning} />
            <Text fontSize='xs'>Players still available in tier</Text>
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <Flex direction='column' mb={4}>
      <Flex
        roundedRight='full'
        bg='brand.600'
        color='white'
        alignSelf='start'
        px={12}
        py={2}
        onClick={() => toggleOpen()}
      >
        <Text textTransform='uppercase' fontSize='sm' fontWeight='bold'>
          Tier {tier}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

export default Tier;
