import React from 'react';
import {
  View,
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  ActivityIndicator, 
  Image, 
  Dimensions
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo, FontAwesome6 } from '@expo/vector-icons';
import FormInput from '../../../components/formInput';
import Colors from '../../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToCloudinary, uploadMultipleImagesToCloudinary } from '../../../utils/cloudinaryUpload.ts'
import { usePrimaryProfileState } from '../../../states/usePrimaryProfileState';
import { useState, useEffect } from 'react';
import { createPrimaryProfile, updatePrimaryProfile } from '../../../viewmodels/profiles/PrimaryProfileViewModel.ts';
import { useRouter } from 'expo-router';
import SocialMediaModal from '../../../components/SocialMediaModal';
import { platforms } from '../../../components/SocialMediaModal';
import { useLocalSearchParams } from 'expo-router';

const CreatePrimaryProfile = () => {
  const router = useRouter();

  const numColumns = 3;
  const spacing = 2;
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 64;
  const imageSize =
    (screenWidth - horizontalPadding - spacing * (numColumns - 1)) / numColumns;

  const [isPlatformModalVisible, setIsPlatformModalVisible] = useState(false);
  const { profile } = useLocalSearchParams();
  const profileData = profile ? JSON.parse(profile) : null;
  const isEditMode = !!profileData?._id;

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
    profilePicture, setProfilePicture,
    photos, setPhotos,
    loading, error, success,
    setLoading, setError, setSuccess,
  } = usePrimaryProfileState();

  useEffect(() => {
    if (profileData) {
      setProfileName(profileData.profileName || '');
      setFirstName(profileData.firstName || '');
      setLastName(profileData.lastName || '');
      setJobTitle(profileData.jobTitle || '');
      setCompany(profileData.company || '');
      setLocation(profileData.location || '');
      setBio(profileData.bio || '');
      setPersonalEmail(profileData.personalEmail || '');
      setWorkEmail(profileData.workEmail || '');
      setPersonalPhone(profileData.personalPhone || '');
      setWorkPhone(profileData.workPhone || '');
      setSocialMedia(profileData.socialMedia || []);
      setRelevantLinks(profileData.relevantLinks || []);
      setPhotos(profileData.photoGallery?.map(url => url || []));
      setProfilePicture(profileData.profilePicture || '');
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    let uploadedProfilePicture = profilePicture;
    let uploadedPhotos = photos;

    if (profilePicture && !(profilePicture.startsWith("http://") || profilePicture.startsWith("https://"))) {
      try {
        uploadedProfilePicture = await uploadImageToCloudinary(profilePicture);
        console.log("uploaded Image url:", uploadedProfilePicture);
      } catch (err) {
        setLoading(false);
        setError("Image upload failed");
        return;
      }
    }

    try {
      uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          if (photo.startsWith("http://") || photo.startsWith("https://")) {
            return photo; // already uploaded
          } else {
            const uploadedUrl = await uploadImageToCloudinary(photo);
            return uploadedUrl;
          }
        })
      );
      console.log("Uploaded gallery photos:", uploadedPhotos);
    } catch (err) {
      setLoading(false);
      setError("Some gallery photos failed to upload");
      return;
    }

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
      profilePicture: uploadedProfilePicture || '',
      photoGallery: uploadedPhotos ||[],
    };

    if (isEditMode) {
      await updatePrimaryProfile(
        profileData._id,
        data,
        (response) => {
          setLoading(false);
          setSuccess('Profile update successfully');
          router.back()
        },
        (errorMsg) => {
          setLoading(false);
          setError(errorMsg);
        }
      );
    } else {
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
    }
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


  const pickImage = async (setter) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      console.log(`URI => ${result.assets[0].uri}`)
      setter(result.assets[0].uri);
    }
  };

  const pickMultipleImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      setPhotos((prev) => [...prev, ...selected]);
    }
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
            <TouchableOpacity style={styles.avatar} onPress={() => pickImage(setProfilePicture)}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture, height: 100, width: 100 }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              ) : (
                <FontAwesome name="user-circle-o" size={80} color={Colors.border} />
              )}
              <View style={styles.chatIcon}>
                <Entypo name="dots-three-horizontal" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
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

            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              {photos.map((photo, i) => (
                <View
                  key={i}
                  style={{
                    width: imageSize,
                    height: imageSize,
                    marginRight: (i + 1) % numColumns === 0 ? 0 : spacing,
                    marginBottom: spacing,
                    position: 'relative',
                  }}
                >
                  <Image
                    source={{ uri: photo }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    style={{ position: 'absolute', top: 4, right: 4 }}
                    onPress={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                  >
                    <AntDesign name="closecircle" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={pickMultipleImages} style={styles.addMoreBtn}>
              <Text style={styles.addMoreText}>+ Add Photos</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveText}>{isEditMode ? 'Update' : 'Save'}</Text>
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
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
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