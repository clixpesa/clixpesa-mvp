import { Modal, Icon, Text, Button, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SuccessModal = ({ isOpen, onClose, message, screen, scrnOptions }) => {
  const navigation = useNavigation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide" mt="60%" rounded="5xl">
      <Modal.Content>
        <Modal.Body>
          <VStack space={4} alignItems="center">
            <Icon as={MaterialIcons} name="check-circle" size="4xl" color="success.500" />
            <Text textAlign="center">{message}</Text>
            <Button
              rounded="3xl"
              w="70%"
              _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
              onPress={() => {
                onClose();
                navigation.navigate(screen, scrnOptions);
              }}
            >
              OK
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SuccessModal;
