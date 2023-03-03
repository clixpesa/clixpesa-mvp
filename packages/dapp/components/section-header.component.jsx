import React from 'react';
import { HStack, Text, Spacer, Pressable } from 'native-base';

const SectionHeader = ({ title, action, actionText }) => (
  <HStack px="4" py="2" mt="2">
    <Text fontWeight="medium" color="blueGray.600">
      {title}
    </Text>
    <Spacer />
    {action && (
      <Pressable onPress={action}>
        <Text color="primary.600">{actionText}</Text>
      </Pressable>
    )}
  </HStack>
);

export default SectionHeader;
