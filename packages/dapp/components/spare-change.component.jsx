import { Button, Text } from 'native-base';

const SpareChange = ({ item, action }) => {
  const { spareChange, selected } = item;
  return (
    <Button
      bg={`${selected ? 'primary.600' : 'primary.100'}`}
      rounded="lg"
      justifyContent="center"
      alignItems="center"
      onPress={action}
    >
      <Text color={`${selected ? 'white' : 'black'}`}>{spareChange}</Text>
    </Button>
  );
};

export default SpareChange;
