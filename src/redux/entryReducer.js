import {entryAPI} from '../api/entry';
import {setLoading} from './commonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COMPANY_ID} from '../constants';
import {filialsAPI} from "../api/filials";

const initialState = {
  entry: {},
  newDateEntry: null,
  filialDetails: {},
  entryError: null,
  entryStatus: null,
  filial: null,
  services: [],
  stylist: null,
  date_and_time: null,
  sales: [],
  currentSaleInfo: {},
  allCategories: [],
};

export const entryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ENTRY_INFO':
    case 'SET_ENTRY_STATUS':
    case 'SET_NEW_DATE_ENTRY':
    case 'SET_ENTRY_ERROR':
    case 'SET_STYLIST':
    case 'SET_SALES':
    case 'SET_ALL_CATEGORIES':
    case 'CLEAR_SERVICES':
    case 'SET_CURRENT_SALE_INFO':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_FILIAL':
      const newState = state.filial
        ? {
            filial: action.payload.filial,
            services: [],
            stylist: null,
            date_and_time: undefined,
          }
        : {
            filial: action.payload.filial,
          };
      return {
        ...state,
        ...newState,
      };
    case 'SET_DATE_AND_TIME':
      return {
        ...state,
        date_and_time: {
          date: action.payload.date,
          time: action.payload.time,
        },
      };
    case 'SET_SERVICES':
      return {
        ...state,
        services: !state.services.find(el => el.id === action.payload.filial.id)
          ? [...state.services, action.payload.filial]
          : state.services.filter(el => el.id !== action.payload.filial.id),
      };
    case 'CLEAR_ALL_CREATE_ENTRY_FIELDS':
      return {
        ...state,
        filial: null,
        services: [],
        stylist: null,
        date_and_time: null,
      };
    default:
      return state;
  }
};

export const setEntryDetails = (entry, filialDetails) => ({
  type: 'SET_ENTRY_INFO',
  payload: {
    entry,
    filialDetails,
  },
});
export const setNewDateEntry = newDateEntry => ({
  type: 'SET_NEW_DATE_ENTRY',
  payload: {newDateEntry},
});
export const setCurrentSaleInfo = currentSaleInfo => ({
  type: 'SET_CURRENT_SALE_INFO',
  payload: {currentSaleInfo},
});
export const setEntryError = entryError => ({
  type: 'SET_ENTRY_ERROR',
  payload: {entryError},
});
export const setEntryStatus = entryStatus => ({
  type: 'SET_ENTRY_STATUS',
  payload: {entryStatus},
});
export const setFilial = filial => ({
  type: 'SET_FILIAL',
  payload: {filial},
});
export const setServices = filial => ({
  type: 'SET_SERVICES',
  payload: {filial},
});
export const clearServices = services => ({
  type: 'CLEAR_SERVICES',
  payload: {services},
});
export const setStylist = stylist => ({
  type: 'SET_STYLIST',
  payload: {stylist},
});
export const setDateAndTime = (date, time) => ({
  type: 'SET_DATE_AND_TIME',
  payload: {date, time},
});
export const clearAllCreateEntryFields = () => ({
  type: 'CLEAR_ALL_CREATE_ENTRY_FIELDS',
});
export const setSales = sales => ({
  type: 'SET_SALES',
  payload: {sales},
});
export const setAllCategories = allCategories => ({
  type: 'SET_ALL_CATEGORIES',
  payload: {allCategories},
});

export const createEntryTC =
  (company_id, appointment, data) => async dispatch => {
    dispatch(setLoading(true));
    try {
      const token = await AsyncStorage.getItem('token');
      await entryAPI.checkEntryParams(company_id, appointment);
      await entryAPI.createEntry(company_id, data, token);
      dispatch(setEntryStatus('OK'));
    } catch (e) {
      dispatch(
        setEntryError(
          Array.isArray(e.response.data.errors)
            ? e.response.data.errors.map(i => i.message)
            : e.response.data.errors.message,
        ),
      );
      console.log(e?.response?.data);
    }
    dispatch(setLoading(false));
  };

export const getEntryTC = (company_id, entryId) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const entry = await entryAPI.getEntry(company_id, entryId);
    const filial = await entryAPI.getFilialInfo(entry.data.company_id);
    dispatch(setEntryDetails(entry.data, filial.data));
  } catch (e) {
    console.log(e?.response?.data);
  }
  dispatch(setLoading(false));
};

export const getSalesTC = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let filials = await filialsAPI.getFilials();
    let salese_data = await Promise.all(
        filials.data.map(async filial => await entryAPI.getSales(filial.id)),
    );
    const all_filials_sales = salese_data.map(sale =>
        sale
            .filter(el => el?.category_id === 4218539)
            .filter(el => el?.image_group?.images?.basic?.path)
            .filter(el => el?.active === 1)
            .map(el => ({
              image: el?.image_group?.images?.basic?.path,
              title: el?.booking_title,
              min_price: el?.price_min,
              max_price: el?.price_max,
              id: el?.id,
              comment: el?.comment,
            })),
    );
    const sales_array = all_filials_sales.flat();
    let unique = [];
    let distinct = [];
    for (let i = 0; i < sales_array.length; i++) {
      if (!unique[sales_array[i].id]) {
        distinct.push(sales_array[i]);
        unique[sales_array[i].id] = 1;
      }
    }
    dispatch(setSales(distinct));
  } catch (e) {
    console.log('sales', e?.response?.data);
  }
  dispatch(setLoading(false));
};

export const getSalesByIdTC = id => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await entryAPI.getSalesById(id);
    dispatch(setCurrentSaleInfo(res.data));
  } catch (e) {
    console.log(e?.response?.data);
  }
  dispatch(setLoading(false));
};

export const getAllServicesTC =
  (company_id, stylist_id, datetime, services) => async dispatch => {
    dispatch(setLoading(true));
    try {
      const res = await entryAPI.getServicesCategorys(
        company_id,
        stylist_id,
        datetime,
        services,
      );

      let categories = res.data.category.map(category => {
        category.staffs = res.data.services.filter(
          staff => staff.category_id === category.id && staff.active,
        );
        return category;
      });
      dispatch(setAllCategories(categories));
    } catch (e) {
      console.log(e?.response?.data);
    }
    dispatch(setLoading(false));
  };
