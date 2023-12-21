import { memo } from 'react';
import { Text, Avatar, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setBgColor } from '../utils/setBgColor';

const SelectedContact = memo(({ nameInitials, fullName, badge, index }) => {
  const firstName = fullName.split(' ')[0];
  return (
    <VStack alignItems="center" py={2} px={4}>
      <Avatar bg={setBgColor(index)}>
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
});

export default SelectedContact;
