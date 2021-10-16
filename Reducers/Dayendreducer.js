//import {boolean} from 'yup';
import {DAY_END_REQ, CHECK_MERCHENT_PIN, DAY_OUT} from '../actions/Constants';

function Dayendreducer(
  state = {
    getdayendDetails: '',
    getdayendStatus: ' ',
    merchantpin_Status: '',
    merchantPindetail: '',
  },
  action,
) {
  switch (action.type) {
    case DAY_END_REQ:
      let jsonData = action.payload;

      // console.log(jsonData.data)

      const setdayendDetails = jsonData.data;
      const setdayendStatus = jsonData.statuscode;

      // console.log(setdayendStatus)

      //  console.log(dayendStatus)

      return {
        getdayendDetails: setdayendDetails,
        getdayendStatus: setdayendStatus,
      };

    case CHECK_MERCHENT_PIN:
      let Data = action.payload;
      //  console.log(Data)

      const setpinDetails = Data.data;

      const setpinStatus = Data.statuscode;

      //console.log(Data)

      return {
        merchantPindetail: setpinDetails,

        merchantpin_Status: setpinStatus,
      };

    case DAY_OUT:
      //   console.log(getdayendDetails)

      return {
        getdayendStatus: ' ',
        merchantpin_Status: '',
      };

    default:
      return state;
  }
}

export {Dayendreducer};
