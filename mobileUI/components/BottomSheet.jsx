import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Animated, Pressable, View } from 'react-native';
import Colors from '../constants/Colors';

const BottomSheet = ({
  visible,
  onClose,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = (callback) => {
    Animated.timing(slideAnim, {
      toValue: contentHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  useEffect(() => {
    if (visible && contentHeight > 0) {
      // Start hidden below the screen
      slideAnim.setValue(contentHeight);
      slideUp();
    }
    if (!visible && contentHeight > 0) {
      slideDown(onClose);
    }
  }, [visible, contentHeight]);

  if (!visible) return null;

  const handleClose = () => {
    slideDown(onClose);
  };

  return (
    <Pressable onPress={handleClose} style={styles.backdrop}>
      <Pressable onPress={(e) => e.stopPropagation()} style={{ width: '100%' }}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height);
          }}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
