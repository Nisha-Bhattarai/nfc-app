import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Dimensions, Image
} from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FormInput from '../../../components/formInput';
import Colors from '../../../constants/Colors';
import SkillsSelector from '../../../components/skillsSelector';
import BottomSheet from '../../../components/BottomSheet';
import SocialMediaModal from '../../../components/SocialMediaModal';
import EventDateTimePicker from '../../../components/eventDateTimePicker';
import AddURLModal from '../../../components/AddURLModal';
import AddCertificationModal from '../../../components/AddCertificationModal';
import { useRouter } from 'expo-router';
import { useEventProfileState } from '../../../states/useEventProfileState';
import { createEventProfile, updateEventProfile } from '../../../viewmodels/profiles/EventProfileViewModel';
import { platforms } from '../../../components/SocialMediaModal';
import { useLocalSearchParams } from 'expo-router';
import { uploadImageToCloudinary } from '../../../utils/cloudinaryUpload.ts'

const CreateEventProfile = () => {
  const router = useRouter();
  const { profile } = useLocalSearchParams();
  const profileData = profile ? JSON.parse(profile) : null;
  const isEditMode = !!profileData?._id;

  const numColumns = 3;
  const spacing = 2;
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 64;
  const imageSize =
    (screenWidth - horizontalPadding - spacing * (numColumns - 1)) / numColumns;

  const {
    eventProfileName, setEventProfileName,
    eventName, setEventName,
    startDate, setStartDate,
    endDate, setEndDate,
    location, setLocation,
    aboutEvent, setAboutEvent,
    personalEmail, setPersonalEmail,
    workEmail, setWorkEmail,
    personalPhone, setPersonalPhone,
    workPhone, setWorkPhone,
    socialMedia, setSocialMedia,
    relevantLinks, setRelevantLinks,
    skills, setSkills,
    certifications, setCertifications,
    photoGallery, setPhotoGallery,
    loading, setLoading,
    error, setError,
    success, setSuccess
  } = useEventProfileState();

  useEffect(() => {
    if (profileData) {
      setEventProfileName(profileData.eventProfileName || '');
      setEventName(profileData.eventName || '');
      setStartDate(profileData.startDate || '');
      setEndDate(profileData.endDate || '');
      setLocation(profileData.location || '');
      setAboutEvent(profileData.aboutEvent || '');
      setPersonalEmail(profileData.personalEmail || '');
      setWorkEmail(profileData.workEmail || '');
      setPersonalPhone(profileData.personalPhone || '');
      setWorkPhone(profileData.workPhone || '');
      setSocialMedia(profileData.socialMedia || []);
      setRelevantLinks(profileData.relevantLinks || []);
      setSkills(profileData.skills || []);
      setCertifications(profileData.certifications || []);
      setPhotoGallery(profileData.photoGallery?.map(url => url || []));

    }
  }, []);

  const [isPlatformModalVisible, setIsPlatformModalVisible] = useState(false);
  const [showURLModal, setShowURLModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const handleSave = async () => {
    let uploadedPhotos = photoGallery;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      uploadedPhotos = await Promise.all(
        photoGallery.map(async (photo) => {
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

    const requestData = {
      eventProfileName,
      eventName,
      startDate,
      endDate,
      location,
      aboutEvent,
      personalEmail,
      workEmail,
      personalPhone,
      workPhone,
      socialMedia,
      relevantLinks,
      skills,
      certifications,
      photoGallery: uploadedPhotos || [],
    };


    if (isEditMode) {
      await updateEventProfile(
        profileData._id,
        requestData,
        (response) => {
          setLoading(false);
          setSuccess('Event Profile update successfully');
          router.back()
        },
        (errorMsg) => {
          setLoading(false);
          setError(errorMsg);
        }
      );
    } else {
      await createEventProfile({
        data: requestData
      }, () => {
        setLoading(false);
        setSuccess('Event profile created successfully');
        router.back();
      }, err => {
        setLoading(false);
        setError(err);
      });
    };

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
      setPhotoGallery((prev) => [...prev, ...selected]);
    }
  };

  const updateSocialMedia = (index, url) => {
    const updated = [...socialMedia];
    updated[index].url = url;
    setSocialMedia(updated);
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
          <FormInput placeholder="Event Profile Name" value={eventProfileName} onChangeText={setEventProfileName} />
          <FormInput placeholder="Event Name" value={eventName} onChangeText={setEventName} />
          <Text style={styles.sectionTitle}>Start Date</Text>
          <EventDateTimePicker date={startDate} onChange={setStartDate} />
          <Text style={styles.sectionTitle}>End Date</Text>
          <EventDateTimePicker date={endDate} onChange={setEndDate} />
          <FormInput placeholder="Event Location" value={location} onChangeText={setLocation} />
          <FormInput placeholder="About Event" value={aboutEvent} onChangeText={setAboutEvent} multiline style={{ height: 100 }} />
          <FormInput placeholder="Personal Email" value={personalEmail} onChangeText={setPersonalEmail} />
          <FormInput placeholder="Work Email" value={workEmail} onChangeText={setWorkEmail} />
          <FormInput placeholder="Personal Phone" value={personalPhone} onChangeText={setPersonalPhone} />
          <FormInput placeholder="Work Phone" value={workPhone} onChangeText={setWorkPhone} />

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
          {relevantLinks.map((rl, idx) => (
            <View key={idx} style={styles.row}>
              <FormInput
                placeholder="Title"
                value={rl.title}
                onChangeText={txt => {
                  const arr = [...relevantLinks];
                  arr[idx].title = txt;
                  setRelevantLinks(arr);
                }}
                style={styles.urlTitleInput}
              />
              <FormInput
                placeholder="Link URL"
                value={rl.url}
                onChangeText={txt => {
                  const arr = [...relevantLinks];
                  arr[idx].url = txt;
                  setRelevantLinks(arr);
                }}
                style={styles.urlInput}
              />
              <TouchableOpacity onPress={() => setRelevantLinks(relevantLinks.filter((_, i) => i !== idx))}>
                <AntDesign name="delete" size={20} color={Colors.delete} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addMoreBtn} onPress={() => setShowURLModal(true)}>
            <Text style={styles.addMoreText}>+ Add Link</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Skills</Text>
          <SkillsSelector selected={skills} onChange={setSkills} />

          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((c, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={{ flex: 1 }}>{c}</Text>
              <TouchableOpacity onPress={() => setCertifications(certifications.filter((_, i) => i !== idx))}>
                <AntDesign name="delete" size={20} color={Colors.delete} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addMoreBtn} onPress={() => setShowCertModal(true)}>
            <Text style={styles.addMoreText}>+ Add Certification</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Event Gallery</Text>



          {/* <TouchableOpacity style={styles.addMoreBtn}>
            <Text style={styles.addMoreText}>+ Add Photos</Text>
          </TouchableOpacity> */}

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {photoGallery.map((photo, i) => (
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
                  onPress={() => setPhotoGallery(photoGallery.filter((_, idx) => idx !== i))}
                >
                  <AntDesign name="closecircle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={pickMultipleImages} style={styles.addMoreBtn}>
            <Text style={styles.addMoreText}>+ Add Photos</Text>
          </TouchableOpacity>


          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>{isEditMode ? 'Update' : 'Save'}</Text>}
          </TouchableOpacity> */}
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
      </ScrollView>
      <BottomSheet visible={showURLModal} onClose={() => setShowURLModal(false)}>
        <AddURLModal
          onAdd={(title, url) => {
            console.log('Adding relevant link:', { title, url }); // for debugging
            // setRelevantLinks([...relevantLinks, { title, url }]);
            // setShowURLModal(false);
            setRelevantLinks(prev => [...prev, { title, url }]);
            setShowURLModal(false);
          }}
        />
      </BottomSheet>
      <BottomSheet visible={showCertModal} onClose={() => setShowCertModal(false)}>
        <AddCertificationModal
          onAdd={cert => {
            setCertifications([...certifications, cert]);
            setShowCertModal(false);
          }}
        />
      </BottomSheet>
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
  dateInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato_400Regular',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
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
    marginVertical: 8,
    gap: 12,
  },
  relevantURLRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificationsRow: {
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

export default CreateEventProfile