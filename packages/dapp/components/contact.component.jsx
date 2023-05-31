import { Avatar, Text, VStack, HStack } from 'native-base';

const Contact = ({ initials, fullName, phoneNo }) => {
  return (
    <HStack bg="#fff" space={4} p={1} mb={1}>
      <Avatar>{initials}</Avatar>
      <VStack>
        <Text>{fullName}</Text>
        <Text>{phoneNo}</Text>
      </VStack>
    </HStack>
  );
};

export default Contact;
