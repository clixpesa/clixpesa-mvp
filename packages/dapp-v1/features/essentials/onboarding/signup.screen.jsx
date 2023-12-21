import {
  Box,
  Text,
  FormControl,
  Input,
  WarningOutlineIcon,
  ChevronDownIcon,
  VStack,
  HStack,
  Stack,
  Pressable,
  Button,
  Icon,
  useDisclose,
} from 'native-base';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import auth from '@react-native-firebase/auth';
import { VerificationModal } from '../../../components';

export default function SignUpScreen({ navigation }) {
  const [phoneNo, setPhoneNo] = useState('');
  const [thisNo, setThisNo] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [country, setCountry] = useState('KE');
  const [confirm, setConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [code, setCode] = useState('');

  const validateNo = () => {
    if (isPossiblePhoneNumber(phoneNo, country) && isValidPhoneNumber(phoneNo, country)) {
      setIsInvalid(false);
    } else {
      console.log('invalid');
      setIsInvalid(true);
    }
  };

  const handleSubmit = async () => {
    validateNo();
    if (!isInvalid) {
      setIsLoading(true);
      const phoneNumber = parsePhoneNumberFromString(phoneNo, country);
      //setThisNo(phoneNumber.number);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber.number);
      setConfirm(confirmation);
      //onOpen();
      setIsLoading(false);
      navigation.navigate('verifyPhoneNo', {
        phone: phoneNumber.number,
        verificationId: confirmation.verificationId,
      });
    }
  };

  return (
    <Box flex={1} bg="white" alignItems="center">
      <FormControl mt="1/6">
        <VStack mx={8} space={4}>
          <Stack>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input
              InputLeftElement={
                <Pressable
                  onPress={() => {
                    console.log('pressed');
                  }}
                >
                  <HStack alignItems="center">
                    <Text fontSize="md" ml={3} mr={1} mb={0.5}>
                      +254
                    </Text>
                    <ChevronDownIcon size="xs" />
                  </HStack>
                </Pressable>
              }
              placeholder="712345678"
              size="md"
              fontSize="md"
              keyboardType="numeric"
              autoFocus={true}
              spellCheck={false}
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
              onEndEditing={() => validateNo()}
            />
            <FormControl.ErrorMessage
              isInvalid={isInvalid}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please enter a valid phone number
            </FormControl.ErrorMessage>
            <FormControl.HelperText color="muted.500">
              Depending on your mobile network and country, standard rates and taxes may apply.
            </FormControl.HelperText>
          </Stack>
          <Button
            rounded="3xl"
            pr="4"
            minW="75%"
            isLoading={isLoading}
            _text={{ fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => handleSubmit()}
          >
            Create Account
          </Button>
          {/*
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
            Sign in with Google
            </Button>*/}
        </VStack>
      </FormControl>
      <VerificationModal
        isOpen={isOpen}
        onClose={onClose}
        phoneNumber={thisNo}
        confirmation={confirm}
        code={code}
        setCode={setCode}
      />
    </Box>
  );
}
