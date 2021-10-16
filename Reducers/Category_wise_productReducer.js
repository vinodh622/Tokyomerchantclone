//import {boolean} from 'yup';
import {CAT_WISE_PRODUCTS} from '../actions/Constants';

function Category_wise_productReducer(state = {categorywise_Data:[  ],  categorywise_Status:''   }, action) {
  switch (action.type) {
    case CAT_WISE_PRODUCTS:
      let jsonData = action.payload;
     
     
    //  console.log(jsonData.data)


      return {
        categorywise_Data:[...jsonData.data],
        categorywise_Status:jsonData.status
    
      };

    default:
      return state;
  }
}

export {Category_wise_productReducer};
