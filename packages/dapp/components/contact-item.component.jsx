import { HStack, Text, Avatar, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Contact = ({ nameInitials, isSelected, fullName, phoneNo }) => (
  <HStack
    alignItems="center"
    space={4}
    p={4}
    borderWidth={1}
    borderRadius={4}
    borderColor="gray.300"
  >
    <Avatar>
      {nameInitials}
      {isSelected && (
        <Avatar.Badge>
          <MaterialCommunityIcons name="check" color="green.100" />
        </Avatar.Badge>
      )}
    </Avatar>
    <VStack>
      <Text>{fullName}</Text>
      <Text>{phoneNo}</Text>
    </VStack>
  </HStack>
);

export default Contact;