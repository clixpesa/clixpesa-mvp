import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';

import { theme } from './theme';
import { encryptData, decryptDataWpasscode} from './utils/encryption';

export default function App() {

  const handleEncrypt = async () => {
    const data = "Hello World";
    console.log(Date.now());
    const encryptedData = await encryptData(data, "password");
    console.log(Date.now());
    console.log(encryptedData);

  }
  
  return (
    <NativeBaseProvider theme={theme}>
    <Box flex={1} justifyContent="center" alignItems="center">
      <StatusBar style="auto" />
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={() => handleEncrypt()}>Encrypt</Button>
      <Button onPress={() => console.log("Decrypt")}>Decrypt</Button>
      <Button onPress={() => console.log("Salty")}>Salt</Button>
      <StatusBar style="auto" />
    </Box>
  </NativeBaseProvider>
  );
}


