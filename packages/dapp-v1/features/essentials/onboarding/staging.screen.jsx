import { Box, Button, Text } from 'native-base';
import { getWallets } from '../../wallet/manager.wallet';

export default function StagingScreen() {
  const getWallet = async () => {
    const wallets = (await getWallets())[0];
    console.log(wallets);
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center" justifyContent="center">
      <Text>SignUp/Restoration Successful!</Text>
      <Button onPress={() => getWallet()} />
    </Box>
  );
}
