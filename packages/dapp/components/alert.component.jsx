import { useState } from 'react';
import { Box, HStack, Icon, IconButton, Spacer, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(true);
  const handleDismiss = () => {
    setShow(false);
  };

  return (
    <Box
      bg={type === 'error' ? 'red.500' : 'green.500'}
      p={2}
      rounded="md"
      shadow={2}
      position="absolute"
      bottom={5}
      right={5}
      width="90%"
      opacity={show ? 1 : 0}
      zIndex={100}
    >
      <HStack space={2} alignItems="center">
        <Icon
          as={<MaterialCommunityIcons name={type === 'error' ? 'close-circle' : 'check-circle'} />}
          color="white"
          size="sm"
        />
        <Text color="white">{message}</Text>
        <Spacer />
        <IconButton
          onPress={handleDismiss}
          icon={<Icon name="close" color="white" size="sm" />}
          bg="transparent"
          _pressed={{ bg: 'transparent' }}
        />
      </HStack>
    </Box>
  );
};

export default Alert;
