import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Pressable, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const BottomSheet = ({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.4,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = (callback) => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  useEffect(() => {
    if (visible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [visible]);

  if (!visible) return null;

  const handleClose = () => {
    slideDown(onClose);
  };

  return (
    <Pressable onPress={handleClose} style={styles.backdrop}>
      <Pressable
        style={{ width: '100%', height }}
        onPress={(e) => e.stopPropagation()}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
              height,
            },
          ]}
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
