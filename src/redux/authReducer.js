import {authAPI} from '../api/auth';
import {setLoading} from './commonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setProfileData} from "./profileReducer";

const initialState = {
  isAuth: false,
  id: '',
  phone: '',
  user_token: '',
  error: '',
  status: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_AUTH':
    case 'SET_AUTH_STATUS':
    case 'SET_AUTH_ERROR':
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setIsAuth = isAuth => ({type: 'SET_IS_AUTH', payload: {isAuth}});
export const setAuthStatus = status => ({
  type: 'SET_AUTH_STATUS',
  payload: {status},
});
export const setAuthError = error => ({
  type: 'SET_AUTH_ERROR',
  payload: {error},
});
export const setUserData = (id, phone, user_token) => ({
  type: 'SET_USER_DATA',
  payload: {
    id,
    phone,
    user_token,
  },
});

export const login = (phone, code) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await authAPI.login(phone, code);
    const user = await authAPI.findUserByPhone(phone);
    const user_id = user?.data?.data[0]?.id?.toString();
    dispatch(setUserData(user_id, res.data.phone, res.data.user_token));
    await AsyncStorage.setItem('token', res.data.user_token);
    await AsyncStorage.setItem('phone', res.data.phone);
    await AsyncStorage.setItem('user_id', user_id);
    await dispatch(authMe());
    dispatch(setAuthStatus('success'));
  } catch (e) {
    console.log(e.response.data)
    dispatch(setAuthStatus('error'));
    dispatch(setAuthError(e?.response?.data?.errors?.message ?? "Что-то пошло не так"));
  }
  dispatch(setLoading(false));
};
export const getCode = phone => async dispatch => {
  dispatch(setLoading(true));
  try {
    await authAPI.getCode(phone);
    dispatch(setAuthStatus('success'));
  } catch (e) {
    console.log(e);
    dispatch(setAuthStatus('error'));
    dispatch(setAuthError(e?.response?.data?.errors?.message ?? "Что-то пошло не так"));
  }
  dispatch(setLoading(false));
};

export const authMe = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const token = await AsyncStorage.getItem('token');
    const phone = await AsyncStorage.getItem('phone');
    const user_id = await AsyncStorage.getItem('user_id');
    if (token) {
      dispatch(setUserData(user_id, phone, token));
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
      dispatch(setProfileData({}))
    }
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const logout = () => async dispatch => {
  try {
    dispatch(setIsAuth(false));
    dispatch(setProfileData({}))
    dispatch(setUserData(null, null, null));
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('phone');
    await AsyncStorage.removeItem('user_id');
    dispatch(authMe());
  } catch (e) {
    console.log(e.response.data);
  }
};
