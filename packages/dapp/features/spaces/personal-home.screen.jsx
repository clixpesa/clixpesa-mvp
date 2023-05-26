import { useLayoutEffect } from 'react';
import { Box, Text, Image, HStack, Spacer, VStack, Progress, Icon, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { SectionHeader, TransactionItem, FeatureHomeCard, HeaderIcon } from '../../components';
import { rates, transactions } from '../../data';
import { numberOfDaysLeft } from '../../utils/utils';

const CustomHeaderIcon = () => <HeaderIcon screen="Main" />;

const PersonalHomeScreen = ({ navigation }) => {
  const { goalAmount, ctbAmount, totalAmount, deadline } = useSelector(
    ({ spaces }) => spaces.personalSpace,
  );
  const cbDeadline = new Date(deadline).toDateString();
  const daysLeft = numberOfDaysLeft(cbDeadline);
  const prog = (ctbAmount / goalAmount) * 100;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: CustomHeaderIcon,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Box flex={1} bg="muted.100">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
          alt="Your groups photo"
          height="35%"
          minH={240}
        />
        <Box position="absolute" top="5%" left={1}>
          <FeatureHomeCard
            color="white"
            balance={totalAmount.toFixed(4).toString()}
            apprxBalance={(totalAmount * 120.75).toFixed(2).toString()}
            btn1={{
              icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
              name: 'Fund',
              screen: 'AddFunds',
            }}
            btn2={{
              icon: <Icon as={Feather} name="arrow-down" size="md" color="primary.600" mr="1" />,
              name: 'Withdraw',
              screen: 'WithdrawFunds',
            }}
            btn3={{
              icon: <Icon as={Feather} name="settings" size="lg" color="primary.600" />,
              name: 'Customize',
              screen: 'Customize',
            }}
            itemBottom={false}
          />
        </Box>

        <Box alignItems="center" mt={3}>
          <HStack mx="3" my="2">
            <Text fontWeight="medium" color="blueGray.600">
              Achievement
            </Text>
            <Spacer />
          </HStack>
          <Box bg="white" roundedTop="xl" roundedBottom="md" width="95%">
            <VStack space={2}>
              <HStack mx="5" my="2">
                <Text fontWeight="semibold" fontSize="md">
                  Saved: {prog.toFixed(1)}%
                </Text>
                <Spacer />
                <Text _light={{ color: 'muted.500' }} fontWeight="medium" pt={1}>
                  {ctbAmount}/{goalAmount} cUSD
                </Text>
              </HStack>
              <Progress colorScheme="primary" value={prog} mx="4" bg="primary.100" />
              <HStack mx="5" my="2">
                <Text fontWeight="medium" color="muted.500">
                  {cbDeadline} - {daysLeft} days left
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
        <Box alignItems="center" mb={3} mx={3}>
          <SectionHeader
            title="Transactions"
            actionText="See all"
            action={() => console.log('all')}
          />
          {transactions.map((item, index) => (
            <Box
              bg="white"
              opacity={85}
              roundedTop={index === 0 ? '2xl' : 'md'}
              roundedBottom={index === transactions.length - 1 ? '2xl' : 'md'}
              mt={1}
              key={item.id}
            >
              <TransactionItem
                credited={item.credited}
                trTitle={item.title}
                trDate={item.date}
                spAmount={
                  (item.credited ? '+' : '-') + (item.amount * 1).toFixed(2) + ' ' + item.token
                }
                eqAmount={(item.amount * rates[item.token]).toFixed(2) + ' KES'}
                screen="DummyModal"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PersonalHomeScreen;
