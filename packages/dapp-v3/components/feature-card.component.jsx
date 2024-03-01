import { Box, Text, HStack, Stack, Button, Heading, Icon, Spinner, Divider } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

const FeatureCard = ({ color, bg, actions, itemBottom, apprxBalance, balance, space, onOpen }) => {
  const navigation = useNavigation();
  const [wholePart, decimalPart] = balance.split('.');
  return (
    <Box bg={bg} roundedBottom={itemBottom ? 'md' : '2xl'}>
      <Box mx="4" mb="3" mt={2}>
        <Pressable onPress={onOpen}>
          <HStack width="full" bg="white" my={2} alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={1}>
              <Text fontSize="lg" fontWeight="semibold">
                {space.name}
              </Text>
              <Icon as={Feather} name="chevron-down" size="xl" mt={1} />
            </HStack>

            <Text fontSize="md" color="muted.600">
              {space.address}
            </Text>
          </HStack>
        </Pressable>
        <Divider my={2} />
        <Text _light={{ color }} mt={2}>
          Space Balance (USD)
        </Text>
        <HStack alignItems="center">
          <Heading size="2xl" letterSpacing="0.5" _light={{ color }}>
            $ {wholePart + '.'}
          </Heading>
          <Heading size="xl" letterSpacing="0.5" mt={1} _light={{ color }}>
            {decimalPart}
          </Heading>
        </HStack>
        <Text fontSize="md" _light={{ color }} lineHeight="sm" mt={1} mb={2}>
          {'  '}≈ {apprxBalance} KES
        </Text>
      </Box>
      {balance ? null : <Spinner right="1/2" top={10} position="absolute" size="lg" />}
      {/*<HStack mx="4" mb="4" space="2">
        {actions.map((action, index) => (
          <Button
            key={index}
            leftIcon={action.icon}
            rounded="3xl"
            variant="subtle"
            pr="4"
            size="md"
            _text={{ color: 'primary.800', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate(action.screen, action.screenParams)}
          >
            {action.name}
          </Button>
        ))}
        </HStack>*/}
    </Box>
  );
};

export default FeatureCard;
