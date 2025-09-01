import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const LOGGED_IN_KEY = 'isLoggedIn';
const IS_SECOND_LOGIN = 'isSecondLogin';
const RUNNING_PROFILE_ID = 'runningProfileId';
const RUNNING_PROFILE_TYPE = 'runningProfileType';


export const saveSession = async (user: any, token: string) => {
  try {
    await AsyncStorage.multiSet([
      [USER_KEY, JSON.stringify(user)],
      [TOKEN_KEY, token],
      [LOGGED_IN_KEY, 'true'],
      [IS_SECOND_LOGIN, 'true']
    ]);
  } catch (err) {
    console.error('Failed to save session', err);
  }
};

export const setRunningProfile = async (runningProfileId: string | null, profileType: string | null) => {
  try {
    if (runningProfileId && profileType) {
      await AsyncStorage.multiSet([
        [RUNNING_PROFILE_ID, runningProfileId],
        [RUNNING_PROFILE_TYPE, profileType],
      ]);
    }
    //  else {
    //   await AsyncStorage.multiRemove([RUNNING_PROFILE_ID, RUNNING_PROFILE_TYPE]);
    // }
  } catch (err) {
    console.error('Failed to set running profile', err);
  }
};

export const getRunningProfile = async () => {
  try {
    const values = await AsyncStorage.multiGet([RUNNING_PROFILE_ID, RUNNING_PROFILE_TYPE]);
    return {
      runningProfileId: values[0][1] || null,
      runningProfileType: values[1][1] || null,
    };
  } catch (err) {
    console.error('Failed to get running profile', err);
    return { runningProfileId: null, runningProfileType: null };
  }
};

export const getSession = async () => {
  try {
    const values = await AsyncStorage.multiGet([USER_KEY, TOKEN_KEY, LOGGED_IN_KEY, IS_SECOND_LOGIN, RUNNING_PROFILE_ID, RUNNING_PROFILE_TYPE]);
    return {
      user: values[0][1] ? JSON.parse(values[0][1]) : null,
      token: values[1][1],
      isLoggedIn: values[2][1] === 'true',
      isSecondLogin: values[3][1] === 'true',
      runningProfileId: values[4][1] || null,
      runningProfileType: values[5][1] || null
    };
  } catch (err) {
    console.error('Failed to get session', err);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY, LOGGED_IN_KEY, RUNNING_PROFILE_ID, RUNNING_PROFILE_TYPE]);
  } catch (err) {
    console.error('Failed to clear session', err);
  }
};
