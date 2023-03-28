import { Button, Text } from 'native-base';

const SpareChange = ({ item }) => {
  const { spareChange, selected } = item;
  return (
    <Button
      bg={`${selected ? 'primary.600' : 'primary.100'}`}
      rounded="lg"
      justifyContent="center"
      alignItems="center"
    >
      <Text color={`${selected && 'white'}`}>{spareChange}</Text>
    </Button>
  );
};

export default SpareChange;
