import { Box, HStack, Pressable, Text, VStack, Spacer, Button, Modal } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import CodeInput from './code-input.component';
import ResendTimer from './resend-timer.component';

import { setUserDetails } from '../store/essential/essential.slice';

const VerificationModal = ({ isOpen, onClose, phoneNumber, confirmation, code, setCode }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnFullFill = async (code) => {
    try {
      const res = await confirmation.confirm(code);
      console.log(res);
      dispatch(
        setUserDetails({
          userId: res.user.uid,
          userName: res.user.displayName,
          userEmail: res.user.email,
          userPhone: res.user.phoneNumber,
          userPhoto: res.user.photoURL,
        }),
      );
      navigation.navigate('setPasscode');
      onClose();
    } catch (error) {
      console.log('Verification Problem.', error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content>
        <Modal.Body alignItems="center">
          <Box flex={1} alignItems="center" justifyContent="center">
            <VStack space={3} mx={6} mt={10}>
              <Text fontSize="md" textAlign="center">
                Verify your phone number ({phoneNumber})
              </Text>
              <Text color="muted.500">
                A verification code has been sent to {phoneNumber}. Please enter the code below.
              </Text>
              <Box my={3} alignSelf="center">
                <CodeInput
                  value={code}
                  onTextChange={(code) => setCode(code)}
                  onFulfill={(code) => handleOnFullFill(code)}
                  autoFocus
                />
              </Box>
              <ResendTimer seconds={55} onResend={() => console.log('Resending')} />
            </VStack>
            <Spacer />
            <Button
              variant="subtle"
              rounded="3xl"
              pr="4"
              minW="65%"
              my={10}
              _text={{
                color: 'primary.600',
                fontWeight: 'semibold',
                mb: '0.5',
              }}
              _spinner={{
                color: 'primary.700',
              }}
              onPress={(code) => handleOnFullFill(code)}
            >
              Verify
            </Button>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default VerificationModal;
