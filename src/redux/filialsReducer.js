import {setLoading} from './commonReducer';
import {filialsAPI} from '../api/filials';
import {entryAPI} from '../api/entry';

const initialState = {
  allFilials: [],
  initialFilials: [],
};

export const filialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_FILIALS':
    case 'SET_INITIAL_FILIAL':
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

export const setInitialFilialAC = initialFilials => ({
  type: 'SET_INITIAL_FILIAL',
  payload: {initialFilials},
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
    dispatch(setInitialFilialAC(filials.data));
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

export const getFilialsWithFilter = service_id => async dispatch => {
  dispatch(setLoading(true));
  try {
    let filials = await filialsAPI.getFilials();
    let salese_data = await Promise.all(
      filials.data.map(async filial => ({
        filial,
        sale: await entryAPI.getSales(filial.id),
      })),
    );
    const all_filials_sales = salese_data.filter(sale =>
      sale.sale
        .filter(el => el.category_id === 4218539)
        .filter(el => el.active === 1)
        .some(el => el.id === service_id),
    );
    let filtereed_filials = all_filials_sales.map(i => i.filial);
    let filials_data = await Promise.all(
      filtereed_filials.map(
        async filial => await dispatch(showFilialDataTC(filial)),
      ),
    );
    filtereed_filials.forEach((filial, i) => {
      filial.datetime = filials_data[i].datetime;
      filial.stylists_length = filials_data[i].stylists_length;
    });
    dispatch(setAllFilials(filtereed_filials));
  } catch (e) {
    console.log(e?.response?.data);
  }
  dispatch(setLoading(false));
};
