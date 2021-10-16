//import {boolean} from 'yup';
import {STOCK_STATUS } from '../actions/Constants';

function stocklistReducer(state = {stockStatus: [ ] , status: ' '}, action) {
  switch (action.type) {
    case STOCK_STATUS:
      let get_stockstatus = action.payload;
      //console.log(get_stockstatus.status)

      return {
        stockStatus: get_stockstatus.data,
        status: get_stockstatus.status,
      };


      // case STOCK_UPDATE:
      //   let get_stockUpdate = action.payload;
      // //  console.log("dwd")
      // console.log(get_stockUpdate.data)
  
      //   return {
      //     stockResponse: get_stockUpdate.data,
      //     stockupdateStatus: get_stockUpdate.status,
      //   };
  



    default:
      return state;
  }
}

export {stocklistReducer};
