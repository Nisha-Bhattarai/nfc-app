import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../constants/Colors';
import ContactListCard from '../../../components/contactListCard';
import BottomSheet from '../../../components/BottomSheet';
import ContactsMoreModal from '../../../components/ContactsMoreModal';
import EditContactFormModal from '../../../components/EditContactFormModal';
import { useContactListState } from '../../../states/useContactListState';
import { deleteContact } from '../../../viewmodels/auth/ContactViewModel';

const Contacts = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const openBottomSheet = (content) => {
    setBottomSheetContent(content);
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    setBottomSheetContent(null);
  };
  const { contacts, loading, error, reload } = useContactListState();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    deleteContact(
      id, () => {
        closeBottomSheet()
        reload(); 
        setDeletingId(null);
      },
      (errMessage) => {
        alert(errMessage);
        setDeletingId(null);
      }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.addNewContactButton}>
          <TouchableOpacity style={styles.button} onPress={() => {
            openBottomSheet(<EditContactFormModal isEdit={false} onClose={closeBottomSheet} reloadPage={reload} />)
          }}>
            <Text style={styles.buttonText}>+ Add a New Contact</Text>
          </TouchableOpacity>
        </View>


        {loading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {contacts.map((contact) => (

              <ContactListCard
                key={contact._id}
                image={require('../../../assets/images/avatar.png')}
                name={`${contact.name}`}
                date={`${contact.createdAt}`}
                email={`${contact.email}`}
                phone={`${contact.phone}`}
                note={`${contact.note}`}
                onMorePress={() =>
                  openBottomSheet(
                    <ContactsMoreModal
                     deleting={deletingId === contact._id}
                      onEditPress={() => openBottomSheet(
                        <EditContactFormModal
                          isEdit={true}
                          contactData={contact}
                          onClose={closeBottomSheet}
                          reloadPage={reload}
                        />
                      )}
                      onDeletePress={() =>
                        handleDelete(contact._id)
                      }
                    />
                  )
                }
              />

            ))}

          </ScrollView>
        )}

      </View>
      <BottomSheet visible={bottomSheetVisible} onClose={closeBottomSheet}>
        {bottomSheetContent}
      </BottomSheet>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'stretch',
  },
  addNewContactButton: {
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 14,
  },
});