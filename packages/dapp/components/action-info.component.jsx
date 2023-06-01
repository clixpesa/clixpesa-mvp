import { useEffect } from 'react';
import { Box, Text, VStack, HStack, Icon, Actionsheet, useDisclose } from '@clixpesa/native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ActionInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" px={4} justifyContent="center" display="flex">
          <HStack alignItems="center">
            <Box
              m={2}
              bg="primary.100"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={60}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="piggy-bank"
                size="lg"
                color="primary.600"
                m="2"
              />
            </Box>
            <VStack>
              <Text fontWeight="semibold">Personal Saving Space</Text>
              <Text>Save for your personal goals</Text>
            </VStack>
          </HStack>
        </Box>
        <Box w="100%" px={4} justifyContent="center" display="flex">
          <HStack alignItems="center">
            <Box
              m={2}
              bg="primary.100"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={60}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="safe-square"
                size="lg"
                color="primary.600"
                m="2"
              />
            </Box>
            <VStack>
              <Text fontWeight="semibold">Group Saving Space</Text>
              <Text>Save with friends and family or a Chama</Text>
            </VStack>
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ActionInfo;
