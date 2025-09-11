import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../constants/Colors'; // adjust the path as needed

const LabeledInput = ({
  label,
  placeholder,
  iconName,
  iconLibrary = 'FontAwesome5', // default
  keyboardType = 'default',
  value,
  onChangeText,
  secureTextEntry = false,
  readOnly = false, // new prop
}) => {
  const IconComponent = iconLibrary === 'MaterialIcons' ? MaterialIcons : FontAwesome5;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.eachFormContainer}>
      <View style={styles.labelIconContainer}>
        <IconComponent name={iconName} size={24} color="black" style={styles.icon} />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#718096"
          style={styles.input}
          keyboardType={keyboardType}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={!readOnly}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={22}
              color="#424b5cff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  eachFormContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
    fontSize: 14,
  },
  labelText: {
    fontSize: 14,
    marginEnd: 14,
    fontFamily: 'Lato_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    borderBottomWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
});
