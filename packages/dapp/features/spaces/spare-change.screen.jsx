import { useState } from 'react';
import { Box, Text, HStack, VStack, Switch, Button } from 'native-base';
import Icon from 'react-native-remix-icon';

import SpareChange from '../../components/spare-change.component';
import { spareChangeList } from '../../data';

export default function SpareChangeScreen({ navigation }) {
  const [spareChange, setSpareChange] = useState(spareChangeList);

  const handleSpareChangeSelection = (selectedItemId) => {
    setSpareChange((prev) => {
      const newSpareChange = prev.map((item) => {
        if (item.id === selectedItemId) {
          prev.forEach((i) => {
            if (i.id !== selectedItemId) {
              i.selected = false;
            }
          });
        }
        if (item.id === selectedItemId) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
      return newSpareChange;
    });
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center" p={4}>
      <Box w="100%" my={4} pl={4}>
        <Text>
          We'll round up the spare change from your Clixpesa payments and place it in this space
        </Text>
      </Box>

      <VStack space={1} w="100%">
        <HStack
          bg="#fff"
          p={4}
          justifyContent="space-between"
          alignItems="center"
          roundedTop="2xl"
          roundedBottom="md"
        >
          <HStack alignItems="center" space={2}>
            <Box bg="primary.100" rounded="full" p={2}>
              <Icon name="coins-line" size={24} color="#0F766E" />
            </Box>
            <Text fontWeight="semibold">Spare change x1</Text>
          </HStack>
          <Switch defaultIsChecked />
        </HStack>
        <VStack bg="#fff" p={4} space={2} roundedTop="md" roundedBottom="2xl">
          <Text>Spare change accelerator</Text>
          <HStack space={2}>
            {spareChange.map((item) => (
              <SpareChange
                key={item.id}
                item={item}
                action={() => handleSpareChangeSelection(item.id)}
              />
            ))}
          </HStack>
        </VStack>
      </VStack>
      <Box mt="60%" w="50%">
        <Button
          rounded="3xl"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate('recurringTransfer')}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
