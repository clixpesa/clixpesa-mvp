import {
  Text,
  Stack,
  VStack,
  Pressable,
  Image,
  AspectRatio,
  Avatar,
  HStack,
  Box,
  Icon,
} from '@clixpesa/native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

/**
 * Card for popular spaces
 * @param {string} title space name
 * @param {string} desc description
 * @param {string} iconName MaterialIcons name
 * @param {string} targetAmt Goal amount
 * @param {string} memberCount number of participants
 * @param {string} imgLink background image link
 * @param {string} bgColor background color
 */
const PopularItem = (props) => {
  const navigation = useNavigation();
  const title = props.title.split(' ');
  const initials =
    title.length > 1
      ? title[0].slice(0, 1) + title[1].slice(0, 1)
      : title[0].slice(0, 2).toUpperCase();
  return (
    <Pressable onPress={() => navigation.navigate(props.screen)}>
      <VStack
        pb={3}
        space={3}
        rounded="2xl"
        w="175"
        bg="white"
        borderWidth={2}
        borderColor="gray.100"
      >
        <Box>
          <AspectRatio
            ratio={{
              base: 4 / 3,
            }}
          >
            {props.imgLink ? (
              <Image
                source={{
                  uri: props.imgLink,
                }}
                roundedTop="2xl"
                alt="spaces"
              />
            ) : (
              <Box bg={props.bgColor} roundedTop="2xl"></Box>
            )}
          </AspectRatio>

          <Box position="absolute" bottom={0} p={3}>
            <VStack space={2}>
              {props.memberCount ? (
                <Box>
                  <Avatar.Group
                    space={-1.5}
                    left={2}
                    alignSelf="flex-start"
                    _avatar={{
                      borderWidth: '0',
                    }}
                  >
                    <Avatar size="sm" bg="purple.600">
                      {initials}
                    </Avatar>
                    <Avatar size="sm" bg="coolGray.500" opacity={85} alignItems="center">
                      +{props.memberCount - 1}
                    </Avatar>
                  </Avatar.Group>
                  <Text color="text.50" mt={2}>
                    {props.memberCount} participants
                  </Text>
                </Box>
              ) : null}
              <HStack alignItems="center" space={1}>
                <Icon as={MaterialIcons} name={props.iconName} size="xl" color="text.50" />
                <Text color="text.50" fontSize="md" fontWeight="semibold">
                  {props.targetAmt}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Stack px={3}>
          <Text>{props.title}</Text>
          <Text fontSize="xs" color="warmGray.500" ellipsizeMode="tail" numberOfLines={1}>
            {props.desc}
          </Text>
        </Stack>
      </VStack>
    </Pressable>
  );
};

export default PopularItem;
