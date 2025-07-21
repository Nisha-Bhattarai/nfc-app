import { StyleSheet, Switch } from 'react-native'
import React from 'react'

const ToggleButton = ({
    value,
    onValueChange,
    disabled = false,
    trackColor = { false: '#ccc', true: '#4CAF50' },
    thumbColor = '#fff'
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={trackColor}
      thumbColor={thumbColor}
    />
  )
}

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});