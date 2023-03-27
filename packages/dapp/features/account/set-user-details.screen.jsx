import {
  Box,
  Text,
  FormControl,
  Input,
  WarningOutlineIcon,
  CheckIcon,
  Select,
  VStack,
  Checkbox,
  Spacer,
  Button,
} from 'native-base';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateNames, validatePhoneNo } from '../../utils/validations';
import { setUserDetails as setDetails } from '../../store/account/account.slice';

const UserDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({ userNames: '', ctryCode: '', phoneNo: '' });
  const [isInvalid, setIsInvalid] = useState({ invalidName: false, invalidNo: false });
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (!isInvalid.invalidName && !isInvalid.invalidNo && isChecked) {
      dispatch(setDetails(userDetails));
      navigation.navigate('verifyPhoneNo');
    }
  };
  return (
    <Box flex={1} bg="muted.50" alignItems="center">
      <FormControl mt={10}>
        <VStack mx={8} space={4}>
          <Box>
            <FormControl.Label color="muted.600">Please enter your two names</FormControl.Label>
            <Input
              placeholder="Firstname Lastname"
              size="md"
              fontSize="md"
              spellCheck={false}
              value={userDetails.userNames}
              onChangeText={(text) => setUserDetails({ ...userDetails, userNames: text })}
              onEndEditing={() => validateNames(userDetails.userNames, setIsInvalid, isInvalid)}
            />
            <FormControl.ErrorMessage
              isInvalid={isInvalid.invalidName}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Something is wrong. Enter two names
            </FormControl.ErrorMessage>
          </Box>
          <Box>
            <FormControl.Label color="muted.600">
              Select country and enter phonenumber
            </FormControl.Label>
            <Select
              accessibilityLabel="Choose Country"
              placeholder="Country"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="xs" />,
              }}
              mb={2}
              size="md"
              onValueChange={(value) => setUserDetails({ ...userDetails, ctryCode: value })}
            >
              <Select.Item label="Kenya (+254)" value="+254" />
              <Select.Item label="Uganda (+256)" value="+256" />
              <Select.Item label="Tanzania (+255)" value="+255" />
            </Select>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please make a selection!
            </FormControl.ErrorMessage>
            <Input
              InputLeftElement={
                <Text ml={3} mb={0.5} fontSize="md">
                  {userDetails.ctryCode ? userDetails.ctryCode : '+123'}
                </Text>
              }
              placeholder="712345678"
              size="md"
              fontSize="md"
              keyboardType="numeric"
              spellCheck={false}
              value={userDetails.phoneNo}
              isDisabled={userDetails.ctryCode ? false : true}
              onChangeText={(text) => setUserDetails({ ...userDetails, phoneNo: text })}
              onEndEditing={() =>
                validatePhoneNo(userDetails.ctryCode + userDetails.phoneNo, setIsInvalid, isInvalid)
              }
            />
            <FormControl.ErrorMessage
              isInvalid={isInvalid.invalidNo}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Something is wrong.
            </FormControl.ErrorMessage>
            <FormControl.HelperText color="muted.500">
              Depending on your mobile network and country, standard rates and taxes may apply.
            </FormControl.HelperText>
          </Box>
          <Checkbox
            isChecked={isChecked}
            colorScheme="teal"
            size="md"
            maxW="85%"
            onChange={() => setIsChecked(!isChecked)}
          >
            <Text color="muted.600">
              I have read and agreed with Clixpesa terms and privacy policy
            </Text>
          </Checkbox>
        </VStack>
      </FormControl>
      <Spacer />
      <Button
        variant={isChecked ? 'solid' : 'subtle'}
        rounded="3xl"
        pr="4"
        minW="75%"
        isDisabled={isChecked ? false : true}
        my="10"
        _text={{
          color: isChecked ? 'primary.100' : 'primary.600',
          fontWeight: 'semibold',
          mb: '0.5',
        }}
        onPress={() => handleSubmit()}
      >
        Verify phone number
      </Button>
    </Box>
  );
};

export default UserDetailsScreen;
