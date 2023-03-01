import React from 'react';
import { Text, Box, HStack, VStack, Avatar, Spacer } from 'native-base';

const Transaction = ({ transaction }) => {
  return (
    <HStack space="2" p="2" bg="#fff">
      <Box>
        <Avatar bg="primary.500" size="md">
          MP
        </Avatar>
      </Box>
      <VStack>
        <Text fontWeight="semibold">{transaction.title}</Text>
        <Text>{transaction.date}</Text>
      </VStack>
      <Spacer />
      <VStack>
        <Text fontWeight="semibold">{transaction.spAmount}</Text>
        <Text>0.00 (cUSD)</Text>
      </VStack>
    </HStack>
  );
};

export default Transaction;
