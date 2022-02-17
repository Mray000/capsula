import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import {profileReducer} from './profileReducer';
import {entryReducer} from "./entryReducer";
import {commonReducer} from "./commonReducer";
import {authReducer} from "./authReducer";
import {filialReducer} from "./filialsReducer";
import {stylistsReducer} from "./stylistReducer";


let reducers = combineReducers({
  profile: profileReducer,
  entry: entryReducer,
  common: commonReducer,
  auth: authReducer,
  filials: filialReducer,
  stylists: stylistsReducer,
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

// @ts-ignore
window.store = store


