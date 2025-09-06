import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";

export default function EventDateTimePicker({ label, date, onChange }) {
  const [isModalVisible, setModalVisible] = useState(false); // iOS modal
  const [showPicker, setShowPicker] = useState(false); // Android native
  const [mode, setMode] = useState("date");
  const [tempDate, setTempDate] = useState(date || new Date());

  const openPicker = () => {
    setTempDate(date || new Date());
    if (Platform.OS === "ios") {
      setMode("datetime");
      setModalVisible(true);
    } else {
      setMode("date");
      setShowPicker(true);
    }
  };

  const handleAndroidChange = (event, selectedDate) => {
    if (event.type === "dismissed" || !selectedDate) {
      setShowPicker(false);
      setMode("date");
      return;
    }

    if (mode === "date") {
      setTempDate(selectedDate);
      setMode("time");
      setShowPicker(true); // open time next
    } else {
      setTempDate(selectedDate);
      setShowPicker(false);
      setMode("date");
      onChange(selectedDate); // done
    }
  };

  const handleIosChange = (_, selectedDate) => {
    if (selectedDate) setTempDate(selectedDate);
  };

  const handleDone = () => {
    onChange(tempDate);
    setModalVisible(false);
  };

  const formatDateTime = (date) => {
    if (!date) return "Select Date";
    return new Date(date)
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " -");
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.buttonStyled} onPress={openPicker}>
        <Text style={styles.buttonText}>{formatDateTime(date)}</Text>
      </TouchableOpacity>

      {/* iOS Modal */}
      {Platform.OS === "ios" && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
          swipeDirection="down"
          onSwipeComplete={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <DateTimePicker
              value={tempDate}
              mode="datetime"
              display="spinner"
              onChange={handleIosChange}
              is24Hour={true}
              style={{ width: "100%" }}
            />
            <TouchableOpacity
              onPress={handleDone}
              style={styles.doneButton}
              activeOpacity={0.7}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Android Native */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode={mode}
          display="default"
          is24Hour={false}
          onChange={handleAndroidChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { fontSize: 16 },
  buttonStyled: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: "500",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  doneButton: {
    marginTop: 15,
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
