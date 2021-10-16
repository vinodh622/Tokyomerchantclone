//import {boolean} from 'yup';
import {STOCK_UPDATE} from '../actions/Constants';

function stockupdateReducer(
  state = {stockUpdate_data: ' ', stockupdateStatus: ' '},
  action,
) {
  switch (action.type) {
    case STOCK_UPDATE:
      let get_stockUpdate = action.payload;

    // console.log(get_stockUpdate.data)

      return {
        stockUpdate_data: get_stockUpdate.data,
        stockupdateStatus: get_stockUpdate.status,
      };

    default:
      return state;
  }
}

export {stockupdateReducer};
