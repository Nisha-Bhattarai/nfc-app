import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import ProfileAnalytics from "../../components/profileAnalytics";
import EventAnalytics from "../../components/eventAnalytics";
import { Ionicons } from "@expo/vector-icons";
import { useProfilesState } from "../../states/useProfilesState";
import { setRunningProfile } from "../../viewmodels/main/HomeViewModel"

const SCREEN_HEIGHT = Dimensions.get("window").height;

// BottomSheet Component
const BottomSheet = ({ visible, onClose, children }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <ScrollView>{children}</ScrollView>
      </Animated.View>
    </View>
  );
};

const Home = () => {
  const firstName = "User";
  const defaultAvatar = require("../../assets/images/avatar.png");

  const [imageSource, setImageSource] = useState(defaultAvatar);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [selectedProfileType, setSelectedProfileType] = useState("PRIMARY");
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const { profileData, loading, error, fetchProfiles } = useProfilesState();

  useEffect(() => {
    if (isSheetVisible && (!profileData?.profiles || profileData.profiles.length === 0)) {
      fetchProfiles();
    }
  }, [isSheetVisible]);

  useEffect(() => {
    if (!profileData?.profiles) return;

    const runningProfile = profileData.profiles.find((p) => p.isRunningProfile);
    const defaultProfile = runningProfile || profileData.profiles.find((p) => p.profileType === "PRIMARY");

    if (defaultProfile) {
      setSelectedProfileId(defaultProfile._id);
      setSelectedProfileType(defaultProfile.profileType);
      setImageSource(defaultProfile.profilePicture ? { uri: defaultProfile.profilePicture } : defaultAvatar);
    } else {
      setSelectedProfileId(null);
      setImageSource(defaultAvatar);
    }
  }, [profileData]);

  const updateRunningProfile = async (slectedProfile) => {
    try {
      await setRunningProfile(
        slectedProfile._id,
        slectedProfile.profileType,
        (msg) => {
          console.log(msg);
          fetchProfiles()
          setIsSheetVisible(false);
        },
        (err) => {
          console.error(err);
        }
      );
    } catch (error) {
      console.error("Unexpected error updating running profile:", error);
    }
  };


  const handleProfileSelect = (p) => {
    updateRunningProfile(p);
  };

  const renderRadio = (selected) => (
    <View style={styles.radioCircle}>{selected && <View style={styles.radioInner} />}</View>
  );

  const primaryProfiles = profileData?.profiles?.filter((p) => p.profileType === "PRIMARY") || [];
  const eventProfiles = profileData?.profiles?.filter((p) => p.profileType === "EVENT") || [];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.greetingHeader}>
          <Text style={styles.headerText}>Hello, {firstName}!</Text>
          <TouchableOpacity onPress={() => setIsSheetVisible(true)}>
            <Image style={styles.image} source={imageSource} onError={() => setImageSource(defaultAvatar)} />
          </TouchableOpacity>
        </View>

        {/* Show Analytics based on selected profile type */}
        {selectedProfileType === "PRIMARY" ? <ProfileAnalytics key={selectedProfileId} /> : <EventAnalytics key={selectedProfileId} />}
      </View>

      <BottomSheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
        <View style={styles.sheetContent}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : error ? (
            <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{error}</Text>
          ) : !profileData?.profiles?.length ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No profiles found.</Text>
          ) : (
            <>
              {/* Primary Profiles */}
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={18} color={Colors.textPrimary} />
                <Text style={styles.sectionTitle}>Primary Profile</Text>
              </View>

              {primaryProfiles.map((p) => (
                <TouchableOpacity
                  key={p._id}
                  style={[styles.profileRow, selectedProfileId === p._id && styles.profileRowActive]}
                  onPress={() => handleProfileSelect(p)}
                >
                  {p.profilePicture && <Image source={{ uri: p.profilePicture }} style={styles.avatar} />}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{p.profileName}</Text>
                    <Text style={styles.type}>{p.jobTitle}</Text>
                  </View>
                  {renderRadio(selectedProfileId === p._id)}
                </TouchableOpacity>
              ))}

              {/* Event Profiles */}
              <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                <Ionicons name="calendar-outline" size={18} color={Colors.textPrimary} />
                <Text style={styles.sectionTitle}>Event Profile</Text>
              </View>

              {eventProfiles.map((p) => (
                <TouchableOpacity
                  key={p._id}
                  style={[styles.eventRow, selectedProfileId === p._id && styles.profileRowActive]}
                  onPress={() => handleProfileSelect(p)}
                >
                  <Text style={styles.eventText}>{p.profileName}</Text>
                  {renderRadio(selectedProfileId === p._id)}
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </BottomSheet>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: Colors.white, padding: 16 },
  greetingHeader: { flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" },
  headerText: { fontSize: 20, fontFamily: "Lato_400Regular", color: Colors.textPrimary },
  image: { width: 42, height: 42, borderRadius: 21 },
  sheetContent: { padding: 36 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginLeft: 8 },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, padding: 8, borderRadius: 12, backgroundColor: "#f9f9f9" },
  profileRowActive: { backgroundColor: "#eef6ff" },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10 },
  name: { fontSize: 14, fontWeight: "600" },
  type: { fontSize: 12, color: "gray" },
  radioCircle: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.primary, alignItems: "center", justifyContent: "center" },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: Colors.primary },
  eventRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: 16, borderRadius: 12, backgroundColor: "#f9f9f9" },
  eventText: { fontSize: 14, flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "flex-end" },
  background: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 20, maxHeight: SCREEN_HEIGHT * 0.7, minHeight: SCREEN_HEIGHT * 0.3 },
});
