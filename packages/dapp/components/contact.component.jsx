import { Avatar, Text, VStack, HStack, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Contact = ({ initials, fullName, phoneNo }) => {
  return (
    <HStack bg="#fff" space={4} p={1} mb={1}>
      <Avatar>
        {initials}
        <Avatar.Badge>
          <Icon as={MaterialCommunityIcons} name="check" size="3" color="muted.800" />
        </Avatar.Badge>
      </Avatar>
      <VStack>
        <Text>{fullName}</Text>
        <Text>{phoneNo}</Text>
      </VStack>
    </HStack>
  );
};

export default Contact;
