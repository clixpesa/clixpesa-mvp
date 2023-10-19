import { Text, Box, SectionList, Pressable, Divider } from 'native-base';

export default function AccountScreen() {
  const data = [
    {
      title: 'Profile',
      icon: 'person',
      description: '',
      data: ['edit-profile', 'language', 'currency'],
    },
    {
      title: 'Security',
      icon: 'lock',
      description: '',
      data: ['recovery-phrase', 'change-passcode'],
    },
    {
      title: 'About',
      icon: 'information-circle',
      data: ['about', 'terms', 'privacy', 'licenses'],
    },
    {
      title: 'Logout',
      icon: 'log-out',
      description:
        "Remove your account from this device. You'll need your recovery phrase to log back in.",
      data: ['logout'],
    },
  ];

  return (
    <Box flex={1} bg="white" alignItems="center" justifyContent="center">
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <>
            <Pressable py={3} onPress={() => console.log(item)}>
              <Text>{item}</Text>
            </Pressable>
            <Divider />
          </>
        )}
        renderSectionHeader={({ section: { title, icon, description } }) => (
          <Box minW="95%" mt={3} mb={2}>
            <Text fontSize="lg" textAlign="left">
              {title}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
}
