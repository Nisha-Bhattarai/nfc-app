import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator,
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo, FontAwesome6 } from '@expo/vector-icons';
import FormInput from '../../../components/formInput';
import Colors from '../../../constants/Colors';
import { usePrimaryProfileState } from '../../../states/usePrimaryProfileState';
import { useState } from 'react';
import { createPrimaryProfile } from '../../../viewmodels/profiles/PrimaryProfileViewModel.ts';
import { useRouter } from 'expo-router';
import SocialMediaModal from '../../../components/SocialMediaModal';
import { platforms } from '../../../components/SocialMediaModal';

const CreatePrimaryProfile = () => {
  const router = useRouter();

  const [isPlatformModalVisible, setIsPlatformModalVisible] = useState(false);

  const {
    profileName, setProfileName,
    firstName, setFirstName,
    lastName, setLastName,
    jobTitle, setJobTitle,
    company, setCompany,
    location, setLocation,
    bio, setBio,
    personalEmail, setPersonalEmail,
    workEmail, setWorkEmail,
    personalPhone, setPersonalPhone,
    workPhone, setWorkPhone,
    socialMedia, setSocialMedia,
    relevantLinks, setRelevantLinks,
    photos, setPhotos,
    loading, error, success,
    setLoading, setError, setSuccess,
  } = usePrimaryProfileState();

  const handleCreatePrimaryProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const data = {
      profileName,
      firstName,
      lastName,
      jobTitle,
      company,
      location,
      bio,
      personalEmail,
      workEmail,
      personalPhone,
      workPhone,
      socialMedia,
      relevantLinks,
      profilePicture: photos?.[0]?.url || '', // main profile picture
      photoGallery: photos?.map(photo => photo.url) || [],
    };

    await createPrimaryProfile(
      data,
      (response) => {
        setLoading(false);
        setSuccess('Profile Created successfully');
        router.back()
      },
      (errorMsg) => {
        console.log(errorMsg)
        setLoading(false);
        setError(errorMsg);
      }
    );
  };

  const updateSocialMedia = (index, url) => {
    const updated = [...socialMedia];
    updated[index].url = url;
    setSocialMedia(updated);
  };

  const updateRelevantLink = (index, field, value) => {
    const updated = [...relevantLinks];
    updated[index][field] = value;
    setRelevantLinks(updated);
  };

  return (
    <>
      <Modal
        visible={isPlatformModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPlatformModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsPlatformModalVisible(false)}
        />
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>Choose Platform</Text>
          <SocialMediaModal
            onSelectPlatform={(platform) => {
              if (!socialMedia.some(item => item.platform === platform)) {
                setSocialMedia([...socialMedia, { platform, url: '' }]);
              }
              setIsPlatformModalVisible(false);
            }}
          />
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <FontAwesome name="user-circle-o" size={80} color={Colors.border} />
              <View style={styles.chatIcon}>
                <Entypo name="dots-three-horizontal" size={16} color="#fff" />
              </View>
            </View>
          </View>

          <View style={styles.form}>
            {[
              { label: 'Profile Name', value: profileName, setter: setProfileName },
              { label: 'First Name', value: firstName, setter: setFirstName },
              { label: 'Last Name', value: lastName, setter: setLastName },
              { label: 'Job Title', value: jobTitle, setter: setJobTitle },
              { label: 'Company', value: company, setter: setCompany },
              { label: 'Location', value: location, setter: setLocation },
              { label: 'Bio/Description', value: bio, setter: setBio, multiline: true, style: { height: 100 } },
              { label: 'Personal Email', value: personalEmail, setter: setPersonalEmail },
              { label: 'Work Email', value: workEmail, setter: setWorkEmail },
              { label: 'Personal Phone', value: personalPhone, setter: setPersonalPhone },
              { label: 'Work Phone', value: workPhone, setter: setWorkPhone },
            ].map((item, i) => (
              <FormInput
                key={i}
                placeholder={item.label}
                value={item.value}
                onChangeText={item.setter}
                multiline={item.multiline}
                numberOfLines={item.multiline ? 4 : 1}
                style={item.style}
              />
            ))}

            <Text style={styles.sectionTitle}>Social Media</Text>
            {socialMedia.map((item, index) => (
              <View style={styles.socialMediaLink} key={index}>
                {getPlatformIcon(item.platform)}
                <FormInput
                  placeholder={`Your ${item.platform} URL`}
                  value={item.url}
                  onChangeText={(text) => updateSocialMedia(index, text)}
                  style={styles.socialInput}
                />
                <TouchableOpacity onPress={() => setSocialMedia(socialMedia.filter((_, i) => i !== index))}>
                  <AntDesign name="delete" size={20} color={Colors.delete} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addMoreBtn} onPress={() => setIsPlatformModalVisible(true)}>
              <Text style={styles.addMoreText}>+ Add More</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Relevant Links</Text>
            {relevantLinks.map((l, i) => (
              <View style={styles.row} key={i}>
                <FormInput
                  placeholder="URL Title"
                  value={l.title}
                  onChangeText={(text) => updateRelevantLink(i, 'title', text)}
                  style={styles.urlTitleInput}
                />
                <FormInput
                  placeholder="Add your url here"
                  value={l.url}
                  onChangeText={(text) => updateRelevantLink(i, 'url', text)}
                  style={styles.urlInput}
                />
                <TouchableOpacity onPress={() => setRelevantLinks(relevantLinks.filter((_, idx) => idx !== i))}>
                  <AntDesign name="delete" size={20} color={Colors.delete} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => setRelevantLinks([...relevantLinks, { title: '', url: '' }])} style={styles.addMoreBtn}>
              <Text style={styles.addMoreText}>+ Add More</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Photo Gallery</Text>
            {photos.map((photo, i) => (
              <View key={i} style={styles.photoItem}>
                <Text style={{ flex: 1 }}>{photo.name}</Text>
                <TouchableOpacity onPress={() => setPhotos(photos.filter((_, idx) => idx !== i))}>
                  <AntDesign name="delete" size={20} color={Colors.delete} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => {
              // Call image picker logic externally
              // setPhotos([...photos, { name: 'example.jpg', url: '/uploads/example.jpg' }])
            }} style={styles.addMoreBtn}>
              <Text style={styles.addMoreText}>+ Add Photos</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleCreatePrimaryProfile} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const getPlatformIcon = (platform) => {
  return platforms[platform]?.icon ?? <FontAwesome6 name="globe" size={28} color="#555" />;
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  platformOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  platformText: {
    fontSize: 16,
    marginLeft: 12,
  },



  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundContainer: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    padding: 16,
    borderRadius: 18,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: { position: 'relative', alignItems: 'center' },
  chatIcon: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: Colors.textSecondary,
    borderRadius: 50,
    padding: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30
  },
  socialInput: {
    flex: 1,
    marginHorizontal: 10
  },
  urlTitleInput: {
    width: 100,
    marginRight: 8
  },
  urlInput: {
    flex: 1, marginRight: 8
  },
  addMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: '#E67629',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  addMoreText: {
    color: '#E67629',
    fontWeight: '500'
  },
  saveButton: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
    width: 150,
  },
  saveButtonContainer: {
    alignSelf: 'flex-end',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default CreatePrimaryProfile