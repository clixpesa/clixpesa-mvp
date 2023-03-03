import React from 'react';
import { Text, Box, HStack, VStack, Avatar, Spacer } from 'native-base';

const Transaction = ({ transaction }) => {
  const title = transaction.title.split(' ');
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1).toUpperCase()
      : title[0].slice(0, 2).toUpperCase();
  return (
    <HStack space="2" p="2" bg="#fff">
      <Box>
        <Avatar bg="primary.500" size="md">
          {initials}
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
