import { Box, Text, Icon, HStack, VStack, Avatar, Stack, Pressable, ScrollView } from 'native-base';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';

import { FeatureHomeCard } from '../../components';

export default function SpacesHomeScreen({ navigation }) {
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
  let groupsBal = 0;
  let challengesBal = 0;
  let personalBal = 0;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Box flex={1} px={2}>
        <FeatureHomeCard
          bgColor="white"
          balance={totalBalance.toFixed(4).toString()}
          apprxBalance={(totalBalance * 120.75).toFixed(2).toString()}
          btn1={{
            icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
            name: 'New Space',
            screen: 'CreateSpace',
          }}
          btn2={{
            icon: <Icon as={Feather} name="arrow-up-right" size="md" color="primary.600" mr="1" />,
            name: 'Fund',
            screen: 'DummyModal',
          }}
          itemBottom={false}
        />

        <HStack justifyContent="space-between" my={4}>
          <Pressable
            width="48%"
            onPress={() => navigation.navigate('MySpaces', { screen: 'Challenges' })}
          >
            <VStack bg="white" space="6" p={4} borderRadius="2xl">
              <HStack justifyContent="space-between" alignItems="center">
                <Avatar bg="violet.500">
                  <Icon as={MaterialIcons} name="bubble-chart" size="2xl" color="text.50" />
                </Avatar>
                <VStack>
                  <Text fontSize="md" alignSelf="flex-end">
                    ${challengesBal.toFixed(2)}
                  </Text>
                  <Text alignSelf="flex-end">≈ ks{(challengesBal * 120.75).toFixed(0)}</Text>
                </VStack>
              </HStack>
              <Stack>
                <Text fontSize="md" fontWeight="medium">
                  Challenges
                </Text>
                <Text color="muted.500">Be competitive</Text>
              </Stack>
            </VStack>
          </Pressable>
          <Pressable
            width="48%"
            onPress={() => navigation.navigate('MySpaces', { screen: 'Personal' })}
          >
            <VStack bg="white" space="6" p={4} borderRadius="2xl">
              <HStack justifyContent="space-between" alignItems="center">
                <Avatar bg="teal.500">
                  <Icon as={MaterialIcons} name="lock-clock" size="xl" color="text.50" />
                </Avatar>
                <VStack>
                  <Text fontSize="md" alignSelf="flex-end">
                    ${personalBal.toFixed(2)}
                  </Text>
                  <Text alignSelf="flex-end">≈ ks{(personalBal * 120.75).toFixed(0)}</Text>
                </VStack>
              </HStack>
              <Stack>
                <Text fontSize="md" fontWeight="medium">
                  Personal
                </Text>
                <Text color="muted.500">Save for a goal</Text>
              </Stack>
            </VStack>
          </Pressable>
        </HStack>
        <HStack justifyContent="space-between" mb={4}>
          <Pressable
            width="48%"
            onPress={() => navigation.navigate('MySpaces', { screen: 'Groups' })}
          >
            <VStack bg="white" space="6" p={4} borderRadius="2xl">
              <HStack justifyContent="space-between" alignItems="center">
                <Avatar bg="green.500">
                  <Icon as={MaterialIcons} name="groups" size="xl" color="text.50" />
                </Avatar>
                <VStack>
                  <Text fontSize="md" alignSelf="flex-end">
                    ${groupsBal.toFixed(2)}
                  </Text>
                  <Text alignSelf="flex-end">≈ ks{(groupsBal * 120.75).toFixed(0)}</Text>
                </VStack>
              </HStack>
              <Stack>
                <Text fontSize="md" fontWeight="medium">
                  Groups
                </Text>
                <Text color="muted.500">Save with friends</Text>
              </Stack>
            </VStack>
          </Pressable>
          <Pressable width="48%" onPress={() => navigation.navigate('DummyModal')}>
            <VStack bg="white" space="6" p={4} borderRadius="2xl">
              <HStack justifyContent="space-between" alignItems="center">
                <Avatar bg="yellow.500">
                  <Icon as={MaterialIcons} name="group-add" size="xl" color="text.50" />
                </Avatar>
                <Text fontSize="md">0</Text>
              </HStack>
              <Stack>
                <Text fontSize="md" fontWeight="medium">
                  Invites
                </Text>
                <Text color="muted.500">Join your crew</Text>
              </Stack>
            </VStack>
          </Pressable>
        </HStack>
      </Box>
    </ScrollView>
  );
}
