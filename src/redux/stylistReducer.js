import {setLoading} from './commonReducer';
import {stylistsAPI} from '../api/stylists';
import {filialsAPI} from '../api/filials';

const initialState = {
  allStylists: [],
  seances: [],
  comments: [],
};

export const stylistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_STYLISTS':
    case 'SET_SEANCES':
    case 'SET_COMMENTS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAllStylists = allStylists => ({
  type: 'SET_ALL_STYLISTS',
  payload: {allStylists},
});

export const setSeances = (seances) => ({
  type: 'SET_SEANCES',
  payload: {seances},
});
export const setComments = (comments) => ({
  type: 'SET_COMMENTS',
  payload: {comments},
});

export const getStylistsTC = (company, service_ids, datetime) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await stylistsAPI.getStylists(company, service_ids, datetime);
    dispatch(setAllStylists(res));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const getAllStylistsTC = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const filials = await filialsAPI.getFilials();
    const stylists = await Promise.all(
      filials.data.map(filial => stylistsAPI.getStylists(filial)),
    );
     dispatch(setAllStylists(stylists.reduce((a, b) => a.concat(b), [])));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const getStylistBookableSeancesTC = (filial_id, stylist_id, service_id) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const dates = await stylistsAPI.getStylistBookableSeancesDates(filial_id, stylist_id, service_id);
    let times = await Promise.all(
      dates.map(date =>
        stylistsAPI.getStylistBookableSeancesTimes(filial_id, stylist_id, service_id, date)
      ),
    );
    let seances = [];

    for (let i = 0; i < dates.length; i++) {
      seances.push({date: dates[i], times: times[i]});
    }
    dispatch(setSeances(seances));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};

export const getCommentsTC = (company_id, stylist_id) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await stylistsAPI.getComments(company_id, stylist_id);
    dispatch(setComments(res.data));
  } catch (e) {
    console.log(e.response.data);
  }
  dispatch(setLoading(false));
};


