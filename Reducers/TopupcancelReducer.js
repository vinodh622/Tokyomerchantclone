//import {boolean} from 'yup';
import {TOPUP_ID, TOPUP_FAIL} from '../actions/Constants';

function TopupcancelReducer(state = {uniqueTopupId: ''}, action) {
  switch (action.type) {
    case TOPUP_ID:
      let getUniqueTopupId = action.payload;

      //   console.log("dwdw"+jsonData)

      return {
        uniqueTopupId: getUniqueTopupId,
        //loadSpinner: false,
      };

    default:
      return state;
  }
}

export {TopupcancelReducer};
