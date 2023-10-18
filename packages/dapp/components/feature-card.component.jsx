import { Box, Text, HStack, Stack, Button, Heading, Icon, Spinner } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FeatureCard = ({ color, bg, actions, itemBottom, apprxBalance, balance }) => {
  const navigation = useNavigation();
  const [wholePart, decimalPart] = balance.split('.');

  return (
    <Box mt={3} bg={bg} roundedTop="2xl" roundedBottom={itemBottom ? 'md' : '2xl'}>
      <HStack justifyContent="space-between">
        <Stack mx="4" my="3">
          <Text _light={{ color }}>Total Balance (USD)</Text>
          <HStack alignItems="center">
            <Heading size="xl" letterSpacing="0.5" _light={{ color }}>
              {wholePart + '.'}
            </Heading>
            <Heading size="lg" letterSpacing="0.5" mt={1} _light={{ color }}>
              {decimalPart}
            </Heading>
            <Icon as={Feather} name="chevron-down" size="lg" color={color} ml={2} />
          </HStack>
          <Text _light={{ color }} lineHeight="sm" mt={1}>
            {'  '}≈ {apprxBalance} KES
          </Text>
        </Stack>
      </HStack>
      {balance ? null : <Spinner right="1/2" top={10} position="absolute" size="lg" />}
      <HStack mx="4" mb="3" space="2">
        {actions.map((action) => (
          <Button
            key={action.name}
            leftIcon={action.icon}
            rounded="3xl"
            variant="subtle"
            pr="4"
            size="sm"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate(action.screen, action.screenParams)}
          >
            {action.name}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default FeatureCard;
