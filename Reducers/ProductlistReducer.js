//import {boolean} from 'yup';
import {LIST_PRODUCT} from '../actions/Constants';

function ProductlistReducer(state = {productListdata: [ ] , productlistStatus:"" }, action) {
  switch (action.type) { 

    case LIST_PRODUCT:

      let jsonData = action.payload;
      

      //console.log(jsonData.data)
     
      return {
        productListdata: [...jsonData.data],
        productlistStatus:jsonData.status



       
      };

    default:
      return state;
  }
}

export {ProductlistReducer};
