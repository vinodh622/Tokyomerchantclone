//import {boolean} from 'yup';
import {WALLET_PAYMENT} from '../actions/Constants';

function WalletReducer(state = {Walletdata: {}, status: ''}, action) {
  switch (action.type) {
    case WALLET_PAYMENT:
      let jsonData = action.payload;

      let getWalletMessage = jsonData.data;

      let getWalletStatus = jsonData.status;

      return {
        Walletdata: getWalletMessage,

        status: getWalletStatus,
      };

    default:
      return state;
  }
}

export {WalletReducer};
