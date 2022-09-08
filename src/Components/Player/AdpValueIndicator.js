import { Flex, Text, Icon } from "@chakra-ui/react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

const AdpValueIndicator = ({ value }) => {
  let color;
  if (value > 0) {
    color = "green.600";
  } else if (value < 0) {
    color = "red.600";
  }
  return (
    <Flex direction='column' justifyContent='center' alignItems='center'>
      <Flex alignItems='center'>
        <Text fontSize='sm'>{value}</Text>
        <Icon
          as={value > 0 ? BsFillCaretDownFill : BsFillCaretUpFill}
          fontSize='sm'
          color={color}
          h={3}
        />
      </Flex>
      {/* <Text fontSize='xs' color='gray.400'>
        vs adp
      </Text> */}
    </Flex>
  );
};

export default AdpValueIndicator;
