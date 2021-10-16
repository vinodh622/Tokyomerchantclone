import {CANCEL_PAY_ID, CANCEL_FAIL} from './Constants';
//mport {CANCEL_PAYMENT} from '../Screens/API/Api';

export const getPaymentId = (paymentId) => async (dispatch) => {
  try {
    dispatch({type: CANCEL_PAY_ID, payload: paymentId});

    //   console.log(paymentId)
  } catch (error) {
    dispatch({type: CANCEL_FAIL});
  }
};
