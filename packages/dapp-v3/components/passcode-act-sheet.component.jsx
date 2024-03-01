import {
  Box,
  HStack,
  Pressable,
  Text,
  VStack,
  Spacer,
  Button,
  Actionsheet,
  Modal,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import CodeInput from './code-input.component';

const PasscodeActSheet = ({ isOpen, onClose, token, code, setCode }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnFullFill = async (code) => {
    try {
      console.log(code);
      onClose();
    } catch (error) {
      console.log('Verification Problem.', error);
    }
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box alignItems="center">
          <VStack space={3} m={6}>
            <Text fontSize="md" textAlign="center">
              Please enter passcode
            </Text>
            <Box my={3} alignSelf="center">
              <CodeInput
                autoFocus={true}
                value={code}
                onTextChange={(code) => setCode(code)}
                onFulfill={(code) => handleOnFullFill(code)}
              />
            </Box>

            <Button
              variant="subtle"
              rounded="3xl"
              pr="4"
              minW="65%"
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
          </VStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default PasscodeActSheet;
