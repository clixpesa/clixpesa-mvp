import { HStack, Text, Spacer, Pressable } from 'native-base';

const SectionHeader = ({ title, action, actionText }) => (
  <HStack mx={4} mt={3} mb={2}>
    <Text fontWeight="medium" fontSize="md" color="blueGray.600">
      {title}
    </Text>
    <Spacer />
    {action && (
      <Pressable onPress={action}>
        <Text color="primary.600" fontSize="md">
          {actionText}
        </Text>
      </Pressable>
    )}
  </HStack>
);

export default SectionHeader;
