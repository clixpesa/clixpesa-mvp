import { Text, Box, FormControl, VStack, Input, Spacer, Button } from 'native-base';
import { useState } from 'react';

const ImportWalletScreen = ({ navigation }) => {
  const [phrase, setPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (text) => {
    setPhrase(text);
  };
  return (
    <Box flex={1} bg="white" alignItems="center">
      <FormControl>
        <VStack alignItems="center" space={3} my="6">
          <Text maxW="70%" textAlign="center" fontWeight="medium">
            Enter your recovery (seed) phrase.
          </Text>
          <Text mt="-3">Only import on devices you trust.</Text>
          {/*TODO: Add phrase validation*/}
          <Input
            h="32"
            w="75%"
            isDisabled={isLoading}
            placeholder="apple mango passion ..."
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            autoFocus={true}
            fontSize="md"
            type="submit"
            value={phrase.toLowerCase()}
            onChangeText={handleChange}
          />
          <Text maxW="75%">
            Your recovery pharce is a 24-word phrase that you wrote down and saved when you setup
            your account. Please enter it here to restore your account.
          </Text>
        </VStack>
        <VStack alignItems="center" space={3} mb="10">
          <Button
            variant={isLoading ? 'subtle' : null}
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{
              color: isLoading ? 'primary.600' : 'primary.100',
              fontWeight: 'semibold',
              mb: '0.5',
            }}
            onPress={() => handleSubmit({ phrase })}
            isLoading={isLoading}
            spinnerPlacement="end"
            isLoadingText="Importing Account..."
          >
            Import Account
          </Button>
          {/* navigation handle for when canceling while already setup (Welcome/Wallet)*/}
          <Button
            variant="subtle"
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate('Welcome')}
          >
            Cancel
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default ImportWalletScreen;
