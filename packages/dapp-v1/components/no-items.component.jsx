import { Box, Icon, HStack, Text, Spacer, Pressable, Button } from 'native-base';
import { Octicons } from '@expo/vector-icons';

const NoItems = ({ title, message, action, actionText }) => (
  <Box width="full" alignItems="center" mt={6}>
    <Icon as={Octicons} name="note" size="4xl" />
    <Text fontSize="lg" mt={2} fontWeight="medium">
      {title}
    </Text>
    <Text textAlign="center" fontSize="md">
      {message}
    </Text>
    <Button
      bg="primary.600"
      colorScheme="primary"
      width="75%"
      rounded="3xl"
      my={8}
      _text={{ fontWeight: 'semibold', mb: '0.5' }}
      onPress={action}
    >
      {actionText}
    </Button>
  </Box>
);

export default NoItems;
