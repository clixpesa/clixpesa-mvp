import React from 'react';
import { HStack, Text, Spacer, Pressable } from 'native-base';

const SectionHeader = ({ title, action, actionText }) => {
  return (
    <HStack px="4" py="2" alignItems="center" bg="#fff" mt="2">
      <Text fontSize="md" fontWeight="bold">
        {title}
      </Text>
      <Spacer />
      {action && (
        <Pressable onPress={action}>
          <Text color="primary.500" fontSize="sm">
            {actionText}
          </Text>
        </Pressable>
      )}
    </HStack>
  );
};

export default SectionHeader;
