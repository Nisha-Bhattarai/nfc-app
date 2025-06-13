import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';

export default function EventDateTimePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isModalVisible, setModalVisible] = useState(false);
  const [pickerFor, setPickerFor] = useState(null); // 'start' or 'end'
  const [mode, setMode] = useState('date'); // for Android step picker mode

  // Temporary date state inside modal for iOS to delay commit
  const [tempDate, setTempDate] = useState(new Date());

  // Open picker modal and set mode according to platform
  const openPicker = (forWhich) => {
    setPickerFor(forWhich);
    if (forWhich === 'start') {
      setTempDate(startDate);
    } else {
      setTempDate(endDate);
    }

    if (Platform.OS === 'ios') {
      setMode('datetime');
      setModalVisible(true);
    } else {
      setMode('date');
      setModalVisible(true);
    }
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      // Android: immediately apply changes and handle mode switch for time picker
      if (event.type === 'dismissed' || !selectedDate) {
        setModalVisible(false);
        setMode('date');
        return;
      }

      if (pickerFor === 'start') {
        if (mode === 'date') {
          setStartDate(selectedDate);
          setMode('time');
        } else {
          setStartDate(selectedDate);
          setModalVisible(false);
          setMode('date');
        }
      } else if (pickerFor === 'end') {
        if (mode === 'date') {
          setEndDate(selectedDate);
          setMode('time');
        } else {
          setEndDate(selectedDate);
          setModalVisible(false);
          setMode('date');
        }
      }
    } else {
      // iOS: update tempDate only, don't close modal
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  // When user presses Done on iOS modal
  const onDonePress = () => {
    if (pickerFor === 'start') {
      setStartDate(tempDate);
    } else if (pickerFor === 'end') {
      setEndDate(tempDate);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Start:</Text>
      <TouchableOpacity style={styles.buttonStyled} onPress={() => openPicker('start')}>
        <Text style={styles.buttonText}>{startDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Event End:</Text>
      <TouchableOpacity style={styles.buttonStyled} onPress={() => openPicker('end')}>
        <Text style={styles.buttonText}>{endDate.toLocaleString()}</Text>
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
            value={Platform.OS === 'ios' ? tempDate : (pickerFor === 'start' ? startDate : endDate)}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            minimumDate={pickerFor === 'end' ? startDate : new Date()}
            is24Hour={true}
            style={{ width: '100%' }}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={onDonePress}
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
  container: { flex: 1, justifyContent: 'center', },
  label: { fontSize: 16, marginBottom: 10 },
  buttonStyled: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
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
