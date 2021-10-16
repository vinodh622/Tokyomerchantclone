//import {boolean} from 'yup';
import {LOGOUT_REQ} from '../actions/Constants';

function logoutReducer(
  state = {
    logoutStatus: '',
  },
  action,
) {
  switch (action.type) {
    case LOGOUT_REQ:
      let jsonData = action.payload;

      return {
        logoutStatus: jsonData.status,
      };

    default:
      return state;
  }
}

export {logoutReducer};
