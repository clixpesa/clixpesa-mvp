import { Box, HStack, Icon, Button, Image, Text, VStack, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomizePScreen = ({ navigation }) => {
  return (
    <Box flex={1} bg="muted.100">
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        }}
        alt="Your groups photo"
        height="35%"
        minH={240}
      />
      <Box position="absolute" bottom="65%" right={2} bg="primary.100" rounded="full" p={1}>
        <Icon as={<MaterialCommunityIcons name="camera-outline" />} size="lg" color="primary.800" />
      </Box>
      <VStack mx={2} space={1}>
        <Box p={4}>
          <Text>Your space</Text>
        </Box>
        <VStack space={4} p={4} bg="#fff" roundedTop="2xl" roundedBottom="md">
          <HStack justifyContent="space-between">
            <Text>Name</Text>
            <Pressable>
              <HStack space={2}>
                <Icon
                  color="primary.600"
                  as={<MaterialCommunityIcons name="pencil-outline" />}
                  size="md"
                />
                <Text color="primary.600">Sherehe</Text>
              </HStack>
            </Pressable>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Goal</Text>
            <Pressable>
              <HStack space={2}>
                <Icon
                  color="primary.600"
                  as={<MaterialCommunityIcons name="pencil-outline" />}
                  size="md"
                />
                <Text color="primary.600">Kshs 1000</Text>
              </HStack>
            </Pressable>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Deadline</Text>
            <Pressable>
              <HStack space={2}>
                <Icon color="primary.600" as={<MaterialCommunityIcons name="plus" />} size="md" />
                <Text color="primary.600">add deadline</Text>
              </HStack>
            </Pressable>
          </HStack>
        </VStack>
        <Box p={4} bg="#fff" rounded="md">
          <Text>Invite friends</Text>
        </Box>
        <Box p={4} bg="#fff" roundedBottom="2xl" roundedTop="md">
          <Text>Report an Issue</Text>
        </Box>
        <Box p={2} mt="10%" w="100%" alignItems="center">
          <Button
            variant="subtle"
            colorScheme="secondary"
            rounded="2xl"
            w="40%"
            onPress={() => navigation.navigate('PersonalHome')}
          >
            Close space
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CustomizePScreen;
