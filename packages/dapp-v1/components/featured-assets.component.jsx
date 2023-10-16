import { Box, HStack, Stack, Text, VStack, Avatar } from 'native-base';
import { rates } from 'dapp/utils';

const FeaturedAssets = ({ nativeBal, stableBal }) => {
  return (
    <HStack space="2%" width="95%">
      <HStack justifyContent="space-between" bg="white" py={2} px={3} minW="48%" rounded="2xl">
        <HStack alignItems="center" space={2}>
          <Avatar
            size="sm"
            bg="primary.200"
            _text={{ color: 'primary.800' }}
            source={{
              uri: 'https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg',
            }}
          >
            CELO
          </Avatar>
          <Text>CELO</Text>
        </HStack>
        <Stack mr={1}>
          <Text textAlign="right" color="warmGray.800" fontWeight="semibold">
            {nativeBal.toFixed(2)}
          </Text>
          <Text textAlign="right">≈ $ {(nativeBal * rates.CELOUSD).toFixed(2)}</Text>
        </Stack>
      </HStack>
      <HStack justifyContent="space-between" bg="white" py={2} px={3} minW="49%" rounded="2xl">
        <HStack alignItems="center" space={2}>
          <Avatar
            size="sm"
            bg="primary.200"
            _text={{ color: 'primary.800' }}
            source={{
              uri: 'https://assets.coingecko.com/coins/images/13161/standard/icon-celo-dollar-color-1000-circle-cropped.png',
            }}
          >
            cUSD
          </Avatar>
          <Text>cUSD</Text>
        </HStack>
        <Stack mr={1}>
          <Text textAlign="right" color="warmGray.800" fontWeight="semibold">
            {stableBal.toFixed(2)}
          </Text>
          <Text textAlign="right">≈ $ {(stableBal * rates.CUSDUSD).toFixed(2)}</Text>
        </Stack>
      </HStack>
    </HStack>
  );
};

export default FeaturedAssets;
