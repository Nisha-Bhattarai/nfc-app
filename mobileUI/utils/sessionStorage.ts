import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const LOGGED_IN_KEY = 'isLoggedIn';

export const saveSession = async (user: any, token: string) => {
  try {
    await AsyncStorage.multiSet([
      [USER_KEY, JSON.stringify(user)],
      [TOKEN_KEY, token],
      [LOGGED_IN_KEY, 'true'],
    ]);
  } catch (err) {
    console.error('Failed to save session', err);
  }
};

export const getSession = async () => {
  try {
    const values = await AsyncStorage.multiGet([USER_KEY, TOKEN_KEY, LOGGED_IN_KEY]);
    return {
      user: values[0][1] ? JSON.parse(values[0][1]) : null,
      token: values[1][1],
      isLoggedIn: values[2][1] === 'true',
    };
  } catch (err) {
    console.error('Failed to get session', err);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY, LOGGED_IN_KEY]);
  } catch (err) {
    console.error('Failed to clear session', err);
  }
};
