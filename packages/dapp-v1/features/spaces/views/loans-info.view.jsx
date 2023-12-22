import {
  Box,
  Text,
  HStack,
  VStack,
  Spacer,
  Progress,
  Icon,
  Button,
  Actionsheet,
  useDisclose,
} from 'native-base';
import { Octicons } from '@expo/vector-icons';

export default function LoansInfoView() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box flex={1} alignItems="center">
      <Box width="65%" alignItems="center" mt={16}>
        <Icon as={Octicons} name="note" size="4xl" />
        <Text fontSize="lg" mt={2} fontWeight="medium">
          No Loans yet
        </Text>
        <Text textAlign="center" fontSize="md">
          Loans requested and offered in the Group will show here.
        </Text>
      </Box>
      <Spacer />
      <Button
        bg="primary.600"
        colorScheme="primary"
        width="75%"
        rounded="3xl"
        my={8}
        _text={{ fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => onOpen()}
      >
        Request a Loan
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Actionsheet.Item alignItems="center">
            <Text fontSize="lg" mb={2} textAlign="center">
              Wah tulia!!
            </Text>
            <Text fontSize="md" textAlign="center">
              We know you can't wait to get started :)
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item alignItems="center">
            <Text fontSize="lg" py={3} fontWeight="semibold" textAlign="center" maxW="90%">
              Loans will be enabled on 5th Jan 2024
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}
