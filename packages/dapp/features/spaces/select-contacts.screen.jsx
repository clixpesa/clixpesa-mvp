import React, { useEffect, useState, useCallback } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
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
    const fetchContacts = async () => {
      try {
        // Request permission to access contacts
        const { status } = await Contacts.requestPermissionsAsync();

        // If permission granted, fetch contacts
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            Fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });

          // If contacts exist, update contact list
          if (data && data.length > 0) {
            setContactList(data);
          } else {
            console.log('No Contacts');
          }
        } else {
          console.log('Permission Denied');
        }
      } catch (error) {
        console.log('An error accurred while fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const toggleContactSelection = useCallback(
    (contactId) => {
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
    },
    [selectedContacts],
  );

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

  const handleContactSelection = (contactId) => () => toggleContactSelection(contactId);

  const renderItem = useCallback(({ item, index }) => {
    const isSelected = selectedContacts.includes(item.id);

    return (
      <TouchableOpacity onPress={handleContactSelection(item.id)}>
        <Contact
          index={index}
          isSelected={isSelected}
          nameInitials={item.name[0].toUpperCase()}
          fullName={item.name}
          phoneNo={item.phoneNumbers ? getContactData(item.phoneNumbers, 'number')[0] : 'No Number'}
        />
      </TouchableOpacity>
    );
  });

  const removeContactHandler = (contactId) => () => removeSelectedContact(contactId);

  const renderSelectedContact = useCallback(
    (contactId, index) => {
      const contact = contactList.find((contact) => contact.id === contactId);
      return (
        <TouchableOpacity key={contactId} onPress={removeContactHandler(contactId)}>
          <SelectedContact
            index={index}
            badge
            nameInitials={contact.name[0].toUpperCase()}
            fullName={contact.name}
          />
        </TouchableOpacity>
      );
    },
    [removeContactHandler, contactList],
  );

  const renderSelectedContacts = useCallback(() => {
    return selectedContacts.map((contactId, index) => renderSelectedContact(contactId, index));
  }, [selectedContacts, renderSelectedContact]);

  const keyExtractor = (item) => item.id;

  return (
    <Box flex={1} bg="muted.100">
      <VStack bg="muted.200">
        {selectedContacts.length > 0 ? (
          <HStack>
            <ScrollView horizontal>{renderSelectedContacts()}</ScrollView>
          </HStack>
        ) : (
          <Box alignItems="center" m={2} w="78%">
            <Text>Please select members to add to your space</Text>
          </Box>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contactList}
          keyExtractor={keyExtractor}
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
