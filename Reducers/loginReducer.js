//import {boolean} from 'yup';
import {
  LOGIN_RESPONSE,
  LOGIN_REQ,
  LOGIN_FAIL,
  LOG_OUT,
} from '../actions/Constants';

function loginReducer(
  state = {
    loginData: {},
    token: null,
    status: '',
    staffID: '',
    getErrorMesage: '',
  },
  action,
) {
  switch (action.type) {
    case LOGIN_RESPONSE:
      let jsonData = action.payload;

      let extractToken = jsonData.data.token;
      let ErrorMesage = jsonData.data;
      //console.log(ErrorMesage)

      let extractStatus = jsonData.status;
    ///  console.log(extractStatus)

      let StaffID = jsonData.data.staffID;

      // console.log(StaffID)

      return {
        token: extractToken,
        status: extractStatus,
        StaffID: StaffID,
        getErrorMesage: ErrorMesage,

        //loadSpinner: false,
      };

    case LOG_OUT:
      return {token: null, status: ''};

    default:
      return state;
  }
}

export {loginReducer};
