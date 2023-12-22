import { useState, useCallback, useEffect } from 'react';
import { Box, Text, Button, Icon, FlatList, Spinner } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import {
  FeatureHomeCard,
  TransactionItem,
  SectionHeader,
  FeaturedAssets,
  NoItems,
} from 'dapp/components';
import { rates } from 'dapp/utils';
import { useSelector } from 'react-redux';
import { getWalletBalances, getWalletTxs } from '../wallet/manager.wallet';
//import { utils } from 'ethers';
import { useGetTxsByAddrQuery, useGetTokenTxsQuery } from 'dapp/services';

export default function HomeScreen() {
  const thisAddress = useSelector((s) => s.wallet.walletInfo.address);
  const isSignerSet = useSelector((s) => s.essential.isSignerSet);
  const [balance, setBalance] = useState({
    celoBal: 0,
    cusdBal: 0,
    balUSD: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: accountTxs,
    refetch: refetchTxs,
    error: txError,
    isLoading: txIsLoading,
  } = useGetTxsByAddrQuery(thisAddress);
  const {
    data: erc20Txs,
    refetch: refetchErc20Txs,
    error: ercError,
    isLoading: ercIsLoading,
  } = useGetTokenTxsQuery(thisAddress);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchTxs();
    refetchErc20Txs();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    const getBalances = async () => {
      const thisBalances = await getWalletBalances(isSignerSet, thisAddress);
      if (thisBalances !== null) {
        const { celoBal, cusdBal } = thisBalances;
        if (!!celoBal) {
          setBalance({
            celoBal,
            cusdBal,
            balUSD: celoBal * rates.CELOUSD + cusdBal * rates.CUSDUSD,
          });
        }
      }
    };
    getBalances();
  }, [thisAddress, refreshing]);

  useEffect(() => {
    if (!txIsLoading && !ercIsLoading) {
      const thisTxs = getWalletTxs(accountTxs, erc20Txs, thisAddress);
      setTransactions(thisTxs);
    }
  }, [accountTxs, erc20Txs]);

  const handleOnPress = async () => {
    const thisTxs = getWalletTxs(accountTxs, erc20Txs, thisAddress);
    console.log(thisTxs);
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="95%"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={transactions.slice(0, 6)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Box mt="4">
            <FeatureHomeCard
              color="warmGray.800"
              bg="white"
              balance={balance.balUSD.toFixed(2)}
              apprxBalance={(balance.balUSD * rates.USDKES).toFixed(2)}
              btn1={{
                icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
                name: 'Deposit',
                screen: 'depositFunds',
              }}
              btn2={{
                icon: <Icon as={Feather} name="arrow-right" size="md" color="primary.600" mr="1" />,
                name: 'Transfer',
                screen: 'transferFunds',
                params: balance,
              }}
              btn3={{
                icon: <Icon as={Feather} name="refresh-ccw" size="md" color="primary.600" mr="1" />,
                name: 'Swap',
                screen: 'DummyModal',
              }}
              btn4={{
                icon: <Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />,
                name: 'more',
                screen: 'DummyModal',
              }}
              itemBottom={false}
            />
            <SectionHeader title="Assets" action={() => handleOnPress()} />
            <FeaturedAssets nativeBal={balance.celoBal} stableBal={balance.cusdBal} />
            <SectionHeader
              title="Transactions"
              actionText="See all"
              action={() => console.log('See all')}
            />
            {transactions.length > 0 ? null : (
              <NoItems
                title="No Transactions yet"
                message="Your transactions will show here."
                action={() => console.log('Contribute')}
                actionText="Add funds"
              />
            )}
          </Box>
        }
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop={index === 0 ? '2xl' : 'md'}
            roundedBottom={index === transactions.length - 1 || index === 5 ? '2xl' : 'md'}
            mt={1}
          >
            <TransactionItem
              key={item.id}
              credited={item.credited}
              trTitle={item.title}
              trDate={item.date}
              spAmount={
                (item.credited ? '+' : '-') + (item.amount * 1).toFixed(2) + ' ' + item.token
              }
              eqAmount={
                (item.amount * (item.token === 'CELO' ? rates.CELOKES : rates.CUSDKES)).toFixed(2) +
                ' KES'
              }
              screen="TxDetails"
              params={item}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
