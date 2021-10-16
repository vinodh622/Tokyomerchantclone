//import {boolean} from 'yup';
import {CANCEL_PAY_ID, CANCEL_FAIL} from '../actions/Constants';

function paymentIdredeucer(state = {uniquePaymentID: ''}, action) {
  switch (action.type) {
    case CANCEL_PAY_ID:
      let getUniquepaymentId = action.payload;

      //   console.log("dwdw"+jsonData)

      return {
        uniquePaymentID: getUniquepaymentId,
        //loadSpinner: false,
      };

    default:
      return state;
  }
}

export {paymentIdredeucer};
