import { memo } from 'react';
import { HStack, Text, Avatar, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setBgColor } from '../utils/setBgColor';

const Contact = memo(({ nameInitials, isSelected, fullName, phoneNo, index }) => (
  <HStack
    alignItems="center"
    space={4}
    p={4}
    borderWidth={1}
    borderRadius={4}
    borderColor="gray.300"
  >
    <Avatar bg={setBgColor(index)}>
      {nameInitials}
      {isSelected && (
        <Avatar.Badge>
          <MaterialCommunityIcons name="check" />
        </Avatar.Badge>
      )}
    </Avatar>
    <VStack>
      <Text>{fullName}</Text>
      <Text>{phoneNo}</Text>
    </VStack>
  </HStack>
));

export default Contact;
