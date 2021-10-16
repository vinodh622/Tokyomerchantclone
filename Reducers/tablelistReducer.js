//import {boolean} from 'yup';
import {TABLE_DATA} from '../actions/Constants';

function tablelistReducer(state = {tableData:[  ], status:''   }, action) {
  switch (action.type) {
    case TABLE_DATA:
      let get_tableDta = action.payload;
     
    //console.log(get_tableDta.data)


      return {
        tableData: get_tableDta.data,
        status :get_tableDta.status
    
      };

    default:
      return state;
  }
}

export {tablelistReducer};
