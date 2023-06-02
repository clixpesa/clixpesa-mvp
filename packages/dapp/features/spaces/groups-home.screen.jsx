import { Box, Text, HStack, Icon, FlatList } from '@clixpesa/native-base';
import { useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';

import { SectionHeader, SpacesFeatureItem, FeatureHomeCard } from '@dapp/components';
import { rates, spaces } from '@dapp/data';

export default function GroupsHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(async () => {
      setRefreshing(false);
    });
  }, []);

  let totalBalance = 0;
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="95%"
        data={spaces}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <Box>
            <FeatureHomeCard
              color="warmGray.800"
              bg="white"
              balance={totalBalance.toFixed(4).toString()}
              apprxBalance={(totalBalance * 120.75).toFixed(2).toString()}
              btn1={{
                icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
                name: 'New Space',
                screen: 'createSpace',
              }}
              btn2={{
                icon: <Icon as={Feather} name="arrow-right" size="md" color="primary.600" mr="1" />,
                name: 'Fund',
                screen: 'sendFunds',
              }}
              btn3={{
                icon: <Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />,
                name: 'More',
                screen: 'DummyModal',
              }}
              itemBottom={false}
            />
            {spaces.length > 0 ? (
              <SectionHeader
                title="Spaces"
                actionText="See all"
                action={() => console.log('See all')}
              />
            ) : null}
          </Box>
        }
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop={index === 0 ? '2xl' : 'md'}
            roundedBottom={index === spaces.length - 1 ? '2xl' : 'md'}
            mt={1}
          >
            <SpacesFeatureItem
              key={item.id}
              itemTitle={item.name}
              dueDate={item.dueDate}
              type={item.type}
              value={(item.balance * 1).toFixed(2).toString() + ' ' + item.token}
              screen="Rosca"
              itemParams={{ spaceId: item.id }}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
