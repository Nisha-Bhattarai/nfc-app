import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '../constants/Colors';

// CHANGE FROM ARRAY TO OBJECT:
export const platforms = {
  facebook: {
    label: 'Facebook',
    icon:    <FontAwesome6 name="facebook" size={28} color="#1877F2" />,
  },
  instagram: {
    label: 'Instagram',
    icon: <FontAwesome6 name="instagram" size={28} color="#E1306C" />,
  },
  linkedin: {
    label: 'LinkedIn',
    icon: <FontAwesome6 name="linkedin" size={28} color="#0A66C2" />,
  },
  twitter: {
    label: 'Twitter',
    icon: <FontAwesome6 name="twitter" size={28} color="#1DA1F2" />,
  },
  youtube: {
    label: 'YouTube',
    icon: <FontAwesome6 name="youtube" size={28} color="#FF0000" />,
  },
  tiktok: {
    label: 'TikTok',
    icon: <FontAwesome6 name="tiktok" size={28} color="#000" />,
  },
  reddit: {
    label: 'Reddit',
    icon: <FontAwesome6 name="reddit" size={28} color="#FF4500" />,
  },
  pinterest: {
    label: 'Pinterest',
    icon: <FontAwesome6 name="pinterest" size={28} color="#E60023" />,
  },
};

const SocialMediaModal = ({ onSelectPlatform }) => {
  return (
    <View style={styles.bottomSheetContainer}>
      {Object.entries(platforms).map(([key, platform]) => (
        <TouchableOpacity
          key={key}
          style={styles.socialMedia}
          onPress={() => onSelectPlatform(key)}
        >
          {platform.icon}
          <Text style={styles.socialMediaText}>{platform.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialMediaModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flexDirection: 'column',
    gap: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  socialMedia: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  socialMediaText: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  icon: {
    width: 30,
  },
});
