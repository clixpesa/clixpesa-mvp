import { Box, Text, Stack, HStack, Divider } from 'native-base';
import { rates } from 'dapp/utils';
import * as WebBrowser from 'expo-web-browser';
import { blockscoutUrl } from 'dapp/config/appconfig';

export default function TxDetailsScreen({ route }) {
  const tx = route.params;
  return (
    <Box flex={1} bg="white" alignItems="center">
      <Stack alignItems="center" mt={10}>
        <Text>Amount</Text>
        <Text fontSize="xl" fontWeight="medium">
          {(tx.amount * 1).toFixed(4)} {tx.token}
        </Text>
        <Text>
          ≈ {(tx.amount * (tx.token === 'CELO' ? rates.CELOKES : rates.CUSDKES)).toFixed(2)}
          KES
        </Text>
        <Text fontWeight="medium" my={2}>
          Completed
        </Text>
      </Stack>
      <Divider my="2" maxW="90%" />
      <Stack minW="85%" space={2} my={3}>
        <HStack justifyContent="space-between">
          <Text textAlign="left">Fee</Text>
          <Text textAlign="right" fontWeight="medium">
            {tx.fee} CELO
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text textAlign="left">Time</Text>
          <Text textAlign="right" fontWeight="medium">
            {new Date(tx.timestamp).toLocaleString()}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text textAlign="left">To</Text>
          <Text textAlign="right" fontWeight="medium" maxW="65%">
            0x{tx.to.slice(2, 8).toUpperCase() + ' ..... ' + tx.to.slice(35, 42).toUpperCase()}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text textAlign="left">From</Text>
          <Text textAlign="right" fontWeight="medium" maxW="65%">
            0x{tx.from.slice(2, 8).toUpperCase() + ' ..... ' + tx.from.slice(35, 42).toUpperCase()}
          </Text>
        </HStack>
      </Stack>
      <Divider my="2" maxW="90%" />
      <Stack alignItems="center">
        <Text>TxHash</Text>
        <Text
          fontWeight="medium"
          textAlign="center"
          underline
          maxW="70%"
          onPress={() => WebBrowser.openBrowserAsync(blockscoutUrl + '/tx/' + tx.id)}
        >
          {tx.id}
        </Text>
      </Stack>
    </Box>
  );
}
