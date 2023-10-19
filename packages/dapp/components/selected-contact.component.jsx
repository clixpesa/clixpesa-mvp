import { Box, Text, Avatar, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectedContact = ({ nameInitials, fullName, badge }) => {
  const firstName = fullName.split(' ')[0];
  return (
    <VStack alignItems="center" py={2} px={4}>
      <Avatar>
        {nameInitials}
        {badge && (
          <Avatar.Badge bg="gray.300">
            <MaterialCommunityIcons name="close" />
          </Avatar.Badge>
        )}
      </Avatar>
      <Text fontSize="xs">{badge ? firstName : fullName}</Text>
    </VStack>
  );
};

export default SelectedContact;
