import { Text, Avatar, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectedContact = ({ nameInitials, fullName }) => (
  <VStack alignItems="center" py={2} px={4}>
    <Avatar>
      {nameInitials}
      <Avatar.Badge bg="gray.300">
        <MaterialCommunityIcons name="close" />
      </Avatar.Badge>
    </Avatar>
    <Text fontSize="xs">{fullName}</Text>
  </VStack>
);

export default SelectedContact;
