import { Text, Box, SectionList, Pressable, Divider, HStack, ChevronRightIcon } from 'native-base';

export default function AccountScreen({ navigation }) {
  const data = [
    {
      title: 'Profile',
      icon: 'person',
      description: '',
      data: [
        {
          title: 'Edit Profile',
          action: 'editProfile',
        },
        {
          title: 'Language',
          action: 'changeLanguage',
        },
        {
          title: 'Currency',
          action: 'changeCurrency',
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
                <Text>{item.title}</Text>
                <ChevronRightIcon size="4" />
              </HStack>
            </Pressable>
            <Divider />
          </>
        )}
        renderSectionHeader={({ section: { title, icon, description } }) => (
          <Box maxW="90%" mt={3} mb={2}>
            <Text fontSize="lg" textAlign="left">
              {title}
            </Text>
            {description ? <Text fontSize="xs">{description}</Text> : null}
          </Box>
        )}
      />
    </Box>
  );
}
