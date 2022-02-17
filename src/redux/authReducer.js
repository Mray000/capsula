import {authAPI} from '../api/auth';
import {setLoading} from './commonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    //FAKE
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     dispatch(setLoading(true));
    //     resolve(
    //       dispatch(setLoading(false)),
    //       AsyncStorage.setItem('token', '2804f52ec42edcdbe0e80b827f018fd8'),
    //       AsyncStorage.setItem('phone', '79675557371'),
    //       AsyncStorage.setItem('user_id', '125672700'),
    //       dispatch(
    //         setUserData(
    //           '125672700',
    //           '79675557371',
    //           '2804f52ec42edcdbe0e80b827f018fd8',
    //         ),
    //       ),
    //       dispatch(setIsAuth(true)),
    //       dispatch(setAuthStatus('success')),
    //     );
    //     // reject(
    //     //   dispatch(setAuthStatus('error')),
    //     //   dispatch(setAuthError('error')),
    //     // );
    //   }, 2000);
    // });

    //REAL
    const res = await authAPI.login(phone, code);
    console.log(res.data)
    const user = await authAPI.findUserByPhone(phone);
    console.log(user.data)
    const user_id = user?.data?.data[0]?.id?.toString();
    dispatch(setUserData(user_id, res.data.phone, res.data.user_token));
    AsyncStorage.setItem('token', res.data.user_token);
    AsyncStorage.setItem('phone', res.data.phone);
    AsyncStorage.setItem('user_id', user_id);
    // await dispatch(authMe());
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
    //REAL
    const res = await authAPI.getCode(phone);
    dispatch(setAuthStatus('success'));
    console.log(res.data)
    //FAKE
    // new Promise((resolve, reject) => {
    //   dispatch(setLoading(true));
    //   setTimeout(() => {
    //     resolve(
    //       dispatch(setLoading(false)),
    //       dispatch(setAuthStatus('success')),
    //     );
    //   }, 2000);
    // });
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
    }
    // await AsyncStorage.setItem('token', "2804f52ec42edcdbe0e80b827f018fd8");
    // await AsyncStorage.setItem('phone', "79675557371");
    // await AsyncStorage.setItem('user_id', "125672700");
    // dispatch(setUserData("125672700", "79675557371", "2804f52ec42edcdbe0e80b827f018fd8"));
    // dispatch(setIsAuth(true));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const logout = () => async dispatch => {
  try {
    dispatch(setIsAuth(false));
    dispatch(setUserData(null, null, null));
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('phone');
    AsyncStorage.removeItem('user_id');
    dispatch(authMe());
  } catch (e) {
    console.log(e.response.data);
  }
};
