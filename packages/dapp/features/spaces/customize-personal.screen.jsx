import { useState } from 'react';
import { Box, HStack, FormControl, Stack, Input, Button, Image } from 'native-base';

const CustomizePersonalScreen = ({ navigation }) => {
  const suggestions = ['Savings', 'Vacation', 'Chama', 'Gift', 'Sherehe', 'Emergency', 'Masomo'];
  const [spaceName, setSpaceName] = useState('');

  return (
    <Box flex={1} bg="muted.50">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1493655430214-3dd7718460bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        }}
        alt="Your groups photo"
        height="35%"
        minH={240}
      />
      <FormControl alignItems="center" mt={2}>
        <Stack space={2} w="80%">
          <Stack space={2}>
            <FormControl.Label>Name your space</FormControl.Label>
            <Input
              p={2}
              placeholder="Savings"
              size="lg"
              value={spaceName}
              onChangeText={(text) => setSpaceName(text)}
            />
          </Stack>
          <HStack space={2} flexWrap="wrap">
            {suggestions.map((item) => {
              return (
                <Button
                  size="sm"
                  variant="subtle"
                  shadow="1"
                  mb={2}
                  key={item}
                  onPress={() => setSpaceName(item)}
                >
                  {item}
                </Button>
              );
            })}
          </HStack>
          <Stack alignItems="center" pt="40%">
            <Button
              variant="subtle"
              rounded="3xl"
              w="60%"
              _text={{
                color: 'primary.600',
                fontWeight: 'semibold',
                mb: '0.5',
              }}
              onPress={() => {
                navigation.navigate('SetPersonalGoal');
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default CustomizePersonalScreen;
