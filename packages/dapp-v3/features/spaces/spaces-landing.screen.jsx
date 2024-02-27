import { Box, Text, Heading, HStack, Stack, VStack, Icon, Avatar, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function SpacesLandingScreen({ navigation }) {
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <Box bg="white" padding={4} width="full">
        <Heading mt="1/3" color="primary.700" size="xl">
          Clixpesa Spaces
        </Heading>
        <Text mt={4} fontSize="lg">
          Make money moves with your
        </Text>
        <Text mb={4} fontSize="lg">
          family and friends...
        </Text>
        <Box bg="white" padding={4} width="full"></Box>
      </Box>
      <VStack position="absolute" mt="2/3" width="85%" space={2}>
        <Pressable
          bg="primary.50"
          padding={4}
          rounded="2xl"
          shadow="1"
          onPress={() => navigation.navigate('createSpace')}
        >
          <HStack space={2} alignItems="center">
            <Avatar bg="primary.200">
              <Icon as={MaterialIcons} name="groups" size="2xl" color="primary.600" />
            </Avatar>
            <Stack px={2}>
              <Text fontSize="md" fontWeight="semibold">
                Create a Space
              </Text>
              <Text fontSize="md">Create a new savings circle.</Text>
              <Text fontSize="md">Add friends or family.</Text>
            </Stack>
          </HStack>
        </Pressable>
        <Pressable
          bg="primary.50"
          padding={4}
          rounded="2xl"
          shadow="1"
          onPress={() => navigation.navigate('joinSpace')}
        >
          <HStack space={2} alignItems="center">
            <Avatar bg="primary.200">
              <Icon as={MaterialIcons} name="group-add" size="2xl" color="primary.600" />
            </Avatar>
            <Stack px={2}>
              <Text fontSize="md" fontWeight="semibold">
                Join a Space
              </Text>
              <Text fontSize="md">You'll need an invite to join.</Text>
              <Text fontSize="md">Save with friends.</Text>
            </Stack>
          </HStack>
        </Pressable>
      </VStack>
    </Box>
  );
}
