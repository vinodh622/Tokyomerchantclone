import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootreducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

//import {Dayendreducer} from '../Reducers /loginReducer';

const persistConfig = {
  key: 'navigation',
  storage: AsyncStorage,
  // whitelist: [''] // only navigation will be persisted
  //blacklist: ['Dayendreducer'], // navigation will not be persisted
};









const persistedReducer = persistReducer(persistConfig, reducer);
const initialState = {};

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
