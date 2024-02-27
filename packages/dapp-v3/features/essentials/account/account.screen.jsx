import {
  Text,
  Box,
  SectionList,
  Pressable,
  Divider,
  HStack,
  ChevronRightIcon,
  Icon,
  Stack,
  useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';

export default function AccountScreen({ navigation }) {
  const walletAddress = useSelector((s) => s.essential.hasAccount.address);
  const userNumber = useSelector((s) => s.essential.userDetails.phone);
  const toast = useToast();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    toast.show({
      title: 'Address copied to clipboard',
      status: 'success',
      duration: 2000,
      placement: 'top',
    });
  };

  const data = [
    {
      title: userNumber,
      icon: 'person',
      description: walletAddress,
      data: [
        {
          title: 'Edit Profile',
          action: 'editProfile',
        },
        {
          title: 'Language',
          action: 'changeLanguage',
        },
      ],
    },
    {
      title: 'Security',
      icon: 'lock',
      description: '',
      data: [
        {
          title: 'Recovery Phrase',
          action: 'getRecoveryPhrase',
        },
        {
          title: 'Change Passcode',
          action: 'changePasscode',
        },
      ],
    },
    {
      title: 'About',
      icon: 'information-circle',
      data: [
        {
          title: 'About Us',
          action: 'aboutUs',
        },
        {
          title: 'Terms of Service',
          action: 'terms',
        },
        {
          title: 'Privacy Policy',
          action: 'privacy',
        },
        {
          title: 'Licenses',
          action: 'licenses',
        },
      ],
    },
    {
      title: 'Logout',
      icon: 'log-out',
      description:
        "Remove your account from this device. You'll need your recovery phrase to log back in.",
      data: [
        {
          title: 'Logout',
          action: 'logout',
        },
      ],
    },
  ];

  return (
    <Box flex={1} bg="white" alignItems="center" justifyContent="center">
      <SectionList
        sections={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <>
            <Pressable
              py={3}
              onPress={() =>
                item.action === 'logout'
                  ? console.log(item.action)
                  : navigation.navigate(item.action)
              }
              _pressed={{
                bg: 'muted.200',
              }}
            >
              <HStack justifyContent="space-between">
                <Text fontSize="md">{item.title}</Text>
                <ChevronRightIcon size="4" />
              </HStack>
            </Pressable>
            <Divider />
          </>
        )}
        renderSectionHeader={({ section: { title, icon, description } }) => (
          <Box maxW="90%" mt={3} mb={2}>
            {icon === 'person' ? (
              <HStack alignItems="center" space={6}>
                <Stack>
                  <Text fontSize="lg" textAlign="left">
                    {title}
                  </Text>
                  {description ? (
                    <Text fontSize="sm" maxW="90%">
                      {description}
                    </Text>
                  ) : null}
                </Stack>
                <Pressable p={3} mt={4} onPress={() => copyToClipboard()}>
                  <Icon as={Ionicons} name="ios-copy-outline" size="lg" color="text.400" />
                </Pressable>
              </HStack>
            ) : (
              <>
                <Text fontSize="lg" textAlign="left">
                  {title}
                </Text>
                {description ? <Text fontSize="xs">{description}</Text> : null}
              </>
            )}
          </Box>
        )}
      />
    </Box>
  );
}
