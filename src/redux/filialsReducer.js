import {setLoading} from './commonReducer';
import {filialsAPI} from '../api/filials';

const initialState = {
  allFilials: [],
};

export const filialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_FILIALS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAllFilials = allFilials => ({
  type: 'SET_ALL_FILIALS',
  payload: {allFilials},
});

export const getAllFilialsTC = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let filials = await filialsAPI.getFilials();
    let filials_data = await Promise.all(
      filials.data.map(
        async filial => await dispatch(showFilialDataTC(filial)),
      ),
    );
    filials?.data?.forEach((filial, i) => {
      filial.datetime = filials_data[i].datetime;
      filial.stylists_length = filials_data[i].stylists_length;
    });
    dispatch(setAllFilials(filials.data));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const showFilialDataTC = filial => async dispatch => {
  try {
    const date = await filialsAPI.getFirstBookableDate(filial.id);
    const datetime = await filialsAPI.getFirstBookableDateTime(filial.id, date);
    const stylists_length = await filialsAPI.getFreeStylistsLength(
      filial.id,
      datetime,
    );
    return {datetime, stylists_length};
  } catch (e) {
    console.log(e.response.data);
  }
};
