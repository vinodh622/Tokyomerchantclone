//import {boolean} from 'yup';
import {LIST_CAT_PRODUCTS} from '../actions/Constants';

function CategorylistReducer(state = {categorylistData:[  ],  categorylistStatus:''   }, action) {
  switch (action.type) {
    case LIST_CAT_PRODUCTS:
      let jsonData = action.payload;
     
     


      return {
        categorylistData: [...jsonData.data],
        categorylistStatus :jsonData.status
    
      };

    default:
      return state;
  }
}

export {CategorylistReducer};
