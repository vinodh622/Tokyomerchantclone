//import {boolean} from 'yup';
import {PAYMENT_REQ} from '../actions/Constants';

function PaymentReducer(state = {PaymentData: {}}, action) {
  switch (action.type) {
    case PAYMENT_REQ:
      let jsonData = action.payload;
      let getPaymentdetails = jsonData.data;

      //  console.log("jjj"+getPaymentdetails)

      return {
        PaymentData: getPaymentdetails,

        //loadSpinner: false,
      };

    default:
      return state;
  }
}

export {PaymentReducer};
