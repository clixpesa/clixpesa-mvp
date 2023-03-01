import React from 'react';
import {
  Text,
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  Icon,
  FlatList,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import SectionHeader from '../../../components/section-header.component';
import Transaction from '../components/transaction.component';

import { transactions } from '../../../data';

const HomeScreen = () => {
  return (
    <VStack flex="1" bg="muted.200" p="2">
      <Box bg="#fff" p="4">
        <Text>Actual Balance (KES)</Text>
        <Heading>0.00</Heading>
        <Text>0.00 (cUSD)</Text>
        <HStack space="2" mt="2">
          <Button
            leftIcon={<Icon as={Ionicons} name="add" size="sm" />}
            variant="subtle"
            rounded="3xl"
          >
            Deposit
          </Button>
          <Button
            leftIcon={<Icon as={Ionicons} name="arrow-forward" size="sm" />}
            variant="subtle"
            rounded="3xl"
          >
            Transfer
          </Button>
          <Button variant="subtle" rounded="3xl">
            <Icon as={Ionicons} name="ellipsis-horizontal" size="sm" />
          </Button>
        </HStack>
      </Box>
      <SectionHeader
        title="Recent Transactions"
        action={() => console.log('View All')}
        actionText="View All"
      />
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <Transaction transaction={item} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};

export default HomeScreen;
