import { Box, Text, Avatar, Input, VStack, Spacer, Button } from 'native-base';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails } from 'dapp/store/essential/essential.slice';

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const userDetails = useSelector((s) => s.essential.userDetails);
  const [names, setNames] = useState(userDetails.names);
  const [email, setEmail] = useState(userDetails.email);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const userPhone =
    userDetails.phone.slice(0, 4) +
    ' ' +
    userDetails.phone.slice(4, 7) +
    ' ' +
    userDetails.phone.slice(7);

  const handleSaveChanges = () => {
    setSaved(true);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(updateUserDetails({ names, email }));
      setIsLoading(false);
      setSaved(false);
    }, 2000);
  };

  return (
    <Box flex={1} bg="white" alignItems="center">
      <VStack space={2} w="90%" alignItems="center">
        <Avatar size="lg" bg="primary.200" _text={{ color: 'primary.800' }} mt={10} mb={5}>
          {userDetails.initials}
        </Avatar>
        <Input variant="underlined" isDisabled size="lg" value={userPhone} />
        <Input
          variant="underlined"
          placeholder="Firstname Lastname"
          size={16}
          autoCorrect={false}
          value={names}
          onChangeText={(text) => setNames(text)}
        />
        <Input
          variant="underlined"
          placeholder="firstname@clixpesa.com"
          size={16}
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </VStack>
      <Spacer />
      <Button
        variant="subtle"
        rounded="3xl"
        isLoading={isLoading}
        pr="4"
        minW="65%"
        mb="10"
        _text={{ color: 'primary.700', fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => handleSaveChanges()}
      >
        Save Changes
      </Button>
    </Box>
  );
}
