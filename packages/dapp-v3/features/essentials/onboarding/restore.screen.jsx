import { Box, Text, Button, FormControl, Stack, Icon, Spacer, VStack } from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

export default function RestoreScreen({ navigation }) {
  const [phoneNo, setPhoneNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const { formattedNumber } = phoneInput.current?.getNumberAfterPossiblyEliminatingZero(phoneNo);
    setPhoneNo(formattedNumber);
    const phoneIsValid = phoneInput.current?.isValidNumber(formattedNumber);
    if (!phoneIsValid) {
      alert('Invalid Phone Number, Please enter a valid phone number');
      return;
    }
    const confirmation = await auth().signInWithPhoneNumber(formattedNumber);
    if (!confirmation) {
      alert('Error sending code');
      return;
    }
    setIsLoading(false);
    navigation.navigate('verifyPhoneNo', {
      phone: formattedNumber,
      country: phoneInput.current?.getCountryCode(),
      verificationId: confirmation.verificationId,
    });
  };
  return (
    <Box flex={1} bg="white" alignItems="center">
      <FormControl mt="1/6" alignItems="center">
        <Stack mx={8}>
          <FormControl.Label>Phone Number</FormControl.Label>
          <PhoneInput
            ref={phoneInput}
            defaultCode="KE"
            layout="first"
            autoFocus
            onChangeFormattedText={(text) => {
              setPhoneNo(text);
            }}
            containerStyle={{
              borderColor: '#0D9488',
              borderWidth: 2,
              borderRadius: 12,
              height: 56,
            }}
            textContainerStyle={{ borderRadius: 12, paddingTop: 0, paddingBottom: 2 }}
            codeTextStyle={{ fontSize: 18 }}
            textInputStyle={{ fontSize: 18 }}
            //flagButtonStyle={{ height: 40 }}
          />
          <FormControl.HelperText color="muted.500">
            Depending on your mobile network and country, standard rates and taxes may apply.
          </FormControl.HelperText>
        </Stack>
      </FormControl>
      <Spacer />
      <VStack alignItems="center" space={3} mb="10">
        <Button
          rounded="3xl"
          isLoading={isLoading}
          pr="4"
          minW="75%"
          _text={{ fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => {
            setIsLoading(true), handleSubmit();
          }}
          isLoadingText="Signing up..."
        >
          Link with Phone
        </Button>
        <Text textAlign="center" fontWeight="medium">
          -- OR --
        </Text>
        <Button
          rounded="3xl"
          variant="subtle"
          pr="4"
          minW="75%"
          _text={{ color: 'primary.700', fontWeight: 'semibold', mb: '0.5' }}
          leftIcon={<Icon as={Ionicons} name="logo-google" size="md" />}
          onPress={() => navigation.navigate('signInWithGoogle')}
        >
          Link with Google
        </Button>
      </VStack>
    </Box>
  );
}
