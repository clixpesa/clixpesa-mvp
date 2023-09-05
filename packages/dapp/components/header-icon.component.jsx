import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

const HeaderIcon = ({ screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <Icon as={Feather} name="arrow-left" size="2xl" mr="4" />
    </TouchableOpacity>
  );
};

export default HeaderIcon;
