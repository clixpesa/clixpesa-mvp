import React, { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Stack,
  VStack,
  FlatList,
  Button,
  ScrollView,
  useToast,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Contacts from 'expo-contacts';

import { Contact, SelectedContact } from '@dapp/components';
import { setSelectedMembers } from '@dapp/store/spaces/spaces.slice';

//TODO! Handle submissions

export default function SelectContactsScreen({ navigation }) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactList, setContactList] = useState();
  const dispatch = useDispatch();
  const toast = useToast();

  const showToast = () => {
    toast.show({
      description: 'At least 1 contact must be selected',
      duration: 2000,
      placement: 'top',
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          Fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          console.log(data);
          setContactList(data);
        } else {
          console.log('No Contacts');
        }
      }
    })();
  }, []);

  const toggleContactSelection = (contactId) => {
    const isSelected = selectedContacts.includes(contactId);

    if (isSelected) {
      // Remove the contact from the selected list
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      // Check if the contact is not already selected before adding
      if (!selectedContacts.includes(contactId)) {
        // Add the contact to the selected list
        setSelectedContacts([...selectedContacts, contactId]);
      }
    }
  };

  const removeSelectedContact = (contactId) => {
    const updatedContacts = selectedContacts.filter((id) => id !== contactId);
    setSelectedContacts(updatedContacts);
  };

  const navigateToNextPage = () => {
    if (selectedContacts.length === 0) {
      // Show toast notification if no contacts are selected
      showToast();
    } else {
      // Get details of selected contacts
      const selectedContactDetails = selectedContacts.map((contactId) =>
        contactList.find((contact) => contact.id === contactId),
      );

      // Navigate to the next page and pass the selected contact details
      dispatch(setSelectedMembers(selectedContactDetails));
      navigation.navigate('setRoscaGoal');
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedContacts.includes(item.id);

    return (
      <TouchableOpacity onPress={() => toggleContactSelection(item.id)}>
        <Contact
          index={index}
          isSelected={isSelected}
          nameInitials={item.name[0].toUpperCase()}
          fullName={item.name}
          phoneNo={item.phoneNumbers ? getContactData(item.phoneNumbers, 'number')[0] : 'No Number'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} bg="muted.100">
      <VStack width="full" bg="muted.200">
        {selectedContacts.length > 0 ? (
          <HStack>
            <ScrollView horizontal>
              {selectedContacts.map((contactId, index) => {
                const contact = contactList.find((contact) => contact.id === contactId);
                return (
                  <TouchableOpacity
                    key={contactId}
                    onPress={() => removeSelectedContact(contactId)}
                  >
                    <SelectedContact
                      index={index}
                      badge
                      nameInitials={contact.name[0].toUpperCase()}
                      fullName={contact.name}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </HStack>
        ) : (
          <Box alignItems="center" m={2} w="78%">
            <Text>Please select members to add to your space</Text>
          </Box>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contactList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </VStack>
      <Stack w="50%" position="absolute" bottom={20} left="25%">
        <Button
          rounded="3xl"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={navigateToNextPage}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
}

const getContactData = (data, property) => {
  if (data) {
    return data.map((data, index) => {
      return data[property];
    });
  }
};
