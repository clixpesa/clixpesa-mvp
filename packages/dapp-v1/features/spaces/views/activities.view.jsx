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

export default function ActivitiesView() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box flex={1} alignItems="center">
      <Box width="65%" alignItems="center" mt={16}>
        <Icon as={Octicons} name="note" size="4xl" />
        <Text fontSize="lg" mt={2} fontWeight="medium">
          No Space Activities yet
        </Text>
        <Text textAlign="center" fontSize="md">
          Transactions and any group activities will show here.
        </Text>
      </Box>
    </Box>
  );
}
