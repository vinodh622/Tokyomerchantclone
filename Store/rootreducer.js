import {combineReducers} from 'redux';
import {loginReducer} from '../Reducers/loginReducer';
import {persistReducer} from 'redux-persist';
import {PaymentReducer} from '../Reducers/PaymentReducer';

import {paymentIdredeucer} from '../Reducers/paymentIdreducer';

import {TopupReducer} from '../Reducers/TopupReducer';

import {TopupcancelReducer} from '../Reducers/TopupcancelReducer';

import {WalletReducer} from '../Reducers/Walletreducer';

import {Dayendreducer} from '../Reducers/Dayendreducer';
import {tablelistReducer} from '../Reducers/tablelistReducer'

import {stocklistReducer} from '../Reducers/stocklistReducer'



import {stockupdateReducer} from '../Reducers/stockupdateReducer'

import {ProductlistReducer} from '../Reducers/ProductlistReducer'

import {CategorylistReducer} from '../Reducers/CategorylistReducer'

import {Category_wise_productReducer} from '../Reducers/Category_wise_productReducer'

import {logoutReducer} from '../Reducers/logoutReducer'


import {summaryReducer } from '../Reducers/summaryReducer'

import {Settingsreducer } from '../Reducers/Settingsreducer'








const reducer = combineReducers({
  loginDetails: loginReducer,
  paymentData1: PaymentReducer,
  getpaymentId: paymentIdredeucer,
  topupDatas: TopupReducer,
  TopupcancelReducer: TopupcancelReducer,
  WalletReducer: WalletReducer,
  Dayendreducer: Dayendreducer,
  tablelistReducer:tablelistReducer,
  stocklistReducer:stocklistReducer,
  stockupdateReducer:stockupdateReducer,
  ProductlistReducer:ProductlistReducer,

  CategorylistReducer:CategorylistReducer,

  Category_wise_productReducer:Category_wise_productReducer,

  logoutReducer:logoutReducer,

  summaryReducer:summaryReducer,
  Settingsreducer:Settingsreducer





});

export default reducer;
