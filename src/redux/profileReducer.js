import {profileAPI} from '../api/profileApi';
import {setLoading} from './commonReducer';
import {CAPSULA_EMAIL, LOYALITY_CARD_ID} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setEntryError, setEntryStatus} from './entryReducer';

const initialState = {
  profile: {},
  loyality_cards: {},
  allEntries: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_INFO':
    case 'SET_LOYALITY_CARDS':
    case 'SET_ALL_ENTRIES':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setProfileData = profile => ({
  type: 'SET_PROFILE_INFO',
  payload: {profile},
});

export const setLoyalityCard = loyality_cards => ({
  type: 'SET_LOYALITY_CARDS',
  payload: {loyality_cards},
});
export const setAllEntries = allEntries => ({
  type: 'SET_ALL_ENTRIES',
  payload: {allEntries},
});

export const getProfileInfoTC = id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await profileAPI.getProfile(id);
    dispatch(setProfileData(res.data));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const editProfileInfoTC = (id, data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    await profileAPI.editProfile(id, data);
    await dispatch(getProfileInfoTC(id));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const getLoyalityCardsTC = user_id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await profileAPI.getLoyalityCards(user_id);
    dispatch(setLoyalityCard(res.data.find(i => i.type.id === LOYALITY_CARD_ID)));
  } catch (e) {
    console.log(e);
  }
  dispatch(setLoading(false));
};
export const getAllEntriesTC = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await profileAPI.getAllEntries(token);
    dispatch(setAllEntries(res.data.filter(i => !i.deleted).filter(i => i.company.site === CAPSULA_EMAIL)));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const removeEntryTC = entry_id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const token = await AsyncStorage.getItem('token');
    await profileAPI.removeEntry(token, entry_id);
    dispatch(setEntryStatus('OK'));
  } catch (e) {
    dispatch(setEntryStatus('ERROR'));
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const editEntryTC = (company_id, data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    await profileAPI.editEntry(company_id, data);
    dispatch(setEntryStatus('OK'));
  } catch (e) {
    dispatch(setEntryError(e.response.data));
    dispatch(setEntryStatus('ERROR'));
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const getAllProfileIngo = (user_id) => async dispatch => {
  dispatch(setLoading(true));
  try {
    await dispatch(getAllEntriesTC());
    await dispatch(getProfileInfoTC(user_id));
    await dispatch(getLoyalityCardsTC(user_id));
  } catch (e) {
    dispatch(setEntryError(e.response.data));
    dispatch(setEntryStatus('ERROR'));
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};
