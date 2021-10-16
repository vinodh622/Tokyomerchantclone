//import {boolean} from 'yup';
import {TOP_UP_REQ} from '../actions/Constants';

function TopupReducer(state = {topupData: {}}, action) {
  switch (action.type) {
    case TOP_UP_REQ:
      let jsonData = action.payload;
      let setTopUpdetials = jsonData.data;

      //console.log(setTopUpdetials)

      return {
        topupData: setTopUpdetials,

        //loadSpinner: false,
      };

    default:
      return state;
  }
}

export {TopupReducer};
