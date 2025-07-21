import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const RadioButton = ({
    selected,
    onPress,
    size = 24,
    color = '#000',
    disabled = false,
    style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style, disabled && styles.disabled]}
      activeOpacity={0.7}
    >
      <Ionicons
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={size}
        color={disabled ? '#999' : color}
      />
    </TouchableOpacity>
  )
}

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});
