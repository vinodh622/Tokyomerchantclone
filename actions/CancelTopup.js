import {TOPUP_ID, TOPUP_FAIL} from './Constants';

export const getTopuptId = (TopupId) => async (dispatch) => {
  try {
    dispatch({type: TOPUP_ID, payload: TopupId});

    //   console.log(paymentId)
  } catch (error) {
    dispatch({type: TOPUP_FAIL});
  }
};
