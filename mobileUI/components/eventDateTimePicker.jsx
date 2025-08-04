import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';

export default function EventDateTimePicker({ label, date, onChange }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [tempDate, setTempDate] = useState(date || new Date());

  const openPicker = () => {
    setTempDate(date || new Date());
    if (Platform.OS === 'ios') {
      setMode('datetime');
      setModalVisible(true);
    } else {
      setMode('date');
      setModalVisible(true);
    }
  };

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'dismissed' || !selectedDate) {
        setModalVisible(false);
        setMode('date');
        return;
      }

      if (mode === 'date') {
        setTempDate(selectedDate);
        setMode('time');
      } else {
        setModalVisible(false);
        onChange(selectedDate);
        setMode('date');
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleDone = () => {
    onChange(tempDate);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.buttonStyled} onPress={openPicker}>
        <Text style={styles.buttonText}>{date ? date.toLocaleString() : 'Select Date'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        propagateSwipe={true}
      >
        <View style={styles.modalContent}>
          <DateTimePicker
            value={Platform.OS === 'ios' ? tempDate : date || new Date()}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            is24Hour={true}
            style={{ width: '100%' }}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={handleDone}
              style={styles.doneButton}
              activeOpacity={0.7}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { fontSize: 16 },
  buttonStyled: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  doneButton: {
    marginTop: 15,
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
